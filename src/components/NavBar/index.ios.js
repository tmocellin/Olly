/*
* @flow
*/

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  IOS_FULL_HEIGHT,
  IOS_MARGIN,
  IOS_STATUS_BAR_HEIGHT,
  IOS_NAV_BAR_HEIGHT,
} from '../../constants/dimensions';
import { WHITE, PRIMARY } from '../../constants/colors';
import { IconPlateform } from '../../common/PlatformHelper';

type Props = {
  needIconLeft: boolean,
  needIconRight: boolean,
  iconLeft: string,
  iconRight: string,
  title: string,
  actionLeft: () => void,
  actionRight: () => void,
};

const touchableIOS = (icon: string, onPress: () => void, style: Object) => (
  <TouchableOpacity onPress={onPress} style={[styles.icon, style]}>
    <Icon name={IconPlateform(icon)} size={36} color={WHITE} />
  </TouchableOpacity>
);

const renderTouchable = (render: boolean, icon: string, onPress: () => void, style: Object) => {
  if (render) {
    return touchableIOS(icon, onPress, style);
  }
  return null;
};

const NavBar = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.iconContainer}>
        {renderTouchable(props.needIconLeft, props.iconLeft, props.actionLeft, {
          justifyContent: 'flex-start',
        })}
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.iconContainer}>
        {renderTouchable(props.needIconRight, props.iconRight, props.actionRight, {
          justifyContent: 'flex-end',
        })}
      </View>
    </View>
  </View>
);

NavBar.defaultProps = {
  needIconLeft: false,
  needIconRight: false,
  iconLeft: 'arrow-back',
  iconRight: 'refresh',
  title: 'Title',
  actionLeft: () => console.log('left press'),
  actionRight: () => console.log('left press'),
};
export default NavBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    height: IOS_FULL_HEIGHT,

    backgroundColor: PRIMARY,
  },
  content: {
    marginTop: IOS_STATUS_BAR_HEIGHT,
    paddingHorizontal: IOS_MARGIN,
    height: IOS_NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',

    flexDirection: 'row',
  },
  title: {
    alignSelf: 'center',
    fontSize: 17,
    letterSpacing: 0.5,
    fontWeight: '600',
    color: WHITE,
  },
  iconContainer: {
    width: 50,
  },
  icon: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 50,
  },
});
