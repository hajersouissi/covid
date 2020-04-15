import React from 'react';

import i18n from 'i18next';
import {StyleSheet, Text, View, Button,Image, AsyncStorage,StatusBar} from 'react-native';
import {withTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

// using the translation hoc to provie t function in props using home as default namespace
// https://github.com/i18next/react-i18next#translate-hoc

const HeaderTitle = props => (
  <View style={{textAlign: 'left', flex: 1}}>
    <Text style={{fontSize: 21, fontWeight: 'bold'}}>{props.lang}</Text>
  </View>
);
export class HelloScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: <HeaderTitle lang={screenProps.i18n.t ('home:title')} />,
  });

  async onChangeLang (lang) {
    i18n.changeLanguage (lang);
    try {
      await AsyncStorage.setItem ('@APP:languageCode', lang);
    } catch (error) {
      console.log (` Hi Errorrrr : ${error}`);
    }
    console.log (i18n.dir ());
    console.log ('langgg', i18n.language);
  }

  render () {
    const {navigation} = this.props;
    const {navigate} = navigation;

    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="blue" />
      <Image source={require ('../assets/covidapp.png')} style={styles.image} />

        <Text
          style={{
            margin: 15,
            fontSize: 20,
            color: '#00BFFF',
            fontWeight: 'bold',
          }}
        >
          {i18n.t ('common:currentLanguage', {lng: i18n.language})}
        </Text>
        <Button
          onPress={() => this.onChangeLang ('en')}
          title={i18n.t ('common:actions.toggleToEnglish')}
        />

        <Button
          onPress={() => this.onChangeLang ('fr')}
          title={i18n.t ('common:actions.toggleToFrench')}
        />

        <View style={styles.langContainer}>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00BFFF', '#0000FF']}
            style={styles.button}
          >
            <Text
              style={styles.textOrder}
              onPress={() => navigate ('LoginScreen')}
            >
              {i18n.t ('common:actions.goToPage2')}

            </Text>
          </LinearGradient>

        </View>

      </View>
    );
  }
}

export default withTranslation (['home', 'common'], {wait: true}) (HelloScreen);
let isRTL = i18n.dir ();
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  langContainer: {
    alignItems: isRTL === 'rtl' ? 'flex-end' : 'flex-start',
    paddingRight: isRTL === 'rtl' ? 30 : 10,
    paddingLeft: isRTL === 'rtl' ? 10 : 30,

    flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row',
    padding: 5,
    borderRightWidth: isRTL === 'rtl' ? 2 : 0,
    borderLeftWidth: isRTL === 'rtl' ? 0 : 2,
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
  },
  separate: {
    marginTop: 50,
  },
  image: {
    width: '50%',
    height: '30%',
    borderWidth: 5,
alignSelf:'center',
    borderColor: 'white',
    borderRadius: 3
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 100,
    margin: 40,
    alignSelf: 'center',
    flex: 1,
  },
  textOrder: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
  },
});
