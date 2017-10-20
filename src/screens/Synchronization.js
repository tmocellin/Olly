/*
* @flow
*/

import React, { Component } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import SettingRow from '../components/SettingRow';
import strings from '../locales/strings';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import { IOS_BACKGROUND, WHITE, DELETE_COLOR, PRIMARY } from '../constants/colors';
import NavBar from '../components/NavBar';

export default class SynchronizationScreen extends Component {
  uploadBackup() {
    console.log('====================================');
    console.log('upload data');
    console.log('====================================');
  }
  downloadBackup() {
    console.log('====================================');
    console.log('download data');
    console.log('====================================');
  }
  deleteBackup() {
    Alert.alert(strings.clear, strings.clearConfirmation, [
      { text: strings.cancel, style: 'cancel' },
      { text: strings.delete, onPress: () => console.log('delete data') },
    ]);
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar title={strings.synchronization} />
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
});
