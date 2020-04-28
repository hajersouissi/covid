import React, {Component} from 'react';
import VisitForm from '../ui/VisitForm';

export default class VisitFormScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Visit Details',
    };
  };

  state = {
    isVisible: false,
    isVisibleArrival: false,
    chosenDateVisit: '',
    chosenDateArrival: '',

    visit: {
      placeStayVisit: '',
      arrivalCountryName: '',
      visitedCountryName: '',
      placeStayArrival: '',
      cityArrival: '',
    },
  };

  handlePicker = date => {
    let moment = require ('moment');
    if ('default' in moment) {
      moment = moment['default'];
    }

    this.setState ({
      isVisible: false,
      chosenDateVisit: moment (date).format ('YYYY - MM - DD'),
    });
  };
  hidePicker = () => {
    this.setState ({isVisible: false});
  };
  showPicker = () => {
    this.setState ({isVisible: true});
  };

  handlePickerArrival = date => {
    let moment = require ('moment');
    if ('default' in moment) {
      moment = moment['default'];
    }

    this.setState ({
      isVisibleArrival: false,

      chosenDateArrival: moment (date).format ('YYYY - MM - DD'),
    });
  };
  hidePickerArrival = () => {
    this.setState ({isVisibleArrival: false});
  };
  showPickerArrival = () => {
    this.setState ({isVisibleArrival: true});
  };

  componentDidMount () {
    const currentVisit = this.props.navigation.getParam ('visit');

    if (currentVisit) {
      this.setState (prevState => ({visit: (prevState.visit = currentVisit)}));
    }
  }

  onVisitAdded = visit => {
    this.setState (visit);
    console.log (visit);
    this.props.navigation.navigate ('SymptomForm');
  };

  render () {
    return (
      <VisitForm
        visit={this.state.visit}
        onVisitAdded={this.onVisitAdded}
        isVisible={this.state.isVisible}
        isVisibleArrival={this.state.isVisibleArrival}
        chosenDateVisit={this.state.chosenDateVisit}
        chosenDateArrival={this.state.chosenDateArrival}
        getAttack={this.getAttack}
        hidePicker={this.hidePicker}
        handlePicker={this.handlePicker}
        showPicker={this.showPicker}
        hidePickerArrival={this.hidePickerArrival}
        handlePickerArrival={this.handlePickerArrival}
        showPickerArrival={this.showPickerArrival}
      />
    );
  }
}
