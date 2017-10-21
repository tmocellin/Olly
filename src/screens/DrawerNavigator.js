/*
* @flow
*/

import React from 'react';
import { ScrollView, Image, StyleSheet, View } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import PasswordsScreen from '../screens/Passwords';
import SettingsScreen from '../screens/Settings';
import SynchronizationScreen from '../screens/Synchronization';
import { PRIMARY, ANDROID_SEPARATOR } from '../constants/colors';
import strings from '../locales/strings';

const image = require('../img/book.png');

const DrawerContent = (props: Object) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Image source={image} style={styles.logo} />
    <View style={styles.separator} />
    <DrawerItems {...props} />
  </ScrollView>
);

const drawerNavigator = DrawerNavigator(
  {
    Passwords: {
      screen: PasswordsScreen,
      navigationOptions: () => ({
        drawerLabel: strings.passwordList,
        drawerIcon: ({ tintColor }) => <Icon name="ios-apps-outline" color={tintColor} size={26} />,
      }),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: () => ({
        drawerLabel: strings.settings,
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-options-outline" color={tintColor} size={26} />
        ),
      }),
    },
    Synchronization: {
      screen: SynchronizationScreen,
      navigationOptions: () => ({
        drawerLabel: strings.synchronization,
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-cloud-outline" color={tintColor} size={26} />
        ),
      }),
    },
  },
  {
    drawerWidth: 300,
    contentComponent: props => DrawerContent(props),
    contentOptions: {
      activeTintColor: PRIMARY,
      style: {
        marginVertical: 0,
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    marginVertical: 32,
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: ANDROID_SEPARATOR,
    marginBottom: 32,
  },
});
export default drawerNavigator;
