/*
* @flow
*/

import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconPlateform } from '../../common/PlatformHelper';
import { ANDROID_NAV_HEIGHT } from '../../constants/dimensions';
import { WHITE, PRIMARY } from '../../constants/colors';

type Props = {
  title: string,
  actionLeft: () => void,
  toolbarActions: Array<Object>,
  iconLeft: string,
  onActionSelected: (position: number) => void,
};

const NavBar = (props: Props) => (
  <Icon.ToolbarAndroid
    navIconName={IconPlateform(props.iconLeft)}
    onActionSelected={props.onActionSelected}
    onIconClicked={props.actionLeft}
    style={styles.toolbar}
    actions={props.toolbarActions}
    title={props.title}
    iconColor={WHITE}
    titleColor={WHITE}
  />
);

export default NavBar;

NavBar.defaultProps = {
  title: 'Title',
  actionLeft: () => console.log('left click'),
  toolbarActions: [],
  iconLeft: 'menu',
  onActionSelected: position => console.log(`action idx${position}`),
};
// sample actions [{ title: 'Done', iconName: 'md-color-wand', show: 'always' }]

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: PRIMARY,
    height: ANDROID_NAV_HEIGHT,
  },
});
