/*
* @flow
*/

import type { Action } from '../actions/types';
import type { SynchronizationState } from './types';

const initialState: SynchronizationState = {
  pendingAction: false,
  message: '',
  success: false,
};

const synchronizationState = (
  state: SynchronizationState = initialState,
  action: Action,
): SynchronizationState => {
  switch (action.type) {
    case 'DROPBOX_ACTION_START':
      return { ...state, message: action.info, success: false, pendingAction: true };

    case 'DROPBOX_ACTION_SUCCESS':
      return { ...state, message: action.info, success: true, pendingAction: false };

    case 'DROPBOX_ACTION_FAIL':
      return { ...state, message: action.error, success: false, pendingAction: false };

    default:
      return state;
  }
};

export default synchronizationState;
