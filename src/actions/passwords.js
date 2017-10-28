/*
* @flow
*/
import CryptoJS from 'crypto-js';
import _ from 'lodash';
import type {
  ThunkAction,
  Dispatch,
  AddPasswordAction,
  UpdatePasswordAction,
  DeletePasswordAction,
  DeleteAllPasswordsAction,
  UpdateCryptedPasswordsAction,
} from './types';
import type { Password } from '../types/Password';
import type { NormalizedState } from '../types/NormalizedState';
import { Encrypt } from '../common/CryptoHelper';
/*
*** Actions ***
*/

export const editPassword = (
  password: Password,
  edition: boolean,
  key: CryptoJS.WordArray,
  iv: string,
  passwordsState: NormalizedState,
  back: () => void,
): ThunkAction => (dispatch: Dispatch) => {
  let updatedPasswordsState = {};

  if (edition) {
    updatedPasswordsState = {
      ...passwordsState,
      byKeys: { ...passwordsState.byId, [password.key]: password },
    };
    dispatch(updatePassword(password));
  } else {
    updatedPasswordsState = {
      ...passwordsState,
      byKeys: { ...passwordsState.byId, [password.key]: password },
      allIds: [...passwordsState.allIds, password.key],
    };
    dispatch(addPassword(password));
  }

  const cryptedPasswords = Encrypt(JSON.stringify(updatedPasswordsState), key, iv);
  dispatch(updateCryptedPasswords(cryptedPasswords));

  back();
};
export const deletePassword = (
  passwordKey: string,
  key: CryptoJS.WordArray,
  iv: string,
  passwordsState: NormalizedState,
  back: () => void,
): ThunkAction => (dispatch: Dispatch) => {
  let updatedPasswordsState = {};

  updatedPasswordsState = {
    ...passwordsState,
    byKeys: _.pickBy(passwordsState.byId, obj => obj.id !== passwordKey),
    allIds: passwordsState.allIds.filter(id => id !== passwordKey),
  };
  dispatch(removePassword(passwordKey));

  const cryptedPasswords = Encrypt(JSON.stringify(updatedPasswordsState), key, iv);
  dispatch(updateCryptedPasswords(cryptedPasswords));

  back();
};

export const deleteAllPasswords = (key: CryptoJS.WordArray, iv: string): ThunkAction => (
  dispatch: Dispatch,
) => {
  const emptyPassword = JSON.stringify({ allIds: [], byId: {} });
  dispatch(removeAllPasswords());
  const cryptedPasswords = Encrypt(JSON.stringify(emptyPassword), key, iv);
  dispatch(updateCryptedPasswords(cryptedPasswords));
};

/*
*** Actions Creator ***
*/

const addPassword = (password: Password): AddPasswordAction => ({
  type: 'ADD_PASSWORD',
  password,
});

const updatePassword = (password: Password): UpdatePasswordAction => ({
  type: 'UPDATE_PASSWORD',
  password,
});
const removePassword = (passwordKey: string): DeletePasswordAction => ({
  type: 'DELETE_PASSWORD',
  passwordKey,
});

const removeAllPasswords = (): DeleteAllPasswordsAction => ({
  type: 'DELETE_ALL_PASSWORDS',
});
const updateCryptedPasswords = (cryptedPassword: string): UpdateCryptedPasswordsAction => ({
  type: 'UPDATE_CRYPTED_PASSWORDS',
  cryptedPassword,
});
