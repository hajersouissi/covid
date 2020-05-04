import React from 'react';
import {StyleSheet, View, TextInput, StatusBar} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {withFormik} from 'formik';
import * as yup from 'yup';
import i18n from 'i18next';
import PickerSelect from 'react-native-picker-select';

import {withTranslation} from 'react-i18next';

const AuthForm = props => {
  displayNameInput = (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="blue" />

      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue ('displayName', text)}
        placeholder={i18n.t ('auth:displayName')}
      />
      <Text style={styles.validationText}>{props.errors.displayName}</Text>
    </View>
  );
  signupInput = (
    <View>
      <Text p>
        {i18n.t ('auth:foreignVisit')}
      </Text>
      <PickerSelect
        onValueChange={value => props.setFieldValue ('foreignVisit', value)}
        items={[
          {label: i18n.t ('auth:yes'), value: 'yes'},
          {label: i18n.t ('auth:no'), value: 'no'},
        ]}
        style={pickerStyle}
      />

      <Text style={styles.validationText}>{props.errors.foreignVisit}</Text>

    </View>
  );
  return (
    <View style={styles.container}>
      <Text h2 style={styles.header}>CovHelper</Text>
      {props.authMode === 'signup' ? displayNameInput : null}
      {props.authMode === 'signup' ? signupInput : null}
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue ('email', text)}
        placeholder="email"
        placeholder={i18n.t ('auth:email')}
      />
      <Text style={styles.validationText}> {props.errors.email}</Text>

      <TextInput
        style={styles.formInput}
        secureTextEntry={true}
        onChangeText={text => props.setFieldValue ('password', text)}
        placeholder={i18n.t ('auth:password')}
      />
      <Text style={styles.validationText}> {props.errors.password}</Text>
      <Button
        onPress={() => props.handleSubmit ()}
        buttonStyle={styles.loginButton}
        title={
          props.authMode === 'login'
            ? i18n.t ('auth:login')
            : i18n.t ('auth:newAccount')
        }
      />
      <Button
        backgroundColor="transparent"
        color="black"
        buttonStyle={styles.switchButton}
        onPress={() => props.switchAuthMode ()}
        title={
          props.authMode === 'login'
            ? i18n.t ('auth:signup')
            : i18n.t ('auth:switchLogin')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create ({
  header: {
    marginBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validationText: {
    marginTop: 2,
    marginBottom: 8,
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
  },
  formInput: {
    width: 300,
    height: 50,
    borderColor: '#B5B4BC',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
  loginButton: {
    width: 200,
    marginBottom: 8,
    backgroundColor: 'blue',
  },
  switchButton: {
    width: 200,
    backgroundColor: '#3f51b5',
  },
});
const pickerStyle = {
  inputIOS: {
    color: 'red',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    width: '115%',
    height: 50,
    color: 'black',
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderWidth: 4,
    marginTop: 8,
  },
};

const FormikCalculator = withFormik ({
  mapPropsToValues: user => ({
    email: user.email,
    password: user.password,
    displayName: user.displayName,
    foreignVisit: user.displayName,
  }),
  validationSchema: props =>
    yup.object ().shape ({
      email: yup
        .string ()
        .email (i18n.t ('auth:emailError'))
        .required (i18n.t ('auth:emailReq')),
      password: yup.string ().required (i18n.t ('auth:passwordReq')),
      foreignVisit: props.authMode === 'signup'
        ? yup.string ().required (i18n.t ('auth:foreignReq'))
        : null,
      displayName: props.authMode === 'signup'
        ? yup.string ().required (i18n.t ('auth:dnReq'))
        : null,
    }),
  handleSubmit: (values, {props}) => {
    console.log ('props', props);

    console.log ('values', values);

    props.authMode === 'login'
      ? props.login (values)
      : props.signup (values, props.onUserAdded);
  },
}) (AuthForm);

const translatedCalculator = withTranslation () (FormikCalculator);

export default translatedCalculator;
