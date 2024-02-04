import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import 'intl-pluralrules';

import enUS from '../translations/en-US.json';
import frCA from '../translations/fr-CA.json';

const resources = {
  enUS: {translation: enUS},
  frCA: {translation: frCA},
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'enUS',
  fallbackLng: 'frCA',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
