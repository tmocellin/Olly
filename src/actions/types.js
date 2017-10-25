/**
 * @flow
 */

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

export type Action =
  /** *** Settings **** */
  | SetPasswordLengthAction
  | SetAutoGenerationAction
  /** *** Initialization **** */
  | InitializationSuccessAction
  | InitializationFailAction;
