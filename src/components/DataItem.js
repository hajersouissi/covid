import React, {Component} from 'react';
import {
  ListItem,
  Thumbnail,
  Body,
  View,
  Text,
  Button,
} from 'native-base';
import TimeAgo from './Time';
import i18n from 'i18next';

import {withTranslation} from 'react-i18next';


class DataItem extends Component {
  constructor (props) {
    super (props);
    this.data = props.data;
  }

  handlePress = () => {
    const {url, title} = this.data;

    this.props.onPress ({url, title});
  };

  render () {
    return (
      <ListItem >

        <Body>
          <Thumbnail
            style={{width: 300, height: 180, borderRadius: 30 / 2,alignSelf:'center'}}
            square
            source={{
              uri: this.data.urlToImage != null
                ? this.data.urlToImage
                : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=',
            }}
          />

          <Text numberOfLines={6} style={{textAlign: 'center'}}>{this.data.title}</Text>
          <Text note numberOfLines={4} style={{marginEnd:25}}>{this.data.description}</Text>
          <View
            style={{flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 12}}
          >
            <Text note >{this.data.source.name}</Text>
            <TimeAgo time={this.data.publishedAt} />

          </View>
          <View>

            <Button 
            
            style={{width: 125, height: 40, alignSelf:'flex-end',marginEnd:10,marginTop:5}}
            onPress={this.handlePress}>
              <Text style={{textAlign: 'center'}}>{ i18n.t ('news:full')}</Text>
            </Button>

          </View>

        </Body>

      </ListItem>
    );
  }
}
export default withTranslation () (DataItem);

