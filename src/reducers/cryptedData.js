/*
* @flow
*/

import type { Action } from '../actions/types';
import type { CryptedDataState } from './types';

const initialState: CryptedDataState = {
  passwords: '',
};

const settingsState = (
  state: CryptedDataState = initialState,
  action: Action,
): CryptedDataState => {
  switch (action.type) {
    case 'UPDATE_CRYPTED_PASSWORDS':
      return {
        ...state,
        passwords: action.passwords,
      };
    default:
      return state;
  }
};

export default settingsState;
