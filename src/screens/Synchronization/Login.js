/*
* @flow
*/
import React from 'react';
import { View, Image, Button, Text, StyleSheet } from 'react-native';
import strings from '../../locales/strings';
import { PRIMARY_TEXT, PRIMARY, WHITE } from '../../constants/colors';
import NavBar from '../../components/NavBar';

const img = require('../../img/paper_plane.png');

type Props = {
  loginToDropbox: () => void,
  navigation: Object,
};

export default (props: Props) => (
  <View style={styles.container}>
    <NavBar
      title={strings.synchronization}
      actionLeft={() => props.navigation.navigate('DrawerOpen')}
    />
    <View style={styles.subContainer}>
      <Image source={img} />
      <Text style={styles.title}> {strings.synchInstruction}</Text>
      <Button title={strings.login} onPress={props.loginToDropbox} color={PRIMARY} />
    </View>
  </View>
);

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
