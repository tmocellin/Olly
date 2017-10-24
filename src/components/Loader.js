/*
* @flow
*/

import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { WHITE } from '../constants/colors';

const image = require('../img/book.png');

const Loader = () => (
  <View style={styles.container}>
    <Animatable.Image
      source={image}
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite"
    />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
});
