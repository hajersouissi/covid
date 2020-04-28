import React from 'react';
import {translate, Trans, withTranslation} from 'react-i18next';
import {StyleSheet, Text, View, Button} from 'react-native';
import i18n from 'i18next';

export class Page2 extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: screenProps.i18n.t ('page2:title'),
  });

  render () {
    return (
      <View style={styles.container}>
        <Text>{i18n.t ('page2:introduction')}</Text>
        <Text>{i18n.t ('common:currentLanguage', {lng: i18n.language})}</Text>
        <Trans i18nKey="common:infoText">
          <Text style={styles.bold}>
            <Text style={styles.bold}>One </Text>
            <Text style={styles.light}>Two </Text>
            <Text style={styles.bold}>Three </Text>
            <Text style={styles.light}>Four </Text>
            <Text style={styles.bold}>Five </Text>
          </Text>
        </Trans>
      </View>
    );
  }
}

export default withTranslation (['page2', 'common'], {wait: true}) (Page2);

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  light: {
    fontWeight: 'normal',
  },
});
