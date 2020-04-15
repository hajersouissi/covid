//import libraries
import React, {Component} from 'react';
import {Dimensions, Modal, Share, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';

import {
  Container,
  Header,
  Content,
  Body,
  Left,
  Icon,
  Right,
  Title,
  Button,
} from 'native-base';

const webViewHeight = Dimensions.get ('window').height - 56;

// create a component
class ModalDonate extends Component {
  constructor (props) {
    super (props);
  }

  handleClose = () => {
    return this.props.onClose ();
  };

  /* handleShare = () => {
    const {url, title} = this.props.articleData;
    message = '${title}\n\nRead More @${url}\n\nShared via RN News App';
    return Share.share (
      {title, message, url: message},
      {dialogTitle: `Share ${title}`}
    );
  };*/

  render () {
    const {showModal} = this.props;
  
      return (
        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={this.handleClose}
        >
          <Container
            style={{margin: 15, marginBottom: 0, backgroundColor: '#fff'}}
          >
            <Header style={{backgroundColor: 'blue'}}>
              <Left>
                <Button onPress={this.handleClose} transparent>
                  <Icon name="close" style={{color: 'white', fontSize: 12}} />
                </Button>
              </Left>
              <Body>
                <Title children='FIGHT CORONAVIRUS' style={{color: 'white'}} />
              </Body>
              <Right>
                <Button onPress={this.handleShare} transparent>
                  <Icon name="share" style={{color: 'white', fontSize: 12}} />
                </Button>
              </Right>
            </Header>

            <ScrollView contentContainerStyle={{flexGrow: 1}}>

              <WebView
                source={{uri:'https://covid19responsefund.org'}}
                style={{flex: 1}}
                onError={this.handleClose}
                startInLoadingState
                scalesPageToFit
                scrollEnabled={true}
              />

            </ScrollView>
          </Container>
        </Modal>
      );
   
  }
}

//make this component available to the app
export default ModalDonate;
