/*
* @flow
*/

import type { Action } from '../actions/types';
import type { DataState } from './types';

const initialState: DataState = {
  passwords: { allIds: [], byId: {} },
  key: '',
};

const dataState = (state: DataState = initialState, action: Action): DataState => {
  switch (action.type) {
    case 'UNLOCK_APP':
      return {
        ...state,
        passwords: action.passwords,
        key: action.key,
      };
    default:
      return state;
  }
};

export default dataState;
