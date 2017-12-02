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
import * as UnlockActions from '../actions/unlock';

const image = require('../img/book.png');

type State = {
  password: string,
};
type Props = {
  navigation: Object,
  actions: Object,
  appInitialized: boolean,
  cryptedPasswords: string,
  verificationToken: string,
  salt: string,
  iv: string,
  error: string,
};

class UnlockScreen extends Component<void, Props, State> {
  state = {
    password: '',
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params && params.reset) {
      this.props.actions.lockApp();
    }
    if (!this.props.appInitialized) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Onboarding' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  submit() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'App' })],
    });
    const reset = () => this.props.navigation.dispatch(resetAction);
    this.props.actions.unlockApp(
      this.state.password,
      this.props.verificationToken,
      this.props.salt,
      this.props.iv,
      this.props.cryptedPasswords,
      reset,
    );
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
        <Text style={styles.error}> {this.props.error}</Text>
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
    cryptedPasswords: state.cryptedData.passwords,
    verificationToken: state.user.verificationToken,
    salt: state.user.salt,
    iv: state.user.iv,
    error: state.data.error,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(UnlockActions, dispatch),
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
