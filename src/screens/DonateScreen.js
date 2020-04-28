import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Text, Container} from 'native-base';
import i18n from 'i18next';

import {withTranslation} from 'react-i18next';

import LinearGradient from 'react-native-linear-gradient';
import ModalDonate from '../components/ModalDonate';

class DonateScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: i18n.t ('donate:donateTitle'),
    };
  };

  constructor (props) {
    super (props);

    this.state = {
      setModalVisible: false,
    };
  }
  handleItemDataOnPress = () => {
    this.setState ({
      setModalVisible: true,
    });
  };
  handleModalClose = () => {
    this.setState ({
      setModalVisible: false,
    });
  };

  render () {
    return (
      <Container>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <ImageBackground
            source={require ('../assets/background.jpg')}
            style={{flex: 1, alignItems: 'center', paddingTop: 80}}
            resizeMode={'stretch'}
          >
            <View style={styles.image_container}>
              <Image
                source={require ('../assets/donation.png')}
                style={styles.image}
              />
            </View>

          </ImageBackground>
          <ScrollView style={styles.footer}>
            <View
              style={{flexDirection: 'row', textAlign: 'left', fontSize: 12}}
            >
              <View style={styles.status}>

                <Text
                  style={{color: 'blue', marginTop: 10, alignSelf: 'center'}}
                >
                  {i18n.t ('donate:help')}

                </Text>
                <Image
                  source={require ('../assets/who.png')}
                  style={{width: 75, height: 75, marginLeft: 5, marginRight: 5}}
                />

              </View>
              <Text numberOfLines={4} style={styles.textName}>
                {i18n.t ('donate:donateSub')}

              </Text>

            </View>

            <Text style={styles.textDetail}>
              {i18n.t ('donate:donateDes')}
            </Text>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#00BFFF', '#0000FF']}
              style={styles.button}
            >
              <Text
                style={styles.textOrder}
                onPress={this.handleItemDataOnPress}
              >
                {i18n.t ('donate:donateButton')}

              </Text>
            </LinearGradient>
          </ScrollView>
        </View>
        <ModalDonate
          showModal={this.state.setModalVisible}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}

const height = Dimensions.get ('screen').height;
const height_image = height * 0.5 * 0.5;
export default withTranslation () (DonateScreen);
var styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  footer: {
    flex: 1,
    paddingHorizontal: 40,
  },
  image_container: {
    width: height_image,
    height: height_image,
    marginBottom: height_image,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 5,

    borderColor: 'white',
    borderRadius: height_image / 2,
  },
  back: {
    position: 'absolute',
    left: 0,

    marginLeft: 15,
  },
  status: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 3,
    borderColor: 'blue',
  },
  textPrice: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 5,
  },
  textName: {
    flex: 1,
    color: '#3e3c3e',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginStart: 20,
  },
  textDetail: {
    color: 'gray',
    marginTop: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 100,
    marginBottom: 30,
  },
  textOrder: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
