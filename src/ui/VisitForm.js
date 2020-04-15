import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  View,
  SafeAreaView,
  Picker,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {withFormik} from 'formik';
import i18n from 'i18next';

import {withTranslation, WithTranslation} from 'react-i18next';

import * as yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {CountriesScreen} from '../components';

import {addVisit} from '../api/PersonsApi';

const VisitForm = props => {
  return (
    <ScrollView>
      <StatusBar barStyle="light-content" backgroundColor="blue" />

      <Text
        style={styles.text}
        value={props.values.visitedCountryName}
        onChangeText={text => {
          props.setFieldValue ('visitedCountryName', text);
        }}
      />

      <Text
        style={{
          marginBottom: 15,
          marginLeft: 15,
          fontSize: 20,
          color: '#3f51b5',
          fontWeight: 'bold',
        }}
      >
        {i18n.t ('visit:visitDetails')}

      </Text>

      <Text style={{fontSize: 16, marginLeft: 18, color: 'blue'}}>
        {i18n.t ('visit:visitedCountryName')}

      </Text>
      <CountriesScreen />

      <Text style={{fontSize: 16, marginLeft: 18, color: 'blue'}}>
        {i18n.t ('visit:chosenDateVisit')}

      </Text>
      <View>
        <Text
          style={styles.text}
          value={props.values.chosenDateVisit}
          onChangeText={text => {
            props.setFieldValue ('chosenDateVisit', text);
          }}
        >
          {props.chosenDateVisit}
        </Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={props.showPicker}>
          <Text style={styles.text}>{i18n.t ('visit:selectDate')}</Text>

        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={props.isVisible}
          onConfirm={props.handlePicker}
          onCancel={props.hidePicker}
        />
      </View>

      <Text style={{fontSize: 16, marginLeft: 18, color: 'blue'}}>
        {i18n.t ('visit:placeStayVisit')}

      </Text>
      <TextInput
        value={props.values.placeStayVisit}
        style={styles.longFormInput}
        placeholder={i18n.t ('visit:placeStayVisit')}
        onChangeText={text => {
          props.setFieldValue ('placeStayVisit', text);
        }}
      />
      <Text
        style={{
          marginBottom: 15,
          marginLeft: 15,
          fontSize: 20,
          color: '#3f51b5',
          fontWeight: 'bold',
        }}
      >
        {i18n.t ('visit:arrivalDetails')}

      </Text>

      <Text style={{fontSize: 16, marginLeft: 18, color: 'blue'}}>
        {i18n.t ('visit:arrivalCountryName')}

      </Text>
      <CountriesScreen onSelectCountry={props.handleCountry} />

      <Text style={{fontSize: 16, marginLeft: 18, color: 'blue'}}>

        {i18n.t ('visit:chosenDateArrival')}

      </Text>

      <View>
        <Text
          style={styles.text}
          value={props.values.chosenDateArrival}
          onChangeText={text => {
            props.setFieldValue ('chosenDateArrival', text);
          }}
        >
          {props.chosenDateArrival}
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={props.showPickerArrival}
        >
          <Text style={styles.text}>
            {i18n.t ('visit:selectDate')}
          </Text>

        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={props.isVisibleArrival}
          onConfirm={props.handlePickerArrival}
          onCancel={props.hidePickerArrival}
        />
      </View>

      <Text style={{fontSize: 16, marginLeft: 18, color: 'blue'}}>
        {i18n.t ('visit:placeStayArrival')}

      </Text>
      <TextInput
        value={props.values.placeStayArrival}
        style={styles.longFormInput}
        placeholder={i18n.t ('visit:placeStayVisit')}
        onChangeText={text => {
          props.setFieldValue ('placeStayArrival', text);
        }}
      />

      <TouchableHighlight style={styles.buttonStyle}>
        <Button
          color="blue"
          title={i18n.t ('visit:submit')}
          onPress={() => props.handleSubmit ()}
        />
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create ({
  container: {
    padding: 8,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInput: {
    width: 300,
    height: 50,
    borderColor: '#B5B4BC',
    borderWidth: 1,
    alignSelf: 'center',

    padding: 8,
  },
  validationText: {
    color: 'blue',
  },
  longFormInput: {
    width: '90%',
    height: 50,
    color: 'black',
    alignSelf: 'center',

    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    margin: 16,
  },
  buttonStyle: {
    height: 40,
    alignSelf: 'center',

    borderRadius: 1,
    backgroundColor: '#B5B4BC',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,

    width: 200,
  },
  text: {
    fontSize: 18,
    marginTop: 5,
    color: 'black',
    textAlign: 'center',
  },

  picker: {
    height: 50,
    width: 200,
  },
});

const FormikVisit = withFormik ({
  mapPropsToValues: ({visit}) => ({
    placeStayVisit: visit.placeStayVisit,
    arrivalCountryName: visit.arrivalCountryName,

    placeStayArrival: visit.placeStayArrival,
    cityArrival: visit.cityArrival,
  }),
  handleSubmit: (values, {props}) => {
    console.log (props);

    console.log (values);
    values.chosenDateVisit = props.chosenDateVisit;
    values.createdAt = props.visit.createdAt;
    values.chosenDateArrival = props.chosenDateArrival;

    addVisit (values, props.onVisitAdded);
  },
}) (VisitForm);

const translatedVisitForm = withTranslation () (FormikVisit);

export default translatedVisitForm;
