import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import i18next from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';

import en from './en.json';
// import ar from './ar.json';
import fr from './fr.json';

const STORAGE_KEY = '@APP:languageCode';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb ('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};
i18next.use (languageDetector).use (initReactI18next).init ({
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: en,
    fr: fr,
    // ar: ar,
  },
});

