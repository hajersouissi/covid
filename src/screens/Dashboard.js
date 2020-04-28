import React, {Component} from 'react';

import {
  ScrollView,
  View,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import i18n from 'i18next';
import {withTranslation} from 'react-i18next';
import * as theme from '../theme';
import {Block, Text} from '../components';
import mocks from '../settings';
import ActionButton from 'react-native-action-button';

import {
  getDashboardInfo,
  signout,
} from '../api/PersonsApi';
import {FlatList} from 'react-native-gesture-handler';
class Dashboard extends Component {
  state = {
    loading: true,
    name: '',
    test: false,
  };
  onNameReceived = name => {
    this.setState (prevState => ({
      name: (prevState.name = name),
    }));
  };
  onSymptomReceived = test => {
    this.setState (prevState => ({
      test: (prevState.test = test),
    }));
  };

  componentDidMount () {
    setTimeout (() => this.setState ({loading: false}), 3000);

    getDashboardInfo (this.onNameReceived, this.onSymptomReceived);
  }

  render () {
    const {navigation, settings} = this.props;
    const TrackBackIcon = settings['trackBack'].icon;
    const DonateIcon = settings['donate'].icon;
    const SelfQuarantineIcon = settings['selfQuarantine'].icon;
    const NewsIcon = settings['news'].icon;

    return (
      <View style={styles.container}>
        {this.state.loading
          ? <ActivityIndicator size="large" color="blue" />
          : <Block style={styles.dashboard}>
              <StatusBar barStyle="light-content" backgroundColor="blue" />
              <Block row>
                <Block column>

                  <Text welcome style={{marginLeft: 5}}>
                    {i18n.t ('dashboard:hello')}
                  </Text>
                  <Text name style={{marginLeft: 5}}>
                    {this.state.name}
                  </Text>
                </Block>
                <Block column style={{marginLeft:170}}>
                  <Button
                
                    color="blue"
                    title="log out"
                    onPress={() => signout (navigation.navigate ('Auth'))}
                  />
                </Block>
              </Block>

              <Block row>
                <Block column>
                  <Image
                    style={{width: 120, height: 140}}
                    source={require ('../assets/covidapp.png')}
                  />

                </Block>

                <Block column>

                  <Text welcome style={{marginLeft: 70, marginTop: 10}}>
                    {i18n.t ('dashboard:selfUpdate')}

                  </Text>
                  <Text style={{marginLeft: 40}}>
                    {i18n.t ('dashboard:addSymptom')}
                  </Text>

                  <ActionButton
                    style={{marginLeft: 10, marginRight: 15}}
                    buttonColor="blue"
                    onPress={() => {
                  //    if (this.state.test == true) {
                        this.props.navigation.navigate ('SymptomFormHomeScreen');
                     /* } else {
                        this.refs.toast.show (
                          'you have already entered your symptoms',
                          DURATION.LENGTH_LONG
                        );
                      }*/
                    }}
                  />

                </Block>

              </Block>

              <ScrollView
                contentContainerStyle={styles.buttons}
                showsVerticalScrollIndicator={false}
              >
                <Block column space="between">
                  <Block
                    row
                    space="around"
                    style={{marginVertical: theme.sizes.base}}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate ('PersonList', {name: 'trackBack'})}
                    >
                      <Block center middle style={styles.button}>
                        <TrackBackIcon size={38} />
                        <Text
                          button
                          style={{marginTop: theme.sizes.base * 0.5}}
                        >
                          {settings['trackBack'].name}
                        </Text>
                      </Block>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate ('DonateScreen', {name: 'donate'})}
                    >
                      <Block center middle style={styles.button}>
                        <DonateIcon size={38} />
                        <Text
                          button
                          style={{marginTop: theme.sizes.base * 0.5}}
                        >
                          {settings['donate'].name}
                        </Text>
                      </Block>
                    </TouchableOpacity>
                  </Block>

                  <Block
                    row
                    space="around"
                    style={{marginVertical: theme.sizes.base}}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate ('SymptomList', {
                          name: 'selfQuarantine',
                        })}
                    >
                      <Block center middle style={styles.button}>
                        <SelfQuarantineIcon size={38} />
                        <Text
                          button
                          style={{marginTop: theme.sizes.base * 0.5}}
                        >
                          {settings['selfQuarantine'].name}
                        </Text>
                      </Block>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate ('NewsScreen', {name: 'news'})}
                    >
                      <Block center middle style={styles.button}>
                        <NewsIcon size={38} />
                        <Text
                          button
                          style={{marginTop: theme.sizes.base * 0.5}}
                        >
                          {settings['news'].name}
                        </Text>
                      </Block>
                    </TouchableOpacity>
                  </Block>
                </Block>
                <Toast
                  ref="toast"
                  style={{backgroundColor: 'blue'}}
                  position="top"
                  positionValue={200}
                  fadeInDuration={750}
                  fadeOutDuration={1000}
                  opacity={0.8}
                  textStyle={{color: 'black'}}
                />
              </ScrollView>
            </Block>
            
       }
      </View>
    );
  }
}

Dashboard.defaultProps = {
  settings: mocks,
};

export default withTranslation () (Dashboard);

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  dashboard: {
    flex: 1,
    padding: theme.sizes.base * 2,
    marginBottom: -theme.sizes.base * 6,
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
  },
  button: {
    backgroundColor: theme.colors.button,
    width: 151,
    height: 151,
    borderRadius: 151 / 2,
  },
});
