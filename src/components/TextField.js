/*
* @flow
*/

import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PlateformStyleSheet, IconPlateform } from '../common/PlatformHelper';
import { GetLevelColor } from '../common/PasswordHelper';
import { IOS_MARGIN, ANDROID_MARGIN } from '../constants/dimensions';
import { PRIMARY_DARK, PLACE_HOLDER, WHITE, PRIMARY_TEXT } from '../constants/colors';

type Props = {
  placeholder: string,
  icon: string,
  fullWhite: boolean,
  value: string,
  secureTextEntry: boolean,
  returnKeyType: string,
  onChangeText: (text: string) => void,
  onSubmitEditing: () => void,
};

class TextField extends Component<Props, Props, void> {
  textInput: Object;
  static defaultProps = {
    placeholder: 'TextFieldPlaceholder',
    icon: 'pricetag',
    fullWhite: false,
    value: '',
    secureTextEntry: false,
    returnKeyType: 'done',
    onChangeText: text => console.log(`Change : ${text}`),
    onSubmitEditing: () => console.log('end submit editing'),
  };

  getIconColor() {
    const length = this.props.value.length;
    if (this.props.secureTextEntry && length >= 1) {
      return GetLevelColor(this.props.value);
    }
    return length > 0 ? PRIMARY_DARK : PLACE_HOLDER;
  }

  focus() {
    const txtInput = this.textInput;
    txtInput.focus();
  }

  render() {
    const textColor = this.props.fullWhite ? WHITE : PRIMARY_TEXT;
    const color = this.props.fullWhite ? WHITE : PLACE_HOLDER;
    const iconColor = this.props.fullWhite ? WHITE : this.getIconColor();

    return (
      <View style={styles.container}>
        <Icon name={IconPlateform(this.props.icon, true)} size={24} color={iconColor} />
        <TextInput
          style={[styles.textInput, { color: textColor }]}
          ref={(c) => {
            this.textInput = c;
          }}
          placeholder={this.props.placeholder}
          autoCorrect={false}
          placeholderTextColor={color}
          value={this.props.value}
          onChangeText={text => this.props.onChangeText(text)}
          secureTextEntry={this.props.secureTextEntry}
          returnKeyType={this.props.returnKeyType}
          onSubmitEditing={this.props.onSubmitEditing}
          underlineColorAndroid={color}
        />
      </View>
    );
  }
}

export default TextField;

const styles = PlateformStyleSheet({
  container: {
    flexDirection: 'row',
    android: {
      marginHorizontal: ANDROID_MARGIN,
      alignItems: 'center',
    },
    ios: {
      paddingVertical: IOS_MARGIN,
      marginBottom: IOS_MARGIN,
      marginHorizontal: IOS_MARGIN,
      borderBottomWidth: 1,
      borderColor: PLACE_HOLDER,
    },
  },
  textInput: {
    flex: 1,
    ios: {
      marginLeft: IOS_MARGIN,
    },
    android: {
      marginLeft: ANDROID_MARGIN,
    },
  },
});
