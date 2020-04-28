import React, {Component} from 'react';
import AuthForm from '../ui/AuthForm';

import {login, signup, subscribeToAuthChanges} from '../api/PersonsApi';

class LoginScreen extends Component {
  state = {
    authMode: 'login',
    user: {
      email: '',
      displayName: '',
      password: '',
      foreignVisit: '',
    },
  };

  componentDidMount () {
    const currentSymptom = this.props.navigation.getParam ('user');

    if (currentSymptom) {
      this.setState (prevState => ({
        user: (prevState.user = currentSymptom),
      }));
    }

    subscribeToAuthChanges (this.onAuthStateChanged);
  }
  onAuthStateChanged = user => {
    if (user !== null) {
      this.props.navigation.navigate ('App');
    }
  };
  onUserAdded = user => {
    console.log ('use', user);

    if (user.foreignVisit == 'yes') {
      this.props.navigation.navigate ('AppFirstYes');
    } else this.props.navigation.navigate ('AppFirstNo');
  };

  switchAuthMode = () => {
    this.setState (prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login',
    }));
  };
  render () {
    return (
      <AuthForm
        login={login}
        user={this.state.user}
        signup={signup}
        onUserAdded={this.onUserAdded}
        authMode={this.state.authMode}
        switchAuthMode={this.switchAuthMode}
      />
    );
  }
}
export default LoginScreen;
