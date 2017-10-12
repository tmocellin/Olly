/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from './components/SearchBar';
import SliderRow from './components/SliderRow';

export default class App extends Component {
  state = {
    passwordLength: 14,
  };

  setValue(lentgh: number) {
    this.setState({
      passwordLength: lentgh,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar />
        <SliderRow
          label="Longueur du mot de passe"
          selectedValue={this.state.passwordLength}
          onSlidingComplete={length => this.setValue(length)}
          onValueChange={length => this.setValue(length)}
        />
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
