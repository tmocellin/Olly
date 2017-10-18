/*
* @flow
*/

import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ACTION_BUTTON } from '../constants/dimensions';
import { WHITE, PRIMARY } from '../constants/colors';

type Props = {
  onPress: () => void,
};

const ActionButton = (props: Props) => (
  <View style={[styles.container, { elevation: 4 }]}>
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      onPress={() => props.onPress()}
    >
      <View style={styles.container}>
        <Icon name="md-add" size={24} color={WHITE} />
      </View>
    </TouchableNativeFeedback>
  </View>
);

ActionButton.defaultProps = {
  onPress: () => console.log('onPress'),
};

export default ActionButton;
const styles = StyleSheet.create({
  container: {
    height: ACTION_BUTTON,
    width: ACTION_BUTTON,
    borderRadius: ACTION_BUTTON,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
