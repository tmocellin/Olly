/*
* @flow
*/

import type {
  ThunkAction,
  Dispatch,
  InitializationFailAction,
  InitializationSuccessAction,
} from './types';
import strings from '../locales/strings';
import { InitializeData } from '../common/CryptoHelper';

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
    dispatch(initializationSuccess(data.salt, data.iv, data.verificationToken));
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
