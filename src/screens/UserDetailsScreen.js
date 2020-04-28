import React, {Component} from 'react';
import SymptomForm from '../ui/SymptomForm';

export default class SymptomFormScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Symptom Details',
    };
  };

  state = {
    symptom: {
      cold: '',
      cough: '',

      fever: 0,
      todaySymptom: '',
    },
  };

  componentDidMount () {
    const currentSymptom = this.props.navigation.getParam ('symptom');

    if (currentSymptom) {
      this.setState (prevState => ({
        symptom: (prevState.symptom = currentSymptom),
      }));
    }
  }

  onSymptomAdded = symptom => {
    this.setState (symptom);
    console.log (symptom);
    this.props.navigation.navigate ('Dashboard');
  };

  render () {
    return (
      <SymptomForm
        symptom={this.state.symptom}
        onSymptomAdded={this.onSymptomAdded}
      />
    );
  }
}
