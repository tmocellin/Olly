/*
* @flow
*/

import type { Action } from '../actions/types';
import type { DataState } from './types';
import { removeInObject, removeInArray } from '../common/ReduxUtils';

const initialState: DataState = {
  passwords: { allIds: [], byId: {} },
  key: '',
  error: '',
};

const dataState = (state: DataState = initialState, action: Action): DataState => {
  switch (action.type) {
    case 'UNLOCK_APP':
      return {
        ...state,
        passwords: action.passwords,
        key: action.key,
        error: '',
      };
    case 'UNLOCK_APP_FAIL':
      return {
        ...state,
        error: action.error,
      };
    case 'LOCK_APP':
      return { ...state, passwords: { allIds: [], byId: {} }, key: '' };
    case 'ADD_PASSWORD':
      return {
        ...state,
        passwords: {
          ...state.passwords,
          byId: { ...state.passwords.byId, [action.password.key]: action.password },
          allIds: [...state.passwords.allIds, action.password.key],
        },
      };
    case 'UPDATE_PASSWORD':
      return {
        ...state,
        passwords: {
          ...state.passwords,
          byId: { ...state.passwords.byId, [action.password.key]: action.password },
        },
      };
    case 'DELETE_PASSWORD':
      return {
        ...state,
        passwords: {
          ...state.passwords,
          byId: removeInObject(state.passwords.byId, action.passwordKey),
          allIds: removeInArray(state.passwords.allIds, action.passwordKey),
        },
      };
    case 'DELETE_ALL_PASSWORDS':
      return { ...state, passwords: { allIds: [], byId: {} } };

    case 'SET_PASSWORDS':
      return { ...state, passwords: action.passwords };
    default:
      return state;
  }
};

export default dataState;
