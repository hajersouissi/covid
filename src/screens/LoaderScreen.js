import React, {Component} from 'react';
import AuthForm from '../ui/AuthForm';
import {login, signup, subscribeToAuthChanges} from '../api/PersonsApi';
import {View, ActivityIndicator,Text, StyleSheet} from 'react-native';

class LoaderScreen extends Component {
  constructor () {
    super ();
    this.state = {
      loading: true,
    };
  }

  componentDidMount () {
    setTimeout (() => this.setState ({loading: false}), 3000);
  }
  render () {
      const mode = this.props.navigation.getParam ('mode');
    return (
      <View style={styles.container}>
        {this.state.loading ?
        <ActivityIndicator size="large" color="blue" /> 
: <View>
            <Text>hello</Text>
        </View>

      }
      </View>
    );
  }
}
export default LoaderScreen;

var styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
