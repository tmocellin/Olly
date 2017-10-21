/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DrawerNavigator from './screens/DrawerNavigator';
import TabNavigator from './screens/TabNavigator';
import strings from './locales/strings';
import UnlockScreen from './screens/Unlock';
import SetupScreen from './screens/Setup';
import ReadOnlyScreen from './screens/ReadOnly';
import EditScreen from './screens/Edit';

const NestedNav = Platform.OS === 'android' ? DrawerNavigator : TabNavigator;

const App = StackNavigator({
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
    navigationOptions: ({ navigation }: Object) => ({
      header: null,
    }),
  },
});

export default App;
