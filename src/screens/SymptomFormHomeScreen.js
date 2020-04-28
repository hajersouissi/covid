import React, {Component} from 'react';
import SymptomFormHome from '../ui/SymptomFormHome';

export default class SymptomFormScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
     // title: 'Symptom Details',
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
  

  onSymptomUpdated = symptom => {
    console.log (symptom);

    this.props.navigation.navigate ('SymptomList');
  };

  onSymptomAdded = symptom => {
    this.setState (symptom);
    console.log (symptom);
    this.props.navigation.navigate ('SymptomList');
   
  };
 
 
  render () {
    return (
      <SymptomFormHome
        symptom={this.state.symptom}
        onSymptomAdded={this.onSymptomAdded}
        onSymptomUpdated={this.onSymptomUpdated}
      />
    );
  }
}
