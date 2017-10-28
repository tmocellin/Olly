/*
* @flow
*/
import _ from 'lodash';

export const removeInObject = (object: Object, keyToRemove: string) =>
  _.pickBy(object, obj => obj.key !== keyToRemove);
export const removeInArray = (array: Array<Object>, keyToRemove: string) =>
  array.filter(key => key !== keyToRemove);
