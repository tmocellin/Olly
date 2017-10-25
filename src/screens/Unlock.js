/*
* @flow
*/

import React, { Component } from 'react';
import { ScrollView, View, Image, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import TextField from '../components/TextField';
import strings from '../locales/strings';
import { ANDROID_MARGIN, IOS_MARGIN } from '../constants/dimensions';
import { PRIMARY, WHITE, DELETE_COLOR } from '../constants/colors';
import type { ReduxState } from '../reducers/types';

const image = require('../img/book.png');

type State = {
  password: string,
};
type Props = {
  navigation: Object,
  appInitialized: boolean,
};

class UnlockScreen extends Component<void, Props, State> {
  state = {
    password: '',
  };

  componentWillMount() {
    if (!this.props.appInitialized) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Setup' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  submit() {
    console.log('====================================');
    console.log(`mot de passe : ${this.state.password}`);
    console.log('====================================');

    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={image} style={styles.logo} />
        <TextField
          icon="lock"
          placeholder={strings.password}
          secureTextEntry
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />
        <Text style={styles.error}> Ce texte sera remplacer lorsqu'on ajoutera redux</Text>
        <View style={styles.submit}>
          <Button title={strings.unlock} color={PRIMARY} onPress={() => this.submit()} />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    appInitialized: state.user.appInitialized,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({}, dispatch),
}))(UnlockScreen);

const styles = PlateformStyleSheet({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: 'center',
    android: { padding: ANDROID_MARGIN },
    ios: { padding: IOS_MARGIN },
  },
  logo: {
    marginBottom: 32,
    alignSelf: 'center',
  },
  error: {
    marginVertical: 16,
    color: DELETE_COLOR,
    textAlign: 'justify',
  },
  submit: {
    width: 150,
    alignSelf: 'center',
  },
});
