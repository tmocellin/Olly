/**
 * @flow
 */
import CryptoJS from 'crypto-js';
import type { NormalizedState } from '../types/NormalizedState';
import type { Password } from '../types/Password';

export type Dispatch = (action: Action | ThunkAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

/*
**************
* Settings
**************
*/

export type SetPasswordLengthAction = {
  type: 'SET_PASSWORD_LENGTH',
  length: number,
};

export type SetAutoGenerationAction = {
  type: 'SET_AUTO_GENERATION',
  autoGeneration: boolean,
};

/*
**************
* Initialization
**************
*/

export type InitializationSuccessAction = {
  type: 'INITIALIZATION_SUCCESS',
  salt: string,
  iv: string,
  verificationToken: string,
};

export type InitializationFailAction = {
  type: 'INITIALIZATION_FAIL',
  error: string,
};

/*
**************
* Passwords
**************
*/

export type UpdateCryptedPasswordsAction = {
  type: 'UPDATE_CRYPTED_PASSWORDS',
  cryptedPassword: string,
};

export type UnlockAppAction = {
  type: 'UNLOCK_APP',
  passwords: NormalizedState,
  key: CryptoJS.WordArray,
};

export type UnlockAppFailAction = {
  type: 'UNLOCK_APP_FAIL',
  error: string,
};

export type AddPasswordAction = {
  type: 'ADD_PASSWORD',
  password: Password,
};
export type UpdatePasswordAction = {
  type: 'UPDATE_PASSWORD',
  password: Password,
};
export type DeletePasswordAction = {
  type: 'DELETE_PASSWORD',
  passwordKey: string,
};
export type DeleteAllPasswordsAction = {
  type: 'DELETE_ALL_PASSWORDS',
};

/*
**************
* Synchronization
**************
*/
export type SetAccessTokenAction = {
  type: 'SET_ACCESS_TOKEN',
  token: string,
};

export type Action =
  /** *** Settings **** */
  | SetPasswordLengthAction
  | SetAutoGenerationAction
  /** *** Initialization **** */
  | InitializationSuccessAction
  | InitializationFailAction
  /** *** Passwords **** */
  | UpdateCryptedPasswordsAction
  | UnlockAppAction
  | UnlockAppFailAction
  | AddPasswordAction
  | UpdatePasswordAction
  | DeletePasswordAction
  | DeleteAllPasswordsAction
  /** *** Synchronization **** */
  | SetAccessTokenAction;
