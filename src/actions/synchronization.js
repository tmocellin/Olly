/*
* @flow
*/
import RNFetchBlob from 'react-native-fetch-blob';
import Base64 from 'base-64';
import strings from '../locales/strings';

import type {
  ThunkAction,
  Dispatch,
  SetAccessTokenAction,
  DropboxStartAction,
  DropboxSuccessAction,
  DropboxFailAction,
} from './types';

/*
*** Actions ***
*/

export const SetAccessToken = (token: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch(setAccessToken(token));
};
// Actions
export function BackUpData(
  token: string,
  passwords: string,
  iv: string,
  salt: string,
  verificationToken: string,
  passwordLength: number,
  autoGeneration: boolean,
): ThunkAction {
  return async (dispatch: Dispatch) => {
    dispatch(startDropboxAction(strings.publishPending));
    try {
      const settings = { passwordLength, autoGeneration };

      let data = {
        d: passwords,
        st: settings,
        s: salt,
        v: iv,
        vt: verificationToken,
      };
      data = JSON.stringify(data);
      const response = await RNFetchBlob.fetch(
        'POST',
        'https://content.dropboxapi.com/2/files/upload',
        {
          Authorization: `Bearer ${token}`,
          'Dropbox-API-Arg': JSON.stringify({
            path: '/data_backup.json',
            mode: 'overwrite',
          }),
          'Content-Type': 'application/octet-stream',
        },
        Base64.encode(data),
      );
      if (response.respInfo.status.toString() !== '200') {
        dispatch(dropboxActionFail(strings.unHandled));
      }
      dispatch(dropboxActionSuccess(strings.uploadSuccess));
    } catch (error) {
      dispatch(dropboxActionFail(error.toString()));
    }
  };
}

export function DeleteData(token: string): ThunkAction {
  return async (dispatch: Dispatch) => {
    dispatch(startDropboxAction(strings.deletePending));
    try {
      const req = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: '{"path": "/data_backup.json"}',
      };
      const response = await fetch('https://api.dropboxapi.com/2/files/delete', req);
      if (response.status.toString() === '409') {
        dispatch(dropboxActionFail(strings.notFound));
      } else if (response.status.toString() !== '200') {
        dispatch(dropboxActionFail(strings.unHandled));
      } else {
        dispatch(dropboxActionSuccess(strings.deleteBackupSuccess));
      }
    } catch (error) {
      dispatch(dropboxActionFail(error.toString()));
    }
  };
}

/*
*** Actions Creator ***
*/

const setAccessToken = (token: string): SetAccessTokenAction => ({
  type: 'SET_ACCESS_TOKEN',
  token,
});

const startDropboxAction = (info: string): DropboxStartAction => ({
  type: 'DROPBOX_ACTION_START',
  info,
});

const dropboxActionSuccess = (info: string): DropboxSuccessAction => ({
  type: 'DROPBOX_ACTION_SUCCESS',
  info,
});

const dropboxActionFail = (error: string): DropboxFailAction => ({
  type: 'DROPBOX_ACTION_FAIL',
  error,
});
