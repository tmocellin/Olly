/*
* @flow
*/

import React, { Component } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import TextField from '../components/TextField';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import { ANDROID_MARGIN, IOS_MARGIN } from '../constants/dimensions';
import { PRIMARY_TEXT, DELETE_COLOR, PRIMARY, WHITE } from '../constants/colors';
import strings from '../locales/strings';
import { NavigationActions } from 'react-navigation';

type State = {
  password: string,
  confirmation: string,
};

export default class SetupScreen extends Component<void, void, State> {
  confirmation: Object;
  state = {
    password: '',
    confirmation: '',
  };

  submit() {
    const { password, confirmation } = this.state;
    console.log('====================================');
    console.log(`password : ${password} confirmation : ${confirmation}`);
    console.log('====================================');

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Unlock' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.instruction}>{strings.instructions}</Text>
        <TextField
          iconName="lock"
          iosOutline
          placeholder={strings.password}
          secureTextEntry
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          onSubmitEditing={() => {
            this.confirmation.focus();
          }}
          returnKeyType="next"
        />
        <TextField
          icon="lock"
          ref={(c) => {
            this.confirmation = c;
          }}
          placeholder={strings.confirmation}
          secureTextEntry
          value={this.state.confirmation}
          onChangeText={text => this.setState({ confirmation: text })}
        />

        <Text style={[styles.instruction, { color: DELETE_COLOR }]}>
          Ce texte sera remplacer lorsqu'on ajoutera redux
        </Text>
        <View style={styles.submit}>
          <Button title={strings.save} color={PRIMARY} onPress={() => this.submit()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = PlateformStyleSheet({
  container: {
    flex: 1,
    paddingTop: 18,
    backgroundColor: WHITE,
  },
  instruction: {
    android: { padding: ANDROID_MARGIN },
    ios: { padding: IOS_MARGIN },
    color: PRIMARY_TEXT,
    textAlign: 'justify',
    marginBottom: 18,
  },
  submit: {
    width: 150,
    alignSelf: 'center',
  },
});
