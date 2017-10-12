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
};

export default AppString;
