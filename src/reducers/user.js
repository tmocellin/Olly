/*
* @flow
*/

import type { Action } from '../actions/types';
import type { UserState } from './types';

const initialState: UserState = {
  appInitialized: false,
  iv: '',
  salt: '',
  verificationToken: '',
  error: '',
  accessToken: '',
  userLoggedToDropbox: false,
};

const userState = (state: UserState = initialState, action: Action): UserState => {
  switch (action.type) {
    case 'INITIALIZATION_SUCCESS':
      return {
        ...state,
        appInitialized: true,
        iv: action.iv,
        salt: action.salt,
        verificationToken: action.verificationToken,
        error: '',
      };
    case 'INITIALIZATION_FAIL':
      return { ...state, error: action.error };
    case 'SET_ACCESS_TOKEN':
      return { ...state, userLoggedToDropbox: true, accessToken: action.token };
    case 'RESTORE_USER_DATA':
      return {
        ...state,
        iv: action.iv,
        salt: action.salt,
        verificationToken: action.verificationToken,
        appInitialized: true,
      };
    default:
      return state;
  }
};

export default userState;
