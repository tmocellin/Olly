/*
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, TextInput, View, TouchableNativeFeedback, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {
  ANDROID_MARGIN,
  ANDROID_SEARCH_HEIGHT,
  ANDROID_SEARCH_RADIUS,
} from '../../constants/dimensions';
import {
  PRIMARY_DARK,
  WHITE,
  IC_SEARCH_COLOR,
  ANDROID_SEARCH_PLACEHOLDER_COLOR,
} from '../../constants/colors';
import strings from '../../locales/strings';
import type { Props } from '../../types/searchBar';

type State = {
  isEditing: boolean,
  icon: string,
};

class SearchBar extends Component<Props, Props, State> {
  searchInput: Object;
  iconView: Object;
  state = {
    isEditing: false,
    icon: 'md-menu',
  };
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
    this.animate();
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
      this.animate();
    } else {
      this.props.openMenu();
    }
  }

  animate() {
    const { isEditing } = this.state;
    const rotationDeg = isEditing ? '0deg' : '360deg';
    const icon = isEditing ? 'md-menu' : 'md-arrow-round-back';
    this.iconView.transitionTo({ rotate: rotationDeg });
    setTimeout(() => this.setState({ icon }), 250);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={PRIMARY_DARK} />
        <View style={styles.content}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
            onPress={() => this.onPress()}
          >
            <Animatable.View
              style={[styles.iconCtnr]}
              ref={(component) => {
                this.iconView = component;
              }}
            >
              <Icon name={this.state.icon} size={24} color={IC_SEARCH_COLOR} />
            </Animatable.View>
          </TouchableNativeFeedback>
          <TextInput
            ref={(component) => {
              this.searchInput = component;
            }}
            style={{ flex: 1 }}
            placeholderTextColor={ANDROID_SEARCH_PLACEHOLDER_COLOR}
            placeholder={strings.search_password}
            returnKeyType="done"
            selectionColor={WHITE}
            onFocus={() => this.onFocus()}
            underlineColorAndroid={WHITE}
            onChangeText={text => this.props.onChangeText(text)}
          />
        </View>
      </View>
    );
  }
}
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  content: {
    paddingLeft: ANDROID_MARGIN,
    paddingRight: ANDROID_MARGIN,
    backgroundColor: WHITE,
    height: ANDROID_SEARCH_HEIGHT,
    borderRadius: ANDROID_SEARCH_RADIUS,
    elevation: 6,
    flexDirection: 'row',
  },
  iconCtnr: {
    height: 22,
    width: 22,
    borderRadius: 22,
    marginTop: 12,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
