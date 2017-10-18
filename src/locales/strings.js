import I18n from 'react-native-i18n';
import en from './en';
import fr from './fr';

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
};

const AppString = {
  search_password: I18n.t('search_password'),
  noPasswords: I18n.t('noPasswords'),
  noResults: I18n.t('noResults'),
  addPassword: I18n.t('addPassword'),
  search: I18n.t('search'),
  close: I18n.t('close'),
  setup: I18n.t('setup'),
  instructions: I18n.t('instructions'),
  password: I18n.t('password'),
  confirmation: I18n.t('confirmation'),
  save: I18n.t('save'),
  unlock: I18n.t('unlock'),
};

export default AppString;
