/*
* @flow
*/

import { combineReducers } from 'redux';
import settings from './settings';
import user from './user';
import cryptedData from './cryptedData';
import data from './data';
import synchronization from './synchronization';

const rootReducer = combineReducers({
  settings,
  user,
  cryptedData,
  data,
  synchronization,
});

export default rootReducer;
