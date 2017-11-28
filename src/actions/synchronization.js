/*
* @flow
*/

import type { ThunkAction, Dispatch, SetAccessTokenAction } from './types';

/*
*** Actions ***
*/

export const SetAccessToken = (token: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch(setAccessToken(token));
};

/*
*** Actions Creator ***
*/

const setAccessToken = (token: string): SetAccessTokenAction => ({
  type: 'SET_ACCESS_TOKEN',
  token,
});
