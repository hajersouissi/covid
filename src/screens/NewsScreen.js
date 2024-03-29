import React, {Component} from 'react';
import {Alert, View, ActivityIndicator, Dimensions} from 'react-native';
import {Container, Content, List, Text} from 'native-base';

import DataItem from '../components/DataItem';
import Modal from '../components/Modal';
import i18n from 'i18next';

import {withTranslation} from 'react-i18next';

import {getArticles} from '../service/news';

class NewsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: i18n.t ('news:title'),
    };
  };
  constructor (props) {
    super (props);

    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData: {},
    };
  }

  handleItemDataOnPress = articleData => {
    this.setState ({
      setModalVisible: true,
      modalArticleData: articleData,
    });
  };

  handleModalClose = () => {
    this.setState ({
      setModalVisible: false,
      modalArticleData: {},
    });
  };

  componentDidMount () {
    getArticles ().then (
      data => {
        this.setState ({
          isLoading: false,
          data: data,
        });
      },
      error => {
        Alert.alert ('Error', 'Something went wrong!');
      }
    );
  }

  render () {
    console.log (this.state.data);

    let view = this.state.isLoading
      ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            style={{marginTop: Dimensions.get ('window').height / 3}}
            animating={this.state.isLoading}
            color="#00f0ff"
          />
          <Text style={{marginTop: 10}} children="Please Wait.." />
        </View>
      : <List
          dataArray={this.state.data}
          renderRow={item => {
            console.log ('item ', item);
            return (
              <DataItem onPress={this.handleItemDataOnPress} data={item} />
            );
          }}
        />;

    return (
      <Container>
        <Content>
          {view}
        </Content>
        <Modal
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}
export default withTranslation () (NewsScreen);
