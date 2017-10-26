/*
* @flow
*/

import type { ThunkAction, Dispatch, UnlockAppAction, UnlockAppFailAction } from './types';
import type { NormalizedState } from '../types/NormalizedState';
import strings from '../locales/strings';
import { IsValidPassword, Decrypt, GenerateKey } from '../common/CryptoHelper';

/*
*** Actions ***
*/

const unlockApp = (
  password: string,
  verificationToken: string,
  salt: string,
  iv: string,
  cryptedPasswords: string,
  resetRoute: () => void,
): ThunkAction => (dispatch: Dispatch) => {
  if (IsValidPassword(verificationToken, password, salt)) {
    const key = GenerateKey(password, salt);
    const passwords = Decrypt(cryptedPasswords, key, iv);
    dispatch(unlockApplication(key, JSON.parse(passwords)));
    resetRoute();
  } else {
    dispatch(unlockAppFail(strings.invalid_password));
  }
};
export default unlockApp;

/*
*** Actions Creator ***
*/

const unlockApplication = (key: strings, passwords: NormalizedState): UnlockAppAction => ({
  type: 'UNLOCK_APP',
  key,
  passwords,
});

const unlockAppFail = (error: string): UnlockAppFailAction => ({
  type: 'UNLOCK_APP_FAIL',
  error,
});
