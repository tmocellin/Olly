/*
* @flow
*/

import type { Action } from '../actions/types';
import type { SynchronizationState } from './types';

const initialState: SynchronizationState = {
  userLoggedToDropbox: false,
  accessToken: '',
};

const synchronizationState = (
  state: SynchronizationState = initialState,
  action: Action,
): SynchronizationState => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return { ...state, userLoggedToDropbox: true, accessToken: action.token };

    default:
      return state;
  }
};

export default synchronizationState;
