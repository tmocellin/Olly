/*
* @flow
*/

import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CryptoJS from 'crypto-js';
import type { ReduxState } from '../reducers/types';
import * as SettingsActions from '../actions/settings';
import { DeleteAllPasswords } from '../actions/passwords';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import SettingRow from '../components/SettingRow';
import SliderRow from '../components/SliderRow';
import CheckBoxRow from '../components/CheckBoxRow';
import strings from '../locales/strings';
import { IOS_BACKGROUND, WHITE, DELETE_COLOR } from '../constants/colors';
import NavBar from '../components/NavBar';

type Props = {
  passwordLength: number,
  autoGeneration: boolean,
  navigation: Object,
  actions: Object,
  iv: string,
  cryptoKey: CryptoJS.WordArray,
};

class SettingsScreen extends Component<void, Props, void> {
  deleteAllPasswords() {
    const { iv, cryptoKey } = this.props;
    Alert.alert(strings.clear, strings.clearConfirmation, [
      { text: strings.cancel, style: 'cancel' },
      {
        text: strings.delete,
        onPress: () => this.props.actions.DeleteAllPasswords(cryptoKey, iv),
      },
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title={strings.settings}
          actionLeft={() => this.props.navigation.navigate('DrawerOpen')}
        />
        <SliderRow
          label={strings.passwordLength}
          onValueChange={value => this.props.actions.SetPasswordLength(value)}
          selectedValue={this.props.passwordLength}
        />
        <CheckBoxRow
          label={strings.passwordAuto}
          iconName="star"
          isChecked={this.props.autoGeneration}
          switchValueChange={value => this.props.actions.SetAutoGeneration(value)}
        />
        <View style={styles.itemContainer}>
          <SettingRow
            label={strings.deleteAllPasswords}
            iconName="trash"
            iconBackground={DELETE_COLOR}
            iosOultine
            onPress={() => this.deleteAllPasswords()}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    passwordLength: state.settings.passwordLength,
    autoGeneration: state.settings.autoGeneration,
    cryptoKey: state.data.key,
    iv: state.user.iv,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({ ...{}, ...{ DeleteAllPasswords }, ...SettingsActions }, dispatch),
}))(SettingsScreen);

const styles = PlateformStyleSheet({
  container: {
    flex: 1,
    ios: {
      backgroundColor: IOS_BACKGROUND,
    },
    android: {
      backgroundColor: WHITE,
    },
  },
  itemContainer: {
    ios: {
      marginTop: 16,
    },
  },
});
