/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from './components/SearchBar';
import IconPicker from './components/IconPicker';
import IconModal from './components/IconModal';

export default class App extends Component {
  state = {
    name: '',
    modalIsOpen: false,
    selectedIcon: 'cubes',
  };

  toggleModal() {
    const { modalIsOpen } = this.state;
    this.setState({
      modalIsOpen: !modalIsOpen,
    });
  }
  setIcon(name: strig) {
    this.setState({
      selectedIcon: name,
    });
  }

  render() {
    const { modalIsOpen, selectedIcon } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar />
        <View style={styles.iconCtnr}>
          <IconPicker icon={selectedIcon} onPress={() => this.toggleModal()} />
        </View>
        <IconModal
          isOpen={modalIsOpen}
          toggleModal={() => this.toggleModal()}
          onSelectIcon={icon => this.setIcon(icon)}
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
  iconCtnr: {
    alignItems: 'center',
    marginTop: 32,
  },
});
