import React, {Component} from 'react';

import PersonListScreen from './src/screens/PersonListScreen';
import SymptomListScreen from './src/screens/SymptomListScreen';
import NewsScreen from './src/screens/NewsScreen';
import DonateScreen from './src/screens/DonateScreen';
import HelloScreen from './src/screens/HelloScreen';

import LoginScreen from './src/screens/LoginScreen';
import PersonFormScreen from './src/screens/PersonFormScreen';
import PersonDetailScreen from './src/screens/PersonDetailScreen';
import VisitFormScreen from './src/screens/VisitFormScreen';
import SymptomFormScreen from './src/screens/SymptomFormScreen';
import Dashboard from './src/screens/Dashboard';
import Settings from './src/screens/Settings';
import SymptomDetailScreen from './src/screens/SymptomDetailScreen';
import SymptomFormHomeScreen from './src/screens/SymptomFormHomeScreen';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {withTranslation} from 'react-i18next';

const AppStack = createStackNavigator ({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: () => ({
      header: null,
    }),
  },

  Settings: Settings,
  NewsScreen: NewsScreen,
  DonateScreen: DonateScreen,
  PersonList: PersonListScreen,
  SymptomList: SymptomListScreen,
  SymptomFormHomeScreen: SymptomFormHomeScreen,
  PersonForm: PersonFormScreen,
  PersonDetail: PersonDetailScreen,
  SymptomDetailScreen: SymptomDetailScreen,
});

const AppFirstYesStack = createStackNavigator ({
  VisitForm: VisitFormScreen,
  SymptomForm: SymptomFormScreen,
});
const AppFirstNoStack = createStackNavigator ({
  SymptomForm: SymptomFormScreen,
});

const AuthNavigator = createStackNavigator ({
  LoginRoute: {
    screen: HelloScreen,

    navigationOptions: () => ({
      header: null,
    }),
  },

  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

// Wrapping a stack with translation hoc asserts we get new render on language change
// the hoc is set to only trigger rerender on languageChanged
const WrappedStack = ({t}) => {
  return <AuthNavigator screenProps={{t}} />;
};
const ReloadAppOnLanguageChange = withTranslation ('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
}) (WrappedStack);

const AppContainer = createAppContainer (
  createSwitchNavigator (
    {
      AppFirstNo: AppFirstNoStack,
      AppFirstYes: AppFirstYesStack,
      App: AppStack,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);

export default class App extends Component {
  render () {
    return (
      <AppContainer>

        <ReloadAppOnLanguageChange />
        screenProps=
        {{appName: 'COVID-19 HELP APP'}}

      </AppContainer>
    );
  }
}
