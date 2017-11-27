/*
* @flow
*/

import type { Action } from '../actions/types';
import type { SynchronizationState } from './types';

const initialState: SynchronizationState = {
  userLoggedToDropbox: false,
};

const synchronizationState = (
  state: SynchronizationState = initialState,
  action: Action,
): SynchronizationState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default synchronizationState;
