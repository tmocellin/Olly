/*
* @flow
*/
import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import _ from 'lodash';
import SearchBar from '../components/SearchBar';
import PasswordList from '../components/PasswordList';
import ActionButton from '../components/ActionButton';
import { WHITE } from '../constants/colors';
import { ANDROID_MARGIN } from '../constants/dimensions';
import type { Password } from '../types/Password';

type State = {
  passwords: Array<Password>,
  searchResults: Array<Password>,
  searchValue: string,
};

class PassworsScreen extends Component<void, void, State> {
  // les valeurs du state sont temporaires et changeront lorsqu'on ajoutera redux
  state = {
    passwords: [
      { name: 'Twitter', key: 'uuid', icon: 'twitter', color: 'red' },
      { name: 'Facebook', key: 'uuid-2', icon: 'facebook', color: 'blue' },
      { name: 'Twitter', key: 'uuid-3', icon: 'twitter', color: 'red' },
      { name: 'Facebook', key: 'uuid-4', icon: 'facebook', color: 'blue' },
      { name: 'Twitter', key: 'uuid-5', icon: 'twitter', color: 'red' },
      { name: 'Facebook', key: 'uuid-6', icon: 'facebook', color: 'blue' },
    ],
    searchValue: '',
    searchResults: [
      { name: 'Twitter', key: 'uuid', icon: 'twitter', color: 'red' },
      { name: 'Facebook', key: 'uuid-2', icon: 'facebook', color: 'blue' },
      { name: 'Twitter', key: 'uuid-3', icon: 'twitter', color: 'red' },
      { name: 'Facebook', key: 'uuid-4', icon: 'facebook', color: 'blue' },
      { name: 'Twitter', key: 'uuid-5', icon: 'twitter', color: 'red' },
      { name: 'Facebook', key: 'uuid-6', icon: 'facebook', color: 'blue' },
    ],
  };

  showPassword(password: Password) {
    this.props.navigation.navigate('ReadOnly', { siteName: password.name });
  }

  searchPassword(search: string) {
    const result = _.filter(this.state.passwords, data =>
      data.name.toLowerCase().includes(search.toLowerCase()),
    );
    this.setState({
      searchResults: search.length > 0 ? result : this.state.passwords,
      searchValue: search,
    });
  }

  clearSearch() {
    this.setState({
      searchResults: this.state.passwords,
      searchValue: '',
    });
  }

  addNewItem() {
    this.props.navigation.navigate('Edit');
  }

  openMenu() {
    this.props.navigation.navigate('DrawerOpen');
  }

  renderActionButton() {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.action}>
          <ActionButton onPress={() => this.addNewItem()} />
        </View>
      );
    }
    return null;
  }
  render() {
    const { searchResults, searchValue } = this.state;

    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={text => this.searchPassword(text)}
          addItem={() => this.addNewItem()}
          onClear={() => this.clearSearch()}
          openMenu={() => this.openMenu()}
        />
        <PasswordList
          data={searchResults}
          onItemPress={item => this.showPassword(item)}
          fromSearch={searchValue.length > 0}
          emptyOnPress={() => this.addNewItem()}
        />
        {this.renderActionButton()}
      </View>
    );
  }
}

export default PassworsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  action: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: ANDROID_MARGIN,
    alignItems: 'center',
  },
});
