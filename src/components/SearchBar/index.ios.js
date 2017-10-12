/*
 * @flow
 */
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {
  IOS_STATUS_BAR_HEIGHT,
  IOS_FULL_HEIGHT,
  IOS_MARGIN,
  IOS_SEARCH_RADIUS,
  IOS_SEARCH_HEIGHT,
} from '../../constants/dimensions';
import { PRIMARY, PRIMARY_DARK, WHITE } from '../../constants/colors';
import strings from '../../locales/strings';
import type { Props } from '../../types/searchBar';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

type State = {
  isEditing: boolean,
};

class SearchBar extends Component<Props, Props, State> {
  searchInput: Object;
  state = { isEditing: false };
  static defaultProps = {
    onChangeText: (text: string) => console.log(text),
    addItem: () => console.log('add new item'),
    onClear: () => console.log('clear '),
    openMenu: () => console.log('open menu'),
  };

  focus() {
    this.searchInput.focus();
    this.setEditingMode(true);
  }

  onFocus() {
    this.setEditingMode(true);
  }

  setEditingMode(value: boolean) {
    this.setState({
      isEditing: value,
    });
  }

  onPress() {
    if (this.state.isEditing) {
      this.searchInput.clear();
      this.searchInput.blur();
      this.props.onClear();
      this.setEditingMode(false);
    } else {
      this.props.addItem();
    }
  }

  render() {
    const { isEditing } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>
          <TextInput
            ref={(component) => {
              this.searchInput = component;
            }}
            style={styles.inputSearch}
            placeholderTextColor={WHITE}
            placeholder={strings.search_password}
            returnKeyType="done"
            selectionColor={WHITE}
            onFocus={() => this.onFocus()}
            onChangeText={text => this.props.onChangeText(text)}
          />
          <Icon name="ios-search" size={18} color={WHITE} style={styles.searchIcon} />
          <TouchableOpacity style={styles.touchable} onPress={() => this.onPress()}>
            <AnimatedIcon
              name={'md-add'}
              size={28}
              color={WHITE}
              style={isEditing && styles.editing}
              transition="rotate"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    height: IOS_FULL_HEIGHT,
    backgroundColor: PRIMARY,
  },
  content: {
    marginTop: IOS_STATUS_BAR_HEIGHT,
    paddingVertical: IOS_MARGIN,
    paddingLeft: IOS_MARGIN,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputSearch: {
    backgroundColor: PRIMARY_DARK,
    borderRadius: IOS_SEARCH_RADIUS,
    height: IOS_SEARCH_HEIGHT,
    paddingLeft: 32,
    color: WHITE,
    flex: 1,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 12,
    backgroundColor: 'transparent',
  },
  touchable: {
    paddingHorizontal: IOS_MARGIN,
  },
  editing: {
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
});
