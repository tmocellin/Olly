/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { StackNavigator } from 'react-navigation';

import EditScreen from './screens/Edit';

const App = StackNavigator({
  Home: {
    screen: EditScreen,
    navigationOptions: ({ navigation }: Object) => ({
      title: 'Hello title',
      headerStyle: { backgroundColor: '#01D88D' },
      headerTintColor: 'white',
      // header: null, // if we want to hide the default header
    }),
  },
});

export default App;
