/*
* @flow
*/

import React, { Component } from 'react';
import { View, Alert, Text, ActivityIndicator } from 'react-native';
import SettingRow from '../../components/SettingRow';
import strings from '../../locales/strings';
import { PlateformStyleSheet } from '../../common/PlatformHelper';
import { IOS_BACKGROUND, WHITE, DELETE_COLOR, PRIMARY } from '../../constants/colors';
import { ANDROID_MARGIN, IOS_MARGIN } from '../../constants/dimensions';
import NavBar from '../../components/NavBar';

type Props = {
  uploadBackup: () => void,
  downloadBackup: () => void,
  deleteBackup: () => void,
  success: boolean,
  message: string,
  pendingAction: boolean,
  navigation: Object,
};

export default class SynchronizationScreen extends Component<void, Props, void> {
  uploadBackup() {
    this.props.uploadBackup();
  }
  downloadBackup() {
    this.props.downloadBackup();
  }
  deleteBackup() {
    Alert.alert(strings.clear, strings.clearConfirmation, [
      { text: strings.cancel, style: 'cancel' },
      { text: strings.delete, onPress: () => this.props.deleteBackup() },
    ]);
  }

  renderAction() {
    if (this.props.pendingAction) {
      return (
        <View style={styles.loaderCtnr}>
          <ActivityIndicator size="large" color={WHITE} animating />
          <Text style={styles.msgPending}>{this.props.message}</Text>
        </View>
      );
    }
    const color = this.props.success ? PRIMARY : DELETE_COLOR;
    return <Text style={[styles.msg, { color }]}>{this.props.message}</Text>;
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title={strings.synchronization}
          actionLeft={() => this.props.navigation.navigate('DrawerOpen')}
        />
        <SettingRow
          label={strings.publish}
          iconName="cloud-upload"
          withSeparator
          iosOultine
          iosSeparator
          iconBackground={PRIMARY}
          onPress={() => this.uploadBackup()}
        />
        <SettingRow
          label={strings.pull}
          iconName="cloud-download"
          iosOultine
          iconBackground={PRIMARY}
          onPress={() => this.downloadBackup()}
        />
        <View style={styles.itmCtnr}>
          <SettingRow
            label={strings.deleteBackup}
            iconName="trash"
            iconBackground={DELETE_COLOR}
            iosOultine
            onPress={() => this.deleteBackup()}
          />
        </View>
        {this.renderAction()}
      </View>
    );
  }
}

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
  itmCtnr: {
    ios: {
      marginTop: 16,
    },
  },
  loaderCtnr: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba( 0, 0, 0, 0.7 )',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg: {
    ios: {
      padding: IOS_MARGIN,
    },
    android: {
      padding: ANDROID_MARGIN,
    },
  },
  msgPending: {
    color: WHITE,
    fontWeight: 'bold',
    marginTop: 16,
  },
});
