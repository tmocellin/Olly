/*
* @flow
*/

import React, { Component } from 'react';
import { ScrollView, View, Image, Button, Text } from 'react-native';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import TextField from '../components/TextField';
import strings from '../locales/strings';
import { ANDROID_MARGIN, IOS_MARGIN } from '../constants/dimensions';
import { PRIMARY, WHITE, DELETE_COLOR } from '../constants/colors';

type State = {
  password: string,
};
const image = require('../img/book.png');

export default class SetupScreen extends Component<void, void, State> {
  state = {
    password: '',
  };

  submit() {
    console.log('====================================');
    console.log(`mot de passe : ${this.state.password}`);
    console.log('====================================');

    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={image} style={styles.logo} />
        <TextField
          icon="lock"
          placeholder={strings.password}
          secureTextEntry
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />
        <Text style={styles.error}> Ce texte sera remplacer lorsqu'on ajoutera redux</Text>
        <View style={styles.submit}>
          <Button title={strings.unlock} color={PRIMARY} onPress={() => this.submit()} />
        </View>
      </ScrollView>
    );
  }
}
const styles = PlateformStyleSheet({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: 'center',
    android: { padding: ANDROID_MARGIN },
    ios: { padding: IOS_MARGIN },
  },
  logo: {
    marginBottom: 32,
    alignSelf: 'center',
  },
  error: {
    marginVertical: 16,
    color: DELETE_COLOR,
    textAlign: 'justify',
  },
  submit: {
    width: 150,
    alignSelf: 'center',
  },
});
