/*
* @flow
*/

import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuidV4 from 'uuid/v4';
import CryptoJS from 'crypto-js';
import type { ReduxState } from '../reducers/types';
import { GeneratePassword } from '../common/PasswordHelper';
import type { Password } from '../types/Password';
import type { NormalizedState } from '../types/NormalizedState';
import * as PasswordActions from '../actions/passwords';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import TextField from '../components/TextField';
import IconPicker from '../components/IconPicker';
import IconModal from '../components/IconModal';
import ColorSelector from '../components/ColorSelector';
import strings from '../locales/strings';
import { IOS_BACKGROUND, WHITE, PRIMARY } from '../constants/colors';
import { ANDROID_MARGIN, IOS_MARGIN } from '../constants/dimensions';
import NavBar from '../components/NavBar';

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

type Props = {
  edition: boolean,
  password: Password,
  passwordLength: number,
  autoGeneration: boolean,
  navigation: Object,
  actions: Object,
  cryptoKey: CryptoJS.WordArray,
  iv: string,
  passwords: NormalizedState,
};

class ReadOnlyScreen extends Component<void, Props, State> {
  loginField: Object;
  urlField: Object;
  passwordField: Object;

  state = {
    key: uuidV4(),
    name: '',
    color: PRIMARY,
    password: this.props.autoGeneration ? GeneratePassword(this.props.passwordLength) : '',
    icon: 'cubes',
    login: '',
    url: '',
    modalIsOpen: false,
  };

  constructor(props: Props) {
    super(props);
    if (this.props.edition) {
      const { key, name, color, password, icon, login, url } = this.props.password;
      this.state = {
        key,
        name,
        color,
        password,
        icon,
        login,
        url,
        modalIsOpen: false,
      };
    }
  }

  save() {
    const { cryptoKey, iv, passwords, edition } = this.props;
    const passwordToEdit: Password = {
      key: this.state.key,
      name: this.state.name,
      color: this.state.color,
      password: this.state.password,
      icon: this.state.icon,
      login: this.state.login,
      url: this.state.url,
    };
    this.props.actions.EditPassword(passwordToEdit, edition, cryptoKey, iv, passwords, () =>
      this.props.navigation.goBack(),
    );
  }

  generatePassword() {
    this.setState({
      password: GeneratePassword(this.props.passwordLength),
    });
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
        <NavBar
          title={strings.edition}
          needIconLeft
          needIconRight
          actionLeft={() => this.props.navigation.goBack()}
          actionRight={() => this.generatePassword()}
          iconLeft="arrow-back"
          onActionSelected={() => this.generatePassword()}
          toolbarActions={[{ title: strings.generate, iconName: 'md-refresh', show: 'always' }]}
        />

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

        <IconModal
          onSelectIcon={iconName => this.selectIcon(iconName)}
          isOpen={modalIsOpen}
          toggleModal={() => this.toggleModal()}
        />
      </View>
    );
  }
}

function mapStateToProps(state: ReduxState, ownProps: Object) {
  const passwordKey = ownProps.navigation.state.params.passwordKey;
  const edition = passwordKey !== 0;
  const password = state.data.passwords.byId[passwordKey];
  return {
    edition,
    password,
    passwordLength: state.settings.passwordLength,
    autoGeneration: state.settings.autoGeneration,
    cryptoKey: state.data.key,
    iv: state.user.iv,
    passwords: state.data.passwords,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(PasswordActions, dispatch),
}))(ReadOnlyScreen);

const styles = PlateformStyleSheet({
  main: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: IOS_BACKGROUND,
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
