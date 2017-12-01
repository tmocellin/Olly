/*
* @flow
*/

import React from 'react';
import { TabNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import PasswordsScreen from '../screens/Passwords';
import SettingsScreen from '../screens/Settings';
import SynchronizationScreen from '../screens/Synchronization';
import { PRIMARY, IOS_TABICON, WHITE } from '../constants/colors';
import strings from '../locales/strings';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Unlock', params: { reset: true } })],
});

const tabNavigator = TabNavigator(
  {
    Passwords: {
      screen: PasswordsScreen,
      navigationOptions: () => ({
        tabBarLabel: strings.passwordList,

        tabBarIcon: ({ tintColor }) => <Icon name="ios-apps" color={tintColor} size={28} />,
      }),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: () => ({
        tabBarLabel: strings.settings,
        tabBarIcon: ({ tintColor }) => <Icon name="ios-options" color={tintColor} size={28} />,
      }),
    },
    Synchronization: {
      screen: SynchronizationScreen,
      navigationOptions: () => ({
        tabBarLabel: strings.synchronization,
        tabBarIcon: ({ tintColor }) => <Icon name="ios-cloud" color={tintColor} size={28} />,
      }),
    },
    Lock: {
      screen: SynchronizationScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: strings.lock,
        tabBarIcon: ({ tintColor }) => <Icon name="ios-lock" color={tintColor} size={28} />,
        tabBarOnPress: () => navigation.dispatch(resetAction),
      }),
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: PRIMARY,
      inactiveTintColor: IOS_TABICON,
      style: { backgroundColor: WHITE },
    },
  },
);

export default tabNavigator;
