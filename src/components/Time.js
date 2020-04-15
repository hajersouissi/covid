//import libraries
import React, {Component} from 'react';
import {Text} from 'native-base';
import moment from 'moment';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

// create a component
class Time extends Component {
  constructor (props) {
    super (props);
    this.date = props.time;
  }

  render () { 
    let mtime='';  
    const time = moment (this.date || moment.now ()).fromNow ();
    if (time.includes('hours')){
 mtime =i18n.t ('news:time')+time.substr(0,2)+i18n.t('news:timeHeure')
    }

    
    return <Text note style={{marginHorizontal: 10}}>{mtime}</Text>
  }
}

//make this component available to the app
export default withTranslation() (Time);
