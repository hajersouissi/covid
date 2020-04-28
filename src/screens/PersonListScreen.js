import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  StatusBar,
  ActivityIndicator,
  View,
} from 'react-native';
import i18n from 'i18next';

import {withTranslation} from 'react-i18next';

import {getPersons} from '../api/PersonsApi';
import {ListItem, Divider} from 'react-native-elements';
import ActionButton from 'react-native-action-button';

class PersonList extends Component {
  static navigationOptions = ({navigation}) => {
    onSignedOut = () => {
      navigation.navigate ('Auth');
    };

    return {
      title: 'TrackBack',
    };
  };

  state = {
    personList: [],
    selectedIndex: 0,
    loading: true,
  };

  onPersonAdded = person => {
    this.setState (prevState => ({
      personList: [...prevState.personList, person],
    }));
    this.props.navigation.navigate ('PersonList');
  };

  onPersonDeleted = () => {
    var newPersonList = [...this.state.personList];
    newPersonList.splice (this.state.selectedIndex, 1);

    this.setState (prevState => ({
      personList: (prevState.personList = newPersonList),
    }));

    this.props.navigation.navigate ('PersonList');
  };

  onPersonsReceived = personList => {
    this.setState (prevState => ({
      personList: (prevState.personList = personList),
    }));
  };

  componentDidMount () {
    setTimeout (() => this.setState ({loading: false}), 1000);

    getPersons (this.onPersonsReceived);

    this.props.navigation.addListener ('willFocus', this._handleStateChange);
  }
  _handleStateChange = state => {
    this.setState ({loading: true});
    setTimeout (() => this.setState ({loading: false}), 1000);

    getPersons (this.onPersonsReceived);
  };

  showActionButton = () => (
    <ActionButton
      buttonColor="blue"
      onPress={() =>
        this.props.navigation.navigate ('PersonForm', {
          personAddedCallback: this.onPersonAdded,
        })}
    />
  );

  render () {
    return this.state.personList.length > 0
      ? <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="blue" />
          {this.state.loading
            ? <ActivityIndicator
                style={{marginTop: 260}}
                size="large"
                color="blue"
              />
            : <FlatList
                data={this.state.personList}
                ItemSeparatorComponent={() => (
                  <Divider style={{backgroundColor: 'black'}} />
                )}
                keyExtractor={(item, index) => index.toString ()}
                renderItem={({item, index}) => {
                  return (
                    <ListItem
                      containerStyle={styles.listItem}
                      title={item.name}
                      subtitle={`${i18n.t ('personList:testResult')}: ${item.testResult}`}
                      titleStyle={styles.titleStyle}
                      subtitleStyle={styles.subtitleStyle}
                      leftAvatar={{
                        size: 'large',
                        rounded: false,
                        source: item.image && {uri: item.image},
                      }}
                      onPress={() => {
                        this.setState (prevState => ({
                          selectedIndex: (prevState.selectedIndex = index),
                        }));
                        this.props.navigation.navigate ('PersonDetail', {
                          person: item,
                          personDeletedCallback: this.onPersonDeleted,
                        });
                      }}
                    />
                  );
                }}
              />}
          {this.showActionButton ()}
        </SafeAreaView>
      : <View style={styles.textContainer}>
          {this.state.loading
            ? <ActivityIndicator size="large" color="blue" />
            : <Text style={styles.emptyTitle}>
                {i18n.t ('personList:metso')}
              </Text>}
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
    fontSize: 30,
  },
  subtitleStyle: {
    fontSize: 18,
  },
  emptyTitle: {
    fontSize: 32,
    marginLeft: 90,

    alignSelf: 'center',
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default withTranslation () (PersonList);
