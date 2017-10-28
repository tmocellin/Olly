/*
* @flow
*/

import type {
  ThunkAction,
  Dispatch,
  InitializationFailAction,
  InitializationSuccessAction,
  UpdateCryptedPasswordsAction,
} from './types';
import strings from '../locales/strings';
import { InitializeData, Encrypt } from '../common/CryptoHelper';

/*
*** Actions ***
*/

const initializeApplication = (
  password: string,
  confirmation: string,
  resetRoute: () => void,
): ThunkAction => (dispatch: Dispatch) => {
  if (password.length === 0 || confirmation.length === 0) {
    dispatch(initializationFail(strings.passwordLenghtError));
  } else if (password !== confirmation) {
    dispatch(initializationFail(strings.confirmationError));
  } else {
    const data = InitializeData(password);
    const emptyPassword = JSON.stringify({ allIds: [], byId: {} });
    const cryptedEmptyPasswords = Encrypt(emptyPassword, data.key, data.iv);

    dispatch(initializationSuccess(data.salt, data.iv, data.verificationToken));
    dispatch(updateCryptedPasswords(cryptedEmptyPasswords));
    resetRoute();
  }
};
export default initializeApplication;

/*
*** Actions Creator ***
*/

const initializationSuccess = (
  salt: string,
  iv: string,
  verificationToken: string,
): InitializationSuccessAction => ({
  type: 'INITIALIZATION_SUCCESS',
  salt,
  iv,
  verificationToken,
});
const initializationFail = (error: string): InitializationFailAction => ({
  type: 'INITIALIZATION_FAIL',
  error,
});

const updateCryptedPasswords = (cryptedPassword: string): UpdateCryptedPasswordsAction => ({
  type: 'UPDATE_CRYPTED_PASSWORDS',
  cryptedPassword,
});
