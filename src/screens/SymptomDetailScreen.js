import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { Icon} from 'react-native-elements';
import {deleteSymptom} from '../api/PersonsApi';
import i18n from 'i18next';
import {Card} from 'react-native-shadow-cards';

import {withTranslation} from 'react-i18next';

class SymptomDetailScreen extends Component {
  static navigationOptions = () => {
    return {
     // title: 'Symptom Details',
    };
  };

  render () {
    const symptom = this.props.navigation.getParam ('symptom');
    const index = this.props.navigation.getParam ('day');

    const onSymptomDeleted = this.props.navigation.getParam (
      'symptomDeletedCallback'
    );
    const mdate = new Date (symptom.createdAt.toDate ());
    let moment = require ('moment');
    if ('default' in moment) {
      moment = moment['default'];
    }

    let mydate = moment (mdate).format ('YYYY-MM-DD');
    let mcough = '';
    let mcold = '';

    if (symptom.cough == 'mild') {
      mcough = i18n.t ('symptomList:mild');
    }
    if (symptom.cough == 'severe') {
      mcough = i18n.t ('symptomList:severe');
    }
    if (symptom.cough == 'no') {
      mcough = i18n.t ('symptomList:no');
    }
    if (symptom.cold == 'mild') {
      mcold = i18n.t ('symptomList:mild');
    }
    if (symptom.cold == 'severe') {
      mcold = i18n.t ('symptomList:severe');
    }
    if (symptom.cold == 'no') {
      mcold = i18n.t ('symptomList:no');
    }
    console.log (symptom);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="blue" />
           
        <View style={styles.row}>  

          <Icon
            reverse
            name="ios-create"
            type="ionicon"
            color="blue"
            onPress={() =>
              this.props.navigation.navigate ('SymptomFormHomeScreen', {
                symptom: symptom,
              })}
          />
          <Icon
            reverse
            name="ios-trash"
            type="ionicon"
            color="#CA300E"
            onPress={() =>
              Alert.alert (
                i18n.t ('personDetail:delete'),
                i18n.t ('personDetail:deleteDes'),
                [
                  {text: i18n.t ('personDetail:cancel')},
                  {
                    text: 'OK',
                    onPress: () => {
                      deleteSymptom (symptom, onSymptomDeleted);
                    },
                  },
                ],
                {cancelable: false}
              )}
          />
       
        </View>
     
        <Text style={styles.headerText}>
          {`  ${i18n.t ('symptomList:day')}  ${(index + 1).toString ()}`}
        </Text>

        
        <Text style={styles.testResultText}>
          {mydate}
        </Text>

        <Text style={styles.symptomText}>
          {i18n.t ('personDetail:symptoms')}
        </Text>
        <View style={styles.container}>
          <Card style={{padding: 20, margin: 10}}>
            <Text style={styles.testResultText}>

              {i18n.t ('symptomList:cough')}{' : '}

              {mcough}

            </Text>
            <Text style={styles.testResultText}>
              {'    '}
              {i18n.t ('symptom:cold')}
              {' : '}

              {mcold}

            </Text>

            <Text style={styles.testResultText}>
              {i18n.t ('symptom:fever')}{' : '}{symptom.fever}{'       '}

            </Text>

          </Card>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  headerText: {
    fontSize: 32,
    marginBottom: 32,
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  testResultText: {
    fontSize: 20,
    marginBottom: 32,
    alignSelf: 'center',
  },
  symptomText: {
    fontStyle: 'italic',
    fontSize: 18,
    marginBottom: 32,
  },
  symptomItemText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  container: {
    alignItems: 'center',
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: 'grey',
  },
});

export default withTranslation () (SymptomDetailScreen);
