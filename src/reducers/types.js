/*
* @flow
*/

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

export type ReduxState = {
  +settings: SettingsState,
  +user: UserState,
};
