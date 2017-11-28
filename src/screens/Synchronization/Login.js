/*
* @flow
*/
import React, { Component } from 'react';
import { View, Image, Button, Text, StyleSheet } from 'react-native';
import strings from '../../locales/strings';
import { PRIMARY_TEXT, PRIMARY, WHITE } from '../../constants/colors';
import NavBar from '../../components/NavBar';

const img = require('../../img/paper_plane.png');

type Props = {
  loginToDropbox: () => void,
  navigation: Object,
};

class Login extends Component<void, Props, void> {
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
          <Button title={strings.login} onPress={this.props.loginToDropbox} color={PRIMARY} />
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
