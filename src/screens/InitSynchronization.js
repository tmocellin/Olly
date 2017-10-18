/*
* @flow
*/

import React, { Component } from 'react';
import { Text, ScrollView, View, Image, Button } from 'react-native';

import { WHITE, PRIMARY_TEXT } from '../constants/colors';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import strings from '../locales/strings';

const image = require('../img/paper_plane.png');

export default class InitSynchronizationScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.image} source={image} />
        <Text style={styles.title}>{strings.synchInstruction}</Text>
        <View style={styles.login}>
          <Button title={strings.login} onPress={() => console.log('log in dropbox')} />
        </View>
      </ScrollView>
    );
  }
}

const styles = PlateformStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ios: {
      backgroundColor: WHITE,
    },
    android: {
      backgroundColor: WHITE,
    },
  },
  image: {
    marginBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
    color: PRIMARY_TEXT,
  },
  login: {
    width: 150,
    alignSelf: 'center',
  },
});
