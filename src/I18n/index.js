import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import i18next from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';


import en from './en.json';
// import ar from './ar.json';
import fr from './fr.json';

const STORAGE_KEY = '@APP:languageCode';

// creating a language detection plugin using expo
// http://i18n.com/docs/ownplugin/#languagedetector
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
  fr :fr,
   // ar: ar,
 
  },
});


/*https://github.com/i18next/react-i18next/blob/master/example/react-native/App.js


https://github.com/i18next/i18next/blob/master/src/i18next.js

https://github.com/i18next/react-i18next/tree/master/example


https://github.com/ashour/react-native-i18n-demo
https://phrase.com/blog/posts/react-native-i18n-with-expo-and-i18next-part-2/


https://lokalise.com/blog/react-native-localization//

https://snack.expo.io/@tungtranuit/reactnative---multiple-languages--switch-language-
https://medium.com/codespace69/reactnative-how-to-change-language-of-my-app-in-run-time-when-user-selects-the-language-2e75bd134119
*/