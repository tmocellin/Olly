/*
* @flow
*/
import React, { Component } from 'react';
import { View, Image, Button, Text, StyleSheet, Linking, Platform } from 'react-native'; // #1
import uuidV4 from 'uuid/v4'; // #2
import strings from '../../locales/strings';
import { PRIMARY_TEXT, PRIMARY, WHITE } from '../../constants/colors';
import NavBar from '../../components/NavBar';

const appKey = 'puzyl8gt4mor5kp'; // #3

const img = require('../../img/paper_plane.png');

type Props = {
  navigation: Object,
};

type State = {
  // #4
  verification: string,
};

class Login extends Component<void, Props, State> {
  state = {
    verification: uuidV4(), // #5
  };

  logIn() {
    // #6
    const redirectUri = Platform.OS === 'ios' ? 'olly://open' : 'https://www.olly.com/open';

    const url = `https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=${appKey}&redirect_uri=${redirectUri}&state=${this
      .state.verification}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title={strings.synchronization}
          actionLeft={() => this.props.navigation.navigate('DrawerOpen')}
        />
        <View style={styles.subContainer}>
          <Image source={img} />
          <Text style={styles.title}> {strings.synchInstruction}</Text>
          <Button title={strings.login} onPress={() => this.logIn()} color={PRIMARY} />
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 32,
    textAlign: 'center',
    color: PRIMARY_TEXT,
  },
});
