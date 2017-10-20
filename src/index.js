/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { StackNavigator } from 'react-navigation';

import React, { Component } from 'react';
import { Button } from 'react-native';
import EditScreen from './screens/Edit';

const App = StackNavigator({
  Edit: {
    screen: EditScreen,
    navigationOptions: ({ navigation }: Object) => ({
      title: 'Title',
      headerStyle: { backgroundColor: '#01D88D' },
      headerTintColor: 'white',
      header: null,
    }),
  },
});

export default App;
