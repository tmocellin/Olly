/*
* @flow
*/

import type { Action } from '../actions/types';
import type { SynchronizationState } from './types';

const initialState: SynchronizationState = {
  userLoggedToDropbox: false,
  accesToken: '',
};

const synchronizationState = (
  state: SynchronizationState = initialState,
  action: Action,
): SynchronizationState => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return { ...state, userLoggedToDropbox: true, accesToken: action.token };

    default:
      return state;
  }
};

export default synchronizationState;
