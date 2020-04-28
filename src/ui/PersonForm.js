import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  StatusBar,
  Text,
  Button,
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import i18n from 'i18next';

import {withTranslation, WithTranslation} from 'react-i18next';

import GridList from '../ui/GridList';
import {withFormik} from 'formik';
import * as yup from 'yup';
import {addPerson, updatePerson, uploadPerson} from '../api/PersonsApi';
import CurryImagePicker from '../ui/CurryImagePicker';

const PersonForm = props => {
  setPersonImage = image => {
    props.setFieldValue ('imageUri', image.uri);
  };

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" backgroundColor="blue" />
      <View style={styles.containerview}>

        <CurryImagePicker
          image={props.person.image}
          onImagePicked={setPersonImage}
        />
        <TextInput
          value={props.values.name}
          style={styles.longFormInput}
          placeholder={i18n.t ('personForm:name')}
          onChangeText={text => {
            props.setFieldValue ('name', text);
          }}
        />
        <Text style={styles.validationText}> {props.errors.name}</Text>
        <Text style={styles.text}> {i18n.t ('personForm:testResult')}</Text>

        <PickerSelect
          onValueChange={value => props.setFieldValue ('testResult', value)}
          items={[
            {label: i18n.t ('personForm:positive'), value: 'positive'},
            {label: i18n.t ('personForm:negative'), value: 'negative'},
          ]}
          style={picker}
        />

        <Text style={styles.validationText}> {props.errors.testResult}</Text>
        <View style={styles.row}>

          <PickerSelect
            onValueChange={value => props.setSymptoms (value)}
            items={[
              {label: i18n.t ('personForm:cough'), value: 'cough'},
              {label: i18n.t ('personForm:cold'), value: 'cold'},
              {label: i18n.t ('personForm:fever'), value: 'fever'},
            ]}
            style={pickerStyle}
          />

          <Button
            color="blue"
            title={i18n.t ('personForm:add')}
            onPress={() => {
              props.submitSymptoms ();
            }}
          />
        </View>
        <GridList items={props.person.symptoms} />
        <View style={styles.container}>
          <Button
            color="blue"
            title={i18n.t ('personForm:submit')}
            onPress={() => props.handleSubmit ()}
          />

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create ({
  row: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 25,
    marginBottom: 32,
    marginTop: 10,
  },
  containerview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '70%',

    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 32,
    backgroundColor: 'blue',
    marginBottom: 20,
  },
  button: {
    height: 50,
    alignSelf: 'center',

    borderRadius: 1,
    backgroundColor: '#eee',

    marginBottom: 20,
  },
  formInput: {
    borderColor: '#eee',
    borderWidth: 1,
    padding: 8,
    height: 50,
    color: 'black',
    width: '75%',
    marginLeft: 25,

    marginTop: 16,
    width: '70%',
    height: 50,

    alignSelf: 'center',
  },
  validationText: {
    color: 'red',
  },
 text: {
    color: 'black',
    alignSelf:'flex-start',
    marginBottom:10,
    marginLeft:25
  },
  longFormInput: {
    width: '87%',
    height: 50,
    color: 'black',
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    margin: 16,
    marginLeft: 25,
  },
});
const picker= {
  inputIOS: {
    color: 'red',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    width: '87%',
    height: 50,
    marginLeft:8 ,
    color: 'black',
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderWidth: 4,
   
  },
};


const pickerStyle = {
  inputAndroid: {
    width: '130%',
    height: 50,
    color: 'black',
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderWidth: 4,
    padding: 8,
    marginLeft: 90,
  },
};

const FormikPerson = withFormik ({
  mapPropsToValues: ({person}) => ({
    name: person.name,
    testResult: person.testResult,
    imageUri: null,
  }),
  enableReinitialize: true,
  validationSchema: props =>
    yup.object ().shape ({
      name: yup.string ().required (i18n.t("personForm:nameReq")),
      testResult: yup.string ().required (i18n.t ('personForm:testResultReq')),
    }),
  handleSubmit: (values, {props}) => {
    console.log (props);

    values.symptoms = props.person.symptoms;

    console.log (values);

    if (props.person.id) {
      values.id = props.person.id;
      values.createdAt = props.person.createdAt;
      values.userid = props.person.userid;

      values.image = props.person.image;
      uploadPerson (values, props.onPersonUpdated, {updating: true});
    } else {
      uploadPerson (values, props.onPersonAdded, {updating: false});
    }
  },
}) (PersonForm);

const translatedPersonForm = withTranslation () (FormikPerson);

export default translatedPersonForm;
