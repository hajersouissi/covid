import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  View,
  Slider,
  SafeAreaView,
  TextInput,
  Text,
  Button,
} from 'react-native';
import * as theme from '../theme';
import i18n from 'i18next';

import {withTranslation, WithTranslation} from 'react-i18next';

import PickerSelect from 'react-native-picker-select';
import {Block, PanSlider} from '../components';

import {withFormik} from 'formik';
import * as yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {addSymptom} from '../api/PersonsApi';

const SymptomForm = props => {
  return (
    <ScrollView>
      <StatusBar barStyle="light-content" backgroundColor="blue" />

      <Text
        style={{margin: 15, fontSize: 20, color: '#3f51b5', fontWeight: 'bold'}}
      >
        {i18n.t ('symptom:question')}

      </Text>

      <Text style={{fontSize: 16, marginLeft: 18, color: 'blue'}}>
        {i18n.t ('symptom:cold')}

      </Text>
      <PickerSelect
        onValueChange={value => props.setFieldValue ('cold', value)}
        items={[
          {label: i18n.t ('symptom:mild'), value: 'mild'},
          {label: i18n.t ('symptom:severe'), value: 'severe'},
          {label: i18n.t ('symptom:no'), value: 'no'},
        ]}
        style={pickerStyle}
      />
      <Text style={{fontSize: 16, marginLeft: 18, color: 'blue'}}>
        {i18n.t ('symptom:cough')}

      </Text>
      <PickerSelect
        onValueChange={value => props.setFieldValue ('cough', value)}
        items={[
          {label: i18n.t ('symptom:mild'), value: 'mild'},
          {label: i18n.t ('symptom:severe'), value: 'severe'},
          {label: i18n.t ('symptom:no'), value: 'no'},
        ]}
        style={pickerStyle}
      />

      <Text style={{fontSize: 16, marginLeft: 18, color: 'blue'}}>
        {i18n.t ('symptom:fever')}

      </Text>

      <TextInput
        value={props.values.fever}
        style={styles.longFormInput}
        //placeholder={i18n.t ('symptom:yesno')}
        onChangeText={text => {
          props.setFieldValue ('fever', text);
        }}
      />
      <Text
        style={{margin: 15, fontSize: 20, color: '#3f51b5', fontWeight: 'bold'}}
      >
        {i18n.t ('symptom:todaySymptom')}

      </Text>

      <TextInput
        value={props.values.todaySymptom}
        style={styles.longFormInput}
        placeholder="yes/no"
        onChangeText={text => {
          props.setFieldValue ('todaySymptom', text);
        }}
      />

      <TouchableHighlight style={styles.buttonStyle}>

        <Button
          color="blue"
          title={i18n.t ('symptom:submit')}
          onPress={() => props.handleSubmit ()}
        />

      </TouchableHighlight>

    </ScrollView>
  );
};
const pickerStyle = {
  inputIOS: {
    color: 'red',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    width: '90%',
    height: 50,
    color: 'black',
    alignSelf: 'center',

    backgroundColor: '#eee',
    borderWidth: 4,
    padding: 8,
    margin: 16,
  },
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

    borderRadius: 10,
    backgroundColor: '#D3D3D3',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,

    width: 200,
  },
});

const Formikc = withFormik ({
  mapPropsToValues: ({symptom}) => ({
    cold: symptom.cold,
    cough: symptom.cough,

    fever: symptom.fever,
    todaySymptom: symptom.todaySymptom,
  }),
  handleSubmit: (values, {props}) => {
    console.log (props);

    console.log (values);

    values.createdAt = props.symptom.createdAt;

    addSymptom (values, props.onSymptomAdded);
  },
}) (SymptomForm);
const translated = withTranslation () (Formikc);

export default translated;
