/*
* @flow
*/
import type { NormalizedState } from '../types/NormalizedState';
import CryptoJS from 'crypto-js';

export type SettingsState = {
  +passwordLength: number,
  +autoGeneration: boolean,
};

export type UserState = {
  +salt: string,
  +verificationToken: string,
  +iv: string,
  +appInitialized: boolean,
  +error: string,
};

export type DataState = {
  +key: CryptoJS.WordArray,
  +passwords: NormalizedState,
  +error: string,
};

export type CryptedDataState = {
  +passwords: string,
};

export type ReduxState = {
  +settings: SettingsState,
  +user: UserState,
  +data: DataState,
  +cryptedData: CryptedDataState,
};
