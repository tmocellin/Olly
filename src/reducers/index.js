/*
* @flow
*/

import { combineReducers } from 'redux';
import settings from './settings';
import user from './user';
import cryptedData from './cryptedData';
import data from './data';

const rootReducer = combineReducers({
  settings,
  user,
  cryptedData,
  data,
});

export default rootReducer;
