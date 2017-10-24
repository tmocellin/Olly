/*
* @flow
*/

import type {
  ThunkAction,
  Dispatch,
  SetPasswordLengthAction,
  SetAutoGenerationAction,
} from './types';

/*
*** Actions ***
*/

export const SetPasswordLength = (length: number): ThunkAction => (dispatch: Dispatch) => {
  dispatch(setPasswordLength(length));
};

export const SetAutoGeneration = (autoGeneration: boolean): ThunkAction => (dispatch: Dispatch) => {
  dispatch(setAutoGeneration(autoGeneration));
};

/*
*** Actions Creator ***
*/

const setPasswordLength = (length: number): SetPasswordLengthAction => ({
  type: 'SET_PASSWORD_LENGTH',
  length,
});
const setAutoGeneration = (autoGeneration: boolean): SetAutoGenerationAction => ({
  type: 'SET_AUTO_GENERATION',
  autoGeneration,
});
