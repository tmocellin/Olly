/*
* @flow
*/

import React from 'react';
import { View, Text } from 'react-native';
import { ANDROID_MARGIN, IOS_MARGIN } from '../constants/dimensions';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import { PRIMARY_TEXT, IOS_SLIDER_LABEL } from '../constants/colors';

type Props = {
  label: string,
  value: string,
};

const ReadOnlyRow = (props: Props) => (
  <View>
    <Text style={styles.label}>{props.label} :</Text>
    <Text style={styles.value}>{props.value}</Text>
  </View>
);

ReadOnlyRow.defaultProps = {
  label: 'Label',
  value: 'value',
};

const styles = PlateformStyleSheet({
  container: {
    alignItems: 'flex-start',
  },
  value: {
    color: PRIMARY_TEXT,
    ios: { padding: IOS_MARGIN },
    android: { padding: ANDROID_MARGIN },
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    color: IOS_SLIDER_LABEL,
    ios: { paddingHorizontal: IOS_MARGIN },
    android: { paddingHorizontal: ANDROID_MARGIN },
    fontSize: 16,
  },
});

export default ReadOnlyRow;
