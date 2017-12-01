/*
* @flow
*/

import React from 'react';
import { ScrollView, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import PasswordsScreen from '../screens/Passwords';
import SettingsScreen from '../screens/Settings';
import SynchronizationScreen from '../screens/Synchronization';
import { PRIMARY, ANDROID_SEPARATOR, DELETE_COLOR, WHITE } from '../constants/colors';
import { ANDROID_MARGIN } from '../constants/dimensions';
import strings from '../locales/strings';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Unlock', params: { reset: true } })],
});

const image = require('../img/book.png');

const DrawerContent = (props: Object) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Image source={image} style={styles.logo} />
    <View style={styles.separator} />
    <DrawerItems {...props} />
    <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.dispatch(resetAction)}>
      <View style={styles.lock}>
        <Icon name="md-lock" color={WHITE} size={26} />
      </View>
    </TouchableOpacity>
  </ScrollView>
);

const drawerNavigator = DrawerNavigator(
  {
    Passwords: {
      screen: PasswordsScreen,
      navigationOptions: () => ({
        drawerLabel: strings.passwordList,
        drawerIcon: ({ tintColor }) => <Icon name="md-apps" color={tintColor} size={26} />,
      }),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: () => ({
        drawerLabel: strings.settings,
        drawerIcon: ({ tintColor }) => <Icon name="md-options" color={tintColor} size={26} />,
      }),
    },
    Synchronization: {
      screen: SynchronizationScreen,
      navigationOptions: () => ({
        drawerLabel: strings.synchronization,
        drawerIcon: ({ tintColor }) => <Icon name="md-cloud" color={tintColor} size={26} />,
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
  lock: {
    backgroundColor: DELETE_COLOR,
    padding: ANDROID_MARGIN,
    alignItems: 'center',
  },
});
export default drawerNavigator;
