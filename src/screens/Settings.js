import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Slider,
  TouchableHighlight,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../theme';
import {Block, Text, PanSlider} from '../components';
import mocks from '../settings';

class Settings extends Component {
  static navigationOptions = {
    headerLeft: ({onPress}) => (
      <TouchableWithoutFeedback onPress={() => onPress ()}>
        <FontAwesome
          size={theme.sizes.font * 1.5}
          color={theme.colors.black}
          name="arrow-left"
        />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: theme.sizes.base * 2,
    },
    headerStyle: {
      borderBottomColor: 'transparent',
    },
  };

  state = {
    direction: 45,
    speed: 12,
  };

  renderController () {
    return (
      <Block right style={styles.controller}>
        <Block center style={styles.controllerValue}>
          <Text color="white">34</Text>
        </Block>
        <Block style={[styles.controllerOverlay]} />
      </Block>
    );
  }

  render () {
    const {navigation, settings} = this.props;

    return (
      <Block style={styles.settings}>

        <Block row>

          <Block column>

            <Block row style={{alignItems: 'flex-end'}}>
              <Text h1>27</Text>

            </Block>
            <Text caption>
              Self Quarantine Update
            </Text>

          </Block>
          <Block style={{marginLeft: 30}} center>
            <PanSlider
             
            
             />
            <Text caption> Fever  (°C) </Text>

          </Block>
        </Block>
        <Block style={{paddingTop: theme.sizes.base * 2}}>
          <Block column style={{marginVertical: theme.sizes.base * 2}}>
            <Block row space="between">
              <Text welcome color="black">Cough</Text>
              <Text welcome color="black">{this.state.direction}</Text>
            </Block>
            <Slider
              value={45}
              mininumValue={0}
              maximumValue={90}
              thumbTintColor={theme.colors.accent}
              minimumTrackTintColor={theme.colors.accent}
              maximumTrackTintColor={theme.colors.gray2}
              onValueChange={value =>
                this.setState ({direction: parseInt (value, 10)})}
            />
          </Block>

          <Block column style={{marginVertical: theme.sizes.base * 2}}>
            <Block row space="between">
              <Text welcome color="black">Cold</Text>
              <Text welcome color="black">{this.state.speed}</Text>
            </Block>
            <Slider
              value={12}
              mininumValue={0}
              maximumValue={30}
              thumbTintColor={theme.colors.accent}
              minimumTrackTintColor={theme.colors.accent}
              maximumTrackTintColor={theme.colors.gray2}
              onValueChange={value =>
                this.setState ({speed: parseInt (value, 10)})}
            />
          </Block>
        </Block>
       

      </Block>
    );
  }
}

Settings.defaultProps = {
  settings: mocks,
};

export default Settings;

const styles = StyleSheet.create ({
  settings: {
    padding: theme.sizes.base * 2,
  },
  slider: {},
  buttonStyle: {
    height: 40,
    alignSelf: 'center',

    borderRadius: 10,
    backgroundColor: 'blue',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,

    width: 200,
  },
});
