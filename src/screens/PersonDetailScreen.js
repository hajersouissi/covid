import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { deletePerson } from '../api/PersonsApi'
import i18n from 'i18next';


import {withTranslation, WithTranslation} from 'react-i18next';

class PersonDetailScreen extends Component {

  static navigationOptions = () => {
    return {
      title: i18n.t('personDetails: title')
    }
  };

  render() {
    const person = this.props.navigation.getParam('person');

    const onPersonDeleted = this.props.navigation.getParam('personDeletedCallback');

    console.log(person);
    return (
       <ScrollView>
  
      <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="blue" />
        <View style={styles.row}>
          <Icon
            reverse
            name='ios-create'
            color='blue'
            type='ionicon'
            onPress={() =>
              this.props.navigation.navigate('PersonForm', {
                person: person
              })
            }
          />
          <Icon
            reverse
            name='ios-trash'
            type='ionicon'
            color='#CA300E'
            onPress={() =>
              Alert.alert(
               i18n.t ('personDetail:delete'),
             i18n.t ('personDetail:deleteDes'),
                [
                  { text: i18n.t ('personDetail:cancel') },
                  { text: 'OK', onPress: () => { deletePerson(person, onPersonDeleted) } }
                ],
                { cancelable: false },
              )
            }
          />
        </View>
        <Image style={styles.image} source={person.image && { uri: person.image }} />
        <Text style={styles.headerText}>{person.name}</Text>
        <Text style={styles.testResultText}>{i18n.t ('personDetail:testResult')}{': '}{person.testResult}</Text>

        <Text style={styles.symptomText}>{i18n.t ('personDetail:symptoms')}</Text>
        {
          person.symptoms === undefined || person.symptoms.length == 0 ?
            <Text>None</Text> : <FlatList
              data={person.symptoms}
              style={{marginBottom:40}}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() =>
                <Divider style={{ backgroundColor: 'black' }} />}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <Text style={styles.symptomItemText}>{item}</Text>
              }
            />
        }
      </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    marginBottom: 32
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  testResultText: {
    fontSize: 20,
    marginBottom: 32
  },
  symptomText: {
    fontStyle: 'italic',
    fontSize: 18,
    marginBottom: 32
  },
  symptomItemText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16
  },
  container: {
    alignItems: 'center'
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: 'grey'
  }
});

export default withTranslation() (PersonDetailScreen);