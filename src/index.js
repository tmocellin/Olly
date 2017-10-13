/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from './components/SearchBar';
import TextField from './components/TextField';

export default class App extends Component {
  state = {
    name: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <SearchBar />
        <TextField placeholder={'Site name'} value={this.state.name} returnKeyType="next" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
