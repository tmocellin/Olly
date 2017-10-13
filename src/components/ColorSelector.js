/*
* @flow
*/

import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SELECTABLE_COLORS, PRIMARY } from '../constants/colors';

type Props = {
  onPress: (color: string) => void,
};

const ColorSelector = (props: Props) => {
  const colors = SELECTABLE_COLORS.map((color, i) => (
    <TouchableOpacity key={i} onPress={() => props.onPress(color)}>
      <View style={[styles.colorItem, { backgroundColor: color }]} />
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {colors}
      </ScrollView>
    </View>
  );
};

ColorSelector.defaultProps = {
  onPress: color => console.log(`select color : ${color}`),
};

export default ColorSelector;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,
    paddingTop: 6,
  },
  scrollView: {
    alignItems: 'center',
  },
  colorItem: {
    height: 26,
    width: 26,
    borderRadius: 26,
    marginRight: 2,
    marginLeft: 2,
  },
});
