/*
* @flow
*/
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
};

export type DataState = {
  +key: string,
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
