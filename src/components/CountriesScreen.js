import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View} from 'react-native';
import RNCountry from 'react-native-countries';

class CountriesScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      countryCode: 'TR',
    };
  }

  handleCountChange = () => {
    var lang = this.dropdown.selectedValue;
    this.props.onSelectCountry (lang);
  };

  componentWillMount () {
    let countryNamesWithCodes = RNCountry.getCountryNamesWithCodes;
    countryNamesWithCodes.sort ((a, b) => a.name.localeCompare (b.name));
    this.setState ({
      countryNameListWithCode: countryNamesWithCodes,
    });
  }
  render () {
    console.log ('lang', this.state.countryCode);

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.countryCode}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState ({countryCode: itemValue})}
          onChange={this.handleCountChange}
          ref={ref => (this.dropdown = ref)}
        >
          {this.state.countryNameListWithCode.map (val => {
            return (
              <Picker.Item
                key={'country-item-' + val.code}
                label={val.name}
                value={val.code}
              />
            );
          })}
        </Picker>
        <Text>Selected Country Code: {this.state.countryCode}</Text>
      </View>
    );
  }
}
export default CountriesScreen;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 200,
  },
});
