/*
* @flow
*/

import type { Action } from '../actions/types';
import type { SettingsState } from './types';

const initialState: SettingsState = {
  passwordLength: 12,
  autoGeneration: false,
};

const settingsState = (state: SettingsState = initialState, action: Action): SettingsState => {
  switch (action.type) {
    case 'SET_PASSWORD_LENGTH':
      return { ...state, passwordLength: action.length };
    case 'SET_AUTO_GENERATION':
      return { ...state, autoGeneration: action.autoGeneration };
    case 'SET_SETTINGS':
      return { ...state, autoGeneration: action.autoGeneration, passwordLength: action.length };
    default:
      return state;
  }
};

export default settingsState;
