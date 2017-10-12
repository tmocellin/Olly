/*
* @flow
*/

import React from 'react';
import { View, Slider, Text, Platform } from 'react-native';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import {
  ANDROID_MARGIN,
  ANDROID_ROW_FONTSIZE,
  IOS_ROW_HEIGHT,
  IOS_MARGIN,
} from '../constants/dimensions';
import { WHITE, PRIMARY_TEXT, ANDROID_SEPARATOR, IOS_SLIDER_LABEL } from '../constants/colors';

type Props = {
  selectedValue: number,
  onValueChange: (value: number) => void,
  onSlidingComplete: (value: number) => void,
  label: string,
};

const renderSlider = (
  selectedValue: number,
  onValueChange: (value: number) => void,
  onSlidingComplete: (value: number) => void,
) => {
  if (Platform.OS === 'android') {
    return (
      <Slider
        style={styles.slider}
        minimumValue={8}
        maximumValue={60}
        step={1}
        value={selectedValue}
        onSlidingComplete={value => onSlidingComplete(value)}
        onValueChange={value => onValueChange(value)}
      />
    );
  }
  return (
    <View style={styles.sliderCtnr}>
      <Slider
        style={styles.slider}
        onSlidingComplete={value => onSlidingComplete(value)}
        minimumValue={8}
        maximumValue={60}
        step={1}
        value={selectedValue}
        onValueChange={value => onValueChange(value)}
      />
    </View>
  );
};

const SliderRow = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.subContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <Text style={styles.label}>{props.selectedValue}</Text>
    </View>
    <View style={styles.sliderCtnr}>
      {renderSlider(props.selectedValue, props.onValueChange, props.onSlidingComplete)}
    </View>
  </View>
);

SliderRow.defaultProps = {
  selectedValue: 12,
  onValueChange: (value: number) => console.log(`onValueChange : ${value}`),
  onSlidingComplete: (value: number) => console.log(`onSlidingComplete : ${value}`),
  label: 'Label',
};

export default SliderRow;

const styles = PlateformStyleSheet({
  container: {
    android: {
      backgroundColor: WHITE,
      borderBottomWidth: 1,
      borderColor: ANDROID_SEPARATOR,
    },
  },
  subContainer: {
    android: {
      padding: ANDROID_MARGIN,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ios: {
      padding: IOS_MARGIN,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  label: {
    color: PRIMARY_TEXT,
    android: { fontSize: ANDROID_ROW_FONTSIZE },
    ios: {
      fontSize: 13,
      color: IOS_SLIDER_LABEL,
    },
  },
  slider: {
    android: {
      marginBottom: ANDROID_MARGIN,
    },
    ios: {
      marginHorizontal: IOS_MARGIN,
    },
  },
  sliderCtnr: {
    height: IOS_ROW_HEIGHT,
    backgroundColor: WHITE,
  },
});
