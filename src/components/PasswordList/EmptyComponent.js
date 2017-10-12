/*
* @flow
*/

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import strings from '../../locales/strings';
import { PRIMARY_TEXT, PRIMARY } from '../../constants/colors';

const img = require('../../img/archive.png');

type Props = {
  fromSearch: boolean,
  onPress: () => void,
};

const renderAction = (fromSearch: boolean, onPress: () => void) => {
  if (!fromSearch) {
    return <Button title={strings.addPassword} color={PRIMARY} onPress={onPress} />;
  }
};

const EmptyComponent = (props: Props) => {
  const label = props.fromSearch ? strings.noResults : strings.noPasswords;
  return (
    <ScrollView contentContainerStyle={styles.container} automaticallyAdjustContentInsets={false}>
      <View style={styles.subContainer}>
        <Image source={img} />
        <Text style={styles.title}>{label}</Text>
      </View>
      {renderAction(props.fromSearch, props.onPress)}
    </ScrollView>
  );
};

EmptyComponent.defaultProps = {
  onPress: () => console.log('add new password'),
  fromSearch: false,
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    padding: 12,
    alignItems: 'center',
    marginTop: 42,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
    color: PRIMARY_TEXT,
  },
});
