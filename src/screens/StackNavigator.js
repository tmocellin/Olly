/*
* @flow
*/

import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';
import TabNavigator from './TabNavigator';
import strings from '../locales/strings';
import UnlockScreen from './Unlock';
import SetupScreen from './Setup';
import ReadOnlyScreen from './ReadOnly';
import EditScreen from './Edit';

const NestedNav = Platform.OS === 'android' ? DrawerNavigator : TabNavigator;

const StackNav = StackNavigator(
  {
    Setup: {
      screen: SetupScreen,
      navigationOptions: () => ({
        title: strings.setup,
        headerStyle: { backgroundColor: '#01D88D' },
        headerTintColor: 'white',
      }),
    },
    Unlock: {
      screen: UnlockScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    App: {
      screen: NestedNav,
      navigationOptions: () => ({
        header: null,
      }),
    },
    ReadOnly: {
      screen: ReadOnlyScreen,
      navigationOptions: ({ navigation }: Object) => ({
        title: navigation.state.params.siteName,
        headerStyle: { backgroundColor: '#01D88D' },
        headerTintColor: 'white',
      }),
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Unlock',
  },
);

export default StackNav;
