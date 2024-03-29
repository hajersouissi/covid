import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class Block extends Component {
  render () {
    const {
      row,
      column,
      center,
      middle,
      right,
      space,
      style,
      children,
      ...props
    } = this.props;
    const blockStyles = [
      styles.block,
      center && styles.center,
      middle && styles.middle,
      right && styles.right,
      space && {justifyContent: `space-${space}`},
      row && styles.row,
      column && styles.column,
      style,
    ];

    return (
      <View style={blockStyles} {...props}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  block: {},
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'flex-end',
  },
});
