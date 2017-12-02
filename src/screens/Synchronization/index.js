/*
* @flow
*/
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CryptoJS from 'crypto-js';
import type { ReduxState } from '../../reducers/types';
import * as synchronizationActions from '../../actions/synchronization';
import Synchronization from './Synchronization';
import Login from './Login';

type Props = {
  navigation: Object,
  actions: Object,
  accessToken: string,
  isLoggedIn: boolean,
  success: boolean,
  message: string,
  pendingAction: boolean,
  passwords: string,
  iv: string,
  salt: string,
  verificationToken: string,
  passwordLength: number,
  autoGeneration: boolean,
  cryptoKey: CryptoJS.WordArray,
};

const Index = (props: Props) => {
  const {
    isLoggedIn,
    accessToken,
    passwords,
    iv,
    salt,
    verificationToken,
    passwordLength,
    autoGeneration,
    cryptoKey,
  } = props;

  if (isLoggedIn) {
    return (
      <Synchronization
        success={props.success}
        pendingAction={props.pendingAction}
        message={props.message}
        navigation={props.navigation}
        accessToken={props.accessToken}
        uploadBackup={() =>
          props.actions.BackUpData(
            accessToken,
            passwords,
            iv,
            salt,
            verificationToken,
            passwordLength,
            autoGeneration,
          )}
        deleteBackup={() => props.actions.DeleteData(accessToken)}
        downloadBackup={() => props.actions.DownloadData(accessToken, verificationToken, cryptoKey)}
      />
    );
  }
  return (
    <Login
      navigation={props.navigation}
      setAccessToken={token => props.actions.SetAccessToken(token)}
    />
  );
};

function mapStateToProps(state: ReduxState) {
  return {
    isLoggedIn: state.user.userLoggedToDropbox,
    accessToken: state.user.accessToken,
    success: state.synchronization.success,
    message: state.synchronization.message,
    pendingAction: state.synchronization.pendingAction,
    passwords: state.cryptedData.passwords,
    iv: state.user.iv,
    salt: state.user.salt,
    cryptoKey: state.data.key,
    verificationToken: state.user.verificationToken,
    passwordLength: state.settings.passwordLength,
    autoGeneration: state.settings.autoGeneration,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(synchronizationActions, dispatch),
}))(Index);
