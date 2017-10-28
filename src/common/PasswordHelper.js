/*
* @flow
*/
import { levelLow, levelMedium, levelHigh } from '../constants/colors';

const respectMinCharLenght = (value: string): boolean => value.length >= 8;

const containsLowercase = (value: string): boolean => {
  const regex = /^(?=.*[a-z]).+$/;
  return regex.test(value);
};

const containsUppercase = (value: string): boolean => {
  const regex = /^(?=.*[A-Z]).+$/;
  return regex.test(value);
};

const containsSpecial = (value: string): boolean => {
  const regex = /^(?=.*[0-9_\W]).+$/;
  return regex.test(value);
};

const SecurityLevel: Object = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

const DefinePasswordLevel = (password: string): number => {
  let matchingCriteria = 0;
  let result = SecurityLevel.LOW;
  matchingCriteria = containsLowercase(password) ? matchingCriteria + 1 : matchingCriteria;
  matchingCriteria = containsUppercase(password) ? matchingCriteria + 1 : matchingCriteria;
  matchingCriteria = containsSpecial(password) ? matchingCriteria + 1 : matchingCriteria;

  matchingCriteria = respectMinCharLenght(password) ? matchingCriteria + 1 : 1;

  switch (matchingCriteria) {
    case 1:
      result = SecurityLevel.LOW;
      break;
    case 2:
      result = SecurityLevel.LOW;
      break;
    case 3:
      result = SecurityLevel.MEDIUM;
      break;
    case 4:
      result = SecurityLevel.HIGH;
      break;
    default:
      result = SecurityLevel.LOW;
  }
  return result;
};

export const GetLevelColor = (password: string): string => {
  const level = DefinePasswordLevel(password);
  if (level === SecurityLevel.MEDIUM) {
    return levelMedium;
  }
  if (level === SecurityLevel.HIGH) {
    return levelHigh;
  }

  return levelLow;
};

export const GeneratePassword = (length: number): string => {
  const plength = length;
  const keylistalpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const keylistint = '123456789';
  const keylistspec = '!@#_+/?$%';
  let temp = '';
  let len = plength / 2;
  len -= 1;
  for (let i = 0; i < len; i += 1) {
    temp += keylistalpha.charAt(Math.floor(Math.random() * keylistalpha.length));
  }
  for (let i = 0; i < len; i += 1) {
    temp += keylistspec.charAt(Math.floor(Math.random() * keylistspec.length));
  }
  for (let i = 0; i < len; i += 1) {
    temp += keylistint.charAt(Math.floor(Math.random() * keylistint.length));
  }
  temp = temp
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return temp;
};
