/*
* @flow
*/

import { combineReducers } from 'redux';
import settings from './settings';
import user from './user';

const rootReducer = combineReducers({
  settings,
  user,
});

export default rootReducer;
