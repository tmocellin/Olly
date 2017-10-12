/*
* @flow
*/

import React from 'react';
import { View, TouchableNativeFeedback, Text, Switch, Platform } from 'react-native';
import {
  ANDROID_ROW_HEIGHT,
  ANDROID_MARGIN,
  ANDROID_ROW_FONTSIZE,
  IOS_ROW_HEIGHT,
  IOS_MARGIN,
  IOS_ROW_FONTSIZE,
} from '../constants/dimensions';
import { WHITE, PRIMARY_TEXT, ANDROID_SEPARATOR, IOS_SEPARATOR } from '../constants/colors';
import { PlateformStyleSheet } from '../common/PlatformHelper';

type Props = {
  isChecked: boolean,
  label: string,
  switchValueChange: (value: boolean) => void,
};
const renderContent = (
  label: string,
  isChecked: boolean,
  switchValueChange: (value: boolean) => void,
) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Switch onValueChange={value => switchValueChange(value)} value={isChecked} />
  </View>
);

const CheckBoxRow = (props: Props) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={() => props.switchValueChange(!props.isChecked)}>
        {renderContent(props.label, props.isChecked, props.switchValueChange)}
      </TouchableNativeFeedback>
    );
  }
  return renderContent(props.label, props.isChecked, props.switchValueChange);
};

CheckBoxRow.defaultProps = {
  isChecked: false,
  label: 'Label',
  switchValueChange: (value: boolean) => console.log(`switch value : ${value.toString()}`),
};

export default CheckBoxRow;

const styles = PlateformStyleSheet({
  container: {
    backgroundColor: WHITE,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ios: {
      height: IOS_ROW_HEIGHT,
      paddingHorizontal: IOS_MARGIN,
      borderTopWidth: 1,
      borderColor: IOS_SEPARATOR,
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
    android: { fontSize: ANDROID_ROW_FONTSIZE },
    ios: { fontSize: IOS_ROW_FONTSIZE },
  },
});
