/*
* @flow
*/

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import ReadOnlyRow from '../components/ReadOnlyRow';
import strings from '../locales/strings';
import { IOS_BACKGROUND, WHITE, DELETE_COLOR, PRIMARY } from '../constants/colors';
import { ANDROID_MARGIN, IOS_MARGIN } from '../constants/dimensions';

type State = {
  key: string,
  name: string,
  color: string,
  password: string,
  icon: string,
  login: string,
  url: string,
};

class ReadOnlyScreen extends Component<void, void, State> {
  state = {
    key: '9939diz-cd',
    name: 'Facebook',
    color: '#64A1F6',
    password: 'poekfpOKOEOFE398045:=:kOZ',
    icon: 'facebook',
    login: 'someuse@gmail.com',
    url: 'https://www.facebook.com/',
  };

  editPassword() {
    console.log('====================================');
    console.log('edit password');
    console.log('====================================');
  }

  copyPassword() {
    console.log('====================================');
    console.log('copy password');
    console.log('====================================');
  }

  deletePassword() {
    console.log('====================================');
    console.log('delet password');
    console.log('====================================');
  }

  render() {
    const { icon, color, name, password, login, url } = this.state;
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
            <TouchableOpacity style={styles.action}>
              <Text
                style={[styles.actionLabel, { color: '#647CF6' }]}
                onPress={() => this.copyPassword()}
              >
                {strings.copy}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <Text
                style={[styles.actionLabel, { color: PRIMARY }]}
                onPress={() => this.editPassword()}
              >
                {strings.edit}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <Text
                style={[styles.actionLabel, { color: DELETE_COLOR }]}
                onPress={() => this.deletePassword()}
              >
                {strings.delete}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ReadOnlyScreen;

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
