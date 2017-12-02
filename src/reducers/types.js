/*
* @flow
*/
import CryptoJS from 'crypto-js';
import type { NormalizedState } from '../types/NormalizedState';

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
  +userLoggedToDropbox: boolean,
  +accessToken: string,
};

export type DataState = {
  +key: CryptoJS.WordArray,
  +passwords: NormalizedState,
  +error: string,
};

export type CryptedDataState = {
  +passwords: string,
};

export type SynchronizationState = {
  +pendingAction: boolean,
  +message: string,
  +success: boolean,
};

export type ReduxState = {
  +settings: SettingsState,
  +user: UserState,
  +data: DataState,
  +cryptedData: CryptedDataState,
  +synchronization: SynchronizationState,
};
