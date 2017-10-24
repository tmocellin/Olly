/*
* @flow
*/

export type SettingsState = {
  +passwordLength: number,
  +autoGeneration: boolean,
};

export type ReduxState = {
  +settings: SettingsState,
};
