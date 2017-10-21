/*
* @flow
*/

import React from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import PasswordsScreen from '../screens/Passwords';
import SettingsScreen from '../screens/Settings';
import SynchronizationScreen from '../screens/Synchronization';
import { PRIMARY, IOS_TABICON, WHITE } from '../constants/colors';
import strings from '../locales/strings';

const tabNavigator = TabNavigator(
  {
    Passwords: {
      screen: PasswordsScreen,
      navigationOptions: () => ({
        tabBarLabel: strings.passwordList,

        tabBarIcon: ({ tintColor }) => <Icon name="ios-apps-outline" color={tintColor} size={26} />,
      }),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: () => ({
        tabBarLabel: strings.settings,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-options-outline" color={tintColor} size={26} />
        ),
      }),
    },
    Synchronization: {
      screen: SynchronizationScreen,
      navigationOptions: () => ({
        tabBarLabel: strings.synchronization,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cloud-outline" color={tintColor} size={26} />
        ),
      }),
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: PRIMARY,
      inactiveTintColor: IOS_TABICON,
      labelStyle: { fontSize: 13 },
      style: { backgroundColor: WHITE },
    },
  },
);
export default tabNavigator;
