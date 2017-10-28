/*
* @flow
*/

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CryptoJS from 'crypto-js';
import type { ReduxState } from '../reducers/types';
import type { Password } from '../types/Password';
import type { NormalizedState } from '../types/NormalizedState';
import { DeletePassword } from '../actions/passwords';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import ReadOnlyRow from '../components/ReadOnlyRow';
import strings from '../locales/strings';
import { IOS_BACKGROUND, WHITE, DELETE_COLOR, PRIMARY } from '../constants/colors';
import { ANDROID_MARGIN, IOS_MARGIN } from '../constants/dimensions';

type Props = {
  password: Password,
  cryptoKey: CryptoJS.WordArray,
  iv: string,
  passwords: NormalizedState,
  navigation: Object,
  actions: Object,
};

class ReadOnlyScreen extends Component<void, Props, void> {
  editPassword() {
    this.props.navigation.navigate('Edit', {
      passwordKey: this.props.password.key,
    });
  }

  copyPassword() {
    console.log('copy password');
  }

  deletePassword() {
    const { cryptoKey, iv, passwords, navigation } = this.props;
    this.props.actions.DeletePassword(this.props.password.key, cryptoKey, iv, passwords, () =>
      navigation.goBack(),
    );
  }

  render() {
    if (!this.props.password) {
      return <View />;
    }
    const { icon, color, name, password, login, url } = this.props.password;
    return (
      <ScrollView style={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.iconCtnr}>
            <View style={styles.icon}>
              <Icon name={icon} size={35} color={color} />
            </View>
          </View>
          <ReadOnlyRow label={strings.siteName} value={name} />
          <ReadOnlyRow label={strings.siteUrl} value={url} />
          <ReadOnlyRow label={strings.userName} value={login} />
          <ReadOnlyRow label={strings.password} value={password} />

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.action} onPress={() => this.copyPassword()}>
              <Text style={[styles.actionLabel, { color: '#647CF6' }]}>{strings.copy}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={() => this.editPassword()}>
              <Text style={[styles.actionLabel, { color: PRIMARY }]}>{strings.edit}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={() => this.deletePassword()}>
              <Text style={[styles.actionLabel, { color: DELETE_COLOR }]}>{strings.delete}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state: ReduxState, ownProps: Object) {
  const passwordKey = ownProps.navigation.state.params.passwordKey;

  const password = state.data.passwords.byId[passwordKey];
  return {
    password,
    cryptoKey: state.data.key,
    iv: state.user.iv,
    passwords: state.data.passwords,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({ DeletePassword }, dispatch),
}))(ReadOnlyScreen);

const styles = PlateformStyleSheet({
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
  icon: {
    android: {
      borderWidth: 1,
      borderColor: PRIMARY,
    },
    height: 75,
    width: 75,
    borderRadius: 75,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    marginTop: 32,
  },
  action: {
    ios: {
      padding: IOS_MARGIN,
      marginBottom: 16,
    },
    android: {
      padding: ANDROID_MARGIN,
      marginBottom: 6,
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 18,
    android: { fontWeight: 'bold' },
  },
});
