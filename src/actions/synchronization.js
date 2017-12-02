/*
* @flow
*/
import RNFetchBlob from 'react-native-fetch-blob';
import CryptoJS from 'crypto-js';
import Base64 from 'base-64';
import { Decrypt } from '../common/CryptoHelper';
import strings from '../locales/strings';
import type { NormalizedState } from '../types/NormalizedState';
import type {
  ThunkAction,
  Dispatch,
  SetAccessTokenAction,
  DropboxStartAction,
  DropboxSuccessAction,
  DropboxFailAction,
  SetPasswordsAction,
  SetSettingsAction,
  UpdateCryptedPasswordsAction,
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

export function DownloadData(
  token: string,
  verificationToken: string,
  key: CryptoJS.WordArray,
): ThunkAction {
  return async (dispatch: Dispatch) => {
    dispatch(startDropboxAction(strings.pullPending));
    try {
      const response = await RNFetchBlob.fetch(
        'POST',
        'https://content.dropboxapi.com/2/files/download',
        {
          Authorization: `Bearer ${token}`,
          'Dropbox-API-Arg': '{"path": "/data_backup.json"}',
        },
      );
      if (response.respInfo.status.toString() === '409') {
        dispatch(dropboxActionFail(strings.notFound));
      } else if (response.respInfo.status.toString() !== '200') {
        dispatch(dropboxActionFail(strings.unHandled));
      } else {
        const data = JSON.parse(response.data);
        if (verificationToken === data.vt) {
          let uncryptedPasswords = Decrypt(data.d, key, data.v);
          uncryptedPasswords = JSON.parse(uncryptedPasswords);
          dispatch(setSettings(data.st.passwordLength, data.st.autoGeneration));
          dispatch(setPasswords(uncryptedPasswords));
          dispatch(updateCryptedPasswords(data.d));
          dispatch(dropboxActionSuccess(strings.dowloadSuccess));
        } else {
          dispatch(dropboxActionFail(strings.notSameVerification));
        }
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

const setSettings = (length: number, autoGeneration: boolean): SetSettingsAction => ({
  type: 'SET_SETTINGS',
  length,
  autoGeneration,
});

const setPasswords = (passwords: NormalizedState): SetPasswordsAction => ({
  type: 'SET_PASSWORDS',
  passwords,
});

const updateCryptedPasswords = (cryptedPassword: string): UpdateCryptedPasswordsAction => ({
  type: 'UPDATE_CRYPTED_PASSWORDS',
  cryptedPassword,
});
