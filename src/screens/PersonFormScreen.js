import React, { Component } from 'react';
import PersonForm from '../ui/PersonForm';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
 class PersonFormScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('person') ? i18n.t('personForm:editContact') : i18n.t('personForm:newContact')
    }
  };
  
  state = {
    person: {
      name: '',
      testResult: '',
      symptoms: [],
    
    },
    currentSymptom: null,
  }

  componentDidMount() {
    const currentPerson = this.props.navigation.getParam('person');

    if (currentPerson) {
      this.setState(prevState => ({ person: prevState.person = currentPerson}))
    }
  }

  onPersonUpdated = (person) => {
  

    console.log(person);
    this.props.navigation.navigate('PersonList')
    

  }

  setCurrentSymptom = (text) => {
    this.setState(prevState => ({
      currentSymptom: prevState.currentSymptom = text
    }));
  }

  submitSymptoms = () => {
    let symptom = this.state.currentSymptom;

    if (symptom && symptom.length > 2) {
      this.setState(prevState => ({
        person: { ...prevState.person, symptoms: [...prevState.person.symptoms, symptom] },
      }))
    }
  }

  render() {
    return (
      <PersonForm
        setSymptoms={this.setCurrentSymptom}
        submitSymptoms={this.submitSymptoms}
        person={this.state.person}
        onPersonAdded={this.props.navigation.getParam('personAddedCallback')}
        onPersonUpdated={this.onPersonUpdated}
      />
    );
  }
}

export default withTranslation()(PersonFormScreen);