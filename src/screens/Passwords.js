/*
* @flow
*/
import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { ReduxState } from '../reducers/types';
import SearchBar from '../components/SearchBar';
import PasswordList from '../components/PasswordList';
import ActionButton from '../components/ActionButton';
import { WHITE } from '../constants/colors';
import { ANDROID_MARGIN } from '../constants/dimensions';
import type { Password } from '../types/Password';

type State = {
  searchResults: Array<Password>,
  searchValue: string,
};

type Props = {
  passwords: Array<Password>,
  navigation: Object,
};

class PassworsScreen extends Component<void, Props, State> {
  // les valeurs du state sont temporaires et changeront lorsqu'on ajoutera redux
  state = {
    searchValue: '',
    searchResults: this.props.passwords,
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      searchResults: nextProps.passwords,
    });
  }

  showPassword(password: Password) {
    this.props.navigation.navigate('ReadOnly', { siteName: password.name });
  }

  searchPassword(search: string) {
    const result = _.filter(this.props.passwords, data =>
      data.name.toLowerCase().includes(search.toLowerCase()),
    );
    this.setState({
      searchResults: search.length > 0 ? result : this.props.passwords,
      searchValue: search,
    });
  }

  clearSearch() {
    this.setState({
      searchResults: this.props.passwords,
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

function mapStateToProps(state: ReduxState) {
  const passwords = _.values(state.data.passwords.byId);
  return {
    passwords,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({}, dispatch),
}))(PassworsScreen);

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
