import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  StatusBar,
  ActivityIndicator,
  View,
} from 'react-native';
import {getSymptoms, signout} from '../api/PersonsApi';
import {ListItem, Divider} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import * as moment from 'moment';
import i18n from 'i18next';

import {withTranslation} from 'react-i18next';

class SymptomList extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Self Quarantine',
    };
  };

  state = {
    symptomList: [],
    selectedIndex: 0,
    loading: true,
  };

  onSymptomAdded = symptom => {
    this.setState (prevState => ({
      symptomList: [...prevState.symptomList, symptom],
    }));

    this.props.navigation.navigate ('SymptomList');
  };
  onSymptomDeleted = () => {
    var newSymptomList = [...this.state.symptomList];
    newSymptomList.splice (this.state.selectedIndex, 1);

    this.setState (prevState => ({
      symptomList: (prevState.symptomList = newSymptomList),
    }));

    this.props.navigation.navigate ('SymptomList');
  };

  onSymptomsReceived = symptomList => {
    this.setState (prevState => ({
      symptomList: (prevState.symptomList = symptomList),
    }));
  };

  componentDidMount () {
    setTimeout (() => this.setState ({loading: false}), 1000);

    getSymptoms (this.onSymptomsReceived);
    this.props.navigation.addListener ('willFocus', this._handleStateChange);
  }
  _handleStateChange = state => {
    this.setState ({loading: true});
    setTimeout (() => this.setState ({loading: false}), 1000);

    getSymptoms (this.onSymptomsReceived);
  };

  showActionButton = () => (
    <ActionButton
      buttonColor="blue"
      onPress={() =>
        this.props.navigation.navigate ('SymptomFormHomeScreen', {
          symptomAddedCallback: this.onSymptomAdded,
        })}
    />
  );

  render () {
    console.log ('hii', this.state.symptomList);

    return this.state.symptomList.length > 0
      ? <SafeAreaView style={styles.container}>

          <StatusBar barStyle="light-content" backgroundColor="blue" />
          {this.state.loading
            ? <ActivityIndicator
                style={{marginTop: 250}}
                size="large"
                color="blue"
              />
            : <FlatList
                data={this.state.symptomList}
                ItemSeparatorComponent={() => (
                  <Divider style={{backgroundColor: 'black'}} />
                )}
                keyExtractor={(item, index) => index.toString ()}
                renderItem={({item, index}) => {
                  const mdate = new Date (item.createdAt.toDate ());
                  let moment = require ('moment');
                  if ('default' in moment) {
                    moment = moment['default'];
                  }

                  let mydate = moment (mdate).format ('YYYY-MM-DD');
                  let mcough = '';
                  let mcold = '';

                  if (item.cough == 'mild') {
                    mcough = i18n.t ('symptomList:mild');
                  }
                  if (item.cough == 'severe') {
                    mcough = i18n.t ('symptomList:severe');
                  }
                  if (item.cough == 'no') {
                    mcough = i18n.t ('symptomList:no');
                  }
                  if (item.cold == 'mild') {
                    mcold = i18n.t ('symptomList:mild');
                  }
                  if (item.cold == 'severe') {
                    mcold = i18n.t ('symptomList:severe');
                  }
                  if (item.cold == 'no') {
                    mcold = i18n.t ('symptomList:no');
                  }

                  return (
                    <ListItem
                      containerStyle={styles.listItem}
                      title={`  ${i18n.t ('symptomList:day')}  ${(index + 1).toString ()}`}
                      subtitle={` ${mcough} ${i18n.t ('symptomList:cough')} ${mcold}  ${i18n.t ('symptomList:cold')} / ${item.fever} °C `}
                      titleStyle={styles.titleStyle}
                      subtitleStyle={styles.subtitleStyle}
                      rightSubtitle={mydate.toString ()}
                      rightSubtitleStyle={styles.rightSubtitleStyle}
                      /* leftAvatar={{
                    size: 'large',
                    rounded: false,
                    source: item.image && {uri: item.image},
                  }}*/
                      onPress={() => {
                        this.setState (prevState => ({
                          selectedIndex: (prevState.selectedIndex = index),
                        }));
                        this.props.navigation.navigate ('SymptomDetailScreen', {
                          symptom: item,
                          symptomDeletedCallback: this.onSymptomDeleted,
                          day: index,
                        });
                      }}
                    />
                  );
                }}
              />}
          {this.showActionButton ()}

        </SafeAreaView>
      : <View style={styles.textContainer}>

          {this.showActionButton ()}
        </View>;
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#F5FCFF',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
  subtitleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  rightSubtitleStyle: {
    marginBottom: 40,
  },
});

export default withTranslation () (SymptomList);
