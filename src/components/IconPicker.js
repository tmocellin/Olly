/*
* @flow
*/

import React from 'react';
import { Platform, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import { PRIMARY, WHITE } from '../constants/colors';

type Props = {
  icon: string,
  onPress: () => void,
  color: string,
};

const IconPicker = (props: Props) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        onPress={props.onPress}
      >
        <View style={styles.container}>
          <Icon name={props.icon} size={35} color={props.color} />
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Icon name={props.icon} size={35} color={props.color} />
    </TouchableOpacity>
  );
};

IconPicker.defaultProps = {
  color: PRIMARY,
  icon: 'cubes',
  onPress: console.log('onpress'),
};

export default IconPicker;

const styles = PlateformStyleSheet({
  container: {
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
});
