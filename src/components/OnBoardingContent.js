import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { PRIMARY_TEXT, WHITE, PLACE_HOLDER, PRIMARY } from '../constants/colors';
import strings from '../locales/strings';

type Props = {
  label: string,
  description: string,
  image: any,
  showButtons: boolean,
  navigation: Object,
};

const renderButtons = (showButtons: boolean, goToInit: () => void, goToRestore: () => void) => {
  if (showButtons) {
    return (
      <View>
        <TouchableOpacity style={styles.linkBtn} onPress={goToInit}>
          <Text style={styles.link}>{strings.firstUse}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBtn} onPress={goToRestore}>
          <Text style={styles.link}>{strings.restore}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

export default (props: Props) => (
  <View style={styles.slide}>
    <Image source={props.image} />
    <Text style={styles.title}>{props.label}</Text>
    <Text style={styles.description}>{props.description}</Text>
    {renderButtons(
      props.showButtons,
      () => props.navigation.navigate('Setup'),
      () => props.navigation.navigate('Setup'),
    )}
  </View>
);

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    color: PRIMARY_TEXT,
  },
  description: {
    color: PLACE_HOLDER,
    textAlign: 'center',
    padding: 18,
  },
  linkBtn: {
    padding: 12,
    alignItems: 'stretch',
  },
  link: {
    color: PRIMARY,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
