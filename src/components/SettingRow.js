/*
* @flow
*/

import React from 'react';
import { Text, View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PlateformStyleSheet, IconPlateform } from '../common/PlatformHelper';
import {
  ANDROID_ROW_HEIGHT,
  ANDROID_MARGIN,
  ANDROID_ROW_FONTSIZE,
  IOS_ROW_HEIGHT,
  IOS_MARGIN,
  IOS_ROW_FONTSIZE,
  IOS_ICON_CTNR,
} from '../constants/dimensions';
import {
  WHITE,
  PRIMARY_TEXT,
  ANDROID_SEPARATOR,
  ANDROID_SETTING_IC_COLOR,
  IOS_SEPARATOR,
} from '../constants/colors';

type Props = {
  label: string,
  iconName: string,
  iconBackground: string,
  iosOultine: boolean,
  iosSeparator: boolean,
  onPress: () => void,
};

const renderSeparator = (separatorNeeded: boolean) => {
  if (separatorNeeded) {
    return <View style={styles.separator} />;
  }
  return null;
};

const SettingRowAndroid = (label: string, iconName: string, onPress: () => void) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.iconCtnr}>
        <Icon name={IconPlateform(iconName)} color={ANDROID_SETTING_IC_COLOR} size={24} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableNativeFeedback>
);

const SettingRowiOS = (
  label: string,
  iconName: string,
  iconBackground: string,
  isOutline: boolean,
  withSeparator: boolean,
  onPress: () => void,
) => (
  <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
    <View style={[styles.iconCtnr, { backgroundColor: iconBackground }]}>
      <Icon name={IconPlateform(iconName, isOutline)} color={WHITE} size={24} />
    </View>
    <Text style={styles.label}>{label}</Text>
    {renderSeparator(withSeparator)}
  </TouchableOpacity>
);

const SettingRow = (props: Props) => {
  if (Platform.OS === 'android') {
    return SettingRowAndroid(props.label, props.iconName, props.onPress);
  }
  return SettingRowiOS(
    props.label,
    props.iconName,
    props.iconBackground,
    props.iosOultine,
    props.iosSeparator,
    props.onPress,
  );
};

SettingRow.defaultProps = {
  label: 'Setting label',
  iconName: 'trash',
  iconBackground: 'red',
  iosOultine: false,
  iosSeparator: false,
  onPress: () => console.log('onPress'),
};

export default SettingRow;

const styles = PlateformStyleSheet({
  container: {
    backgroundColor: WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    ios: {
      height: IOS_ROW_HEIGHT,
      paddingHorizontal: IOS_MARGIN,
    },
    android: {
      height: ANDROID_ROW_HEIGHT,
      paddingHorizontal: ANDROID_MARGIN,
      borderBottomWidth: 1,
      borderColor: ANDROID_SEPARATOR,
    },
  },
  label: {
    color: PRIMARY_TEXT,
    android: { fontSize: ANDROID_ROW_FONTSIZE, marginLeft: ANDROID_MARGIN },
    ios: { fontSize: IOS_ROW_FONTSIZE },
  },
  iconCtnr: {
    alignItems: 'center',
    justifyContent: 'center',
    ios: {
      width: IOS_ICON_CTNR,
      height: IOS_ICON_CTNR,
      marginRight: ANDROID_MARGIN,
      borderRadius: 6,
    },
    android: {
      width: 23,
    },
  },
  separator: {
    height: 1,
    flex: 1,
    backgroundColor: IOS_SEPARATOR,
    position: 'absolute',
    bottom: 0,
    left: 53,
    right: 0,
  },
});
