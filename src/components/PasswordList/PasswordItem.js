/*
* @flow
*/

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WHITE } from '../../constants/colors';

type Props = {
  dimension: number,
  icon: string,
  name: string,
  color: string,
  onPress: () => void,
};

const renderContent = (icon: string, name: string, color: string, dimension: number) => (
  <View style={[styles.row, { width: dimension, height: dimension }]}>
    <View style={[styles.iconCtnr, { backgroundColor: color }]}>
      <Icon name={icon} size={44} color="white" />
    </View>
    <Text style={styles.label} numberOfLines={2}>
      {name}
    </Text>
  </View>
);
const PasswordItem = (props: Props) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {renderContent(props.icon, props.name, props.color, props.dimension)}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      {renderContent(props.icon, props.name, props.color, props.dimension)}
    </TouchableOpacity>
  );
};

PasswordItem.defaultProps = {
  color: '#F664E9',
  icon: 'dribbble',
  name: 'Dribble',
  dimension: 50,
};

export default PasswordItem;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    backgroundColor: WHITE,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
  },
  iconCtnr: {
    height: 70,
    width: 70,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 18,
    fontSize: 18,
    color: '#565656',
    paddingHorizontal: 8,
    textAlign: 'center',
  },
});
