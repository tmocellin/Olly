/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { StackNavigator } from 'react-navigation';

import SynchronizationScreen from './screens/Synchronization';

const App = StackNavigator({
  Home: {
    screen: SynchronizationScreen,
    navigationOptions: ({ navigation }: Object) => ({
      title: 'Hello title',
      headerStyle: { backgroundColor: '#01D88D' },
      headerTintColor: 'white',
      // header: null, // if we want to hide the default header
    }),
  },
});

export default App;
