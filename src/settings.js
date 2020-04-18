import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import i18n from 'i18next';
import {withTranslation} from 'react-i18next';

import * as theme from './theme';

export default {
  trackBack: {
    name: i18n.t ('dashboard:trackback'),

    icon: ({size, color, ...props}) => (
      <FontAwesome5
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="user-edit"
        {...props}
      />
    ),
  },
  donate: {
    name: i18n.t ('dashboard:donate'),

    icon: ({size, color, ...props}) => (
      <FontAwesome5
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="donate"
        {...props}
      />
    ),
  },
  selfQuarantine: {
    name: i18n.t ('dashboard:selfQuarantine'),

    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="home-heart"
        {...props}
      />
    ),
  },
  news: {
    name: i18n.t ('dashboard:news'),

    icon: ({size, color, ...props}) => (
      <Entypo
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="news"
        {...props}
      />
    ),
  },
};
withTranslation ();
