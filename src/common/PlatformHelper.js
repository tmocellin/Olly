/*
  @flow
 */
import { StyleSheet, Platform } from 'react-native';

export const PlateformStyleSheet = (styles: Object): Object => {
  const platformStyles = {};
  Object.keys(styles).forEach((name) => {
    let { ios, android, ...style } = { ...styles[name] };
    if (ios && Platform.OS === 'ios') {
      style = { ...style, ...ios };
    }
    if (android && Platform.OS === 'android') {
      style = { ...style, ...android };
    }
    platformStyles[name] = style;
  });
  return StyleSheet.create(platformStyles);
};

export const IconPlateform = (iconName: string, isOutline: boolean = false): string => {
  let name = Platform.OS === 'android' ? `md-${iconName}` : `ios-${iconName}`;
  if (Platform.OS === 'ios' && isOutline) {
    name = `${name}-outline`;
  }
  return name;
};
