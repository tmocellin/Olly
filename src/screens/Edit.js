/*
* @flow
*/

import React, { Component } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { PlateformStyleSheet } from '../common/PlatformHelper';
import TextField from '../components/TextField';
import IconPicker from '../components/IconPicker';
import IconModal from '../components/IconModal';
import ColorSelector from '../components/ColorSelector';
import strings from '../locales/strings';
import { IOS_BACKGROUND, WHITE, PRIMARY } from '../constants/colors';
import { ANDROID_MARGIN, IOS_MARGIN } from '../constants/dimensions';

type State = {
  key: string,
  name: string,
  color: string,
  password: string,
  icon: string,
  login: string,
  url: string,
  modalIsOpen: boolean,
};

class ReadOnlyScreen extends Component<void, void, State> {
  loginField: Object;
  urlField: Object;
  passwordField: Object;

  state = {
    key: '9939diz-cd',
    name: 'Facebook',
    color: '#64A1F6',
    password: 'poekfpOKOEOFE398045:=:kOZ',
    icon: 'facebook',
    login: 'someuse@gmail.com',
    url: 'https://www.facebook.com/',
    modalIsOpen: false,
  };

  save() {
    console.log('====================================');
    console.log('save password');
    console.log('====================================');
  }

  generatePassword() {
    console.log('====================================');
    console.log('generate password');
    console.log('====================================');
  }

  selectIcon(icon: string) {
    this.setState({
      icon,
    });
  }

  selectColor(color: string) {
    this.setState({ color });
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }

  render() {
    const { icon, color, name, password, login, url, modalIsOpen } = this.state;

    return (
      <View style={styles.main}>
        <KeyboardAwareScrollView style={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.iconCtnr}>
              <View style={styles.icon}>
                <IconPicker icon={icon} color={color} onPress={() => this.toggleModal()} />
              </View>
            </View>

            <TextField
              placeholder={strings.siteName}
              value={name}
              onSubmitEditing={() => this.urlField.focus()}
              onChangeText={text => this.setState({ name: text })}
              returnKeyType="next"
            />
            <TextField
              icon="globe"
              placeholder={strings.siteUrl}
              value={url}
              ref={(c) => {
                this.urlField = c;
              }}
              onSubmitEditing={() => this.loginField.focus()}
              onChangeText={text => this.setState({ url: text })}
              returnKeyType="next"
            />
            <TextField
              icon="person"
              placeholder={strings.userName}
              value={login}
              ref={(c) => {
                this.loginField = c;
              }}
              onSubmitEditing={() => this.passwordField.focus()}
              onChangeText={text => this.setState({ login: text })}
              returnKeyType="next"
            />
            <TextField
              icon="lock"
              placeholder={strings.password}
              value={password}
              ref={(c) => {
                this.passwordField = c;
              }}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry
            />
            <View style={styles.colorSelector}>
              <ColorSelector onPress={colorValue => this.selectColor(colorValue)} />
            </View>

            <View style={styles.actionContainer}>
              <Button title={strings.save} color={PRIMARY} onPress={() => this.save()} />
            </View>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity style={styles.generate} onPress={() => this.generatePassword()}>
          <Icon name="magic" size={32} color={PRIMARY} />
        </TouchableOpacity>

        <IconModal
          onSelectIcon={iconName => this.selectIcon(iconName)}
          isOpen={modalIsOpen}
          toggleModal={() => this.toggleModal()}
        />
      </View>
    );
  }
}

export default ReadOnlyScreen;

const styles = PlateformStyleSheet({
  main: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: IOS_BACKGROUND,
  },
  generate: {
    android: {
      top: ANDROID_MARGIN,
      padding: ANDROID_MARGIN,
    },
    ios: {
      top: 42,
      padding: IOS_MARGIN,
    },
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: ANDROID_MARGIN,
    backgroundColor: WHITE,
  },
  container: {
    backgroundColor: WHITE,
    marginHorizontal: ANDROID_MARGIN,
    marginBottom: ANDROID_MARGIN,
    android: {
      marginTop: ANDROID_MARGIN,
    },
    ios: {
      marginTop: 42,
    },
  },
  iconCtnr: {
    marginBottom: 24,
    ios: { marginTop: -32 },
    android: { marginTop: ANDROID_MARGIN },
    alignSelf: 'center',
  },
  actionContainer: {
    width: 150,
    alignSelf: 'center',
    marginTop: 32,
    android: {
      marginBottom: ANDROID_MARGIN,
    },
    ios: {
      marginBottom: IOS_MARGIN,
    },
  },
  colorSelector: {
    android: {
      padding: ANDROID_MARGIN,
    },
    ios: {
      padding: IOS_MARGIN,
    },
  },
});
