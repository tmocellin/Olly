/*
* @flow
*/

import React, { Component } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import TextField from '../components/TextField';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import { ANDROID_MARGIN, IOS_MARGIN } from '../constants/dimensions';
import { PRIMARY_TEXT, DELETE_COLOR, PRIMARY, WHITE } from '../constants/colors';
import strings from '../locales/strings';
import type { ReduxState } from '../reducers/types';
import initializeApplication from '../actions/initialization';

type State = {
  password: string,
  confirmation: string,
};
type Props = {
  navigation: Object,
  error: string,
  actions: Object,
};
class SetupScreen extends Component<void, Props, State> {
  confirmation: Object;
  state = {
    password: '',
    confirmation: '',
  };

  submit() {
    const { password, confirmation } = this.state;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Unlock' })],
    });
    const reset = () => this.props.navigation.dispatch(resetAction);
    this.props.actions.initializeApplication(password, confirmation, reset);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.instruction}>{strings.instructions}</Text>
        <TextField
          iconName="lock"
          iosOutline
          placeholder={strings.password}
          secureTextEntry
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          onSubmitEditing={() => {
            this.confirmation.focus();
          }}
          returnKeyType="next"
        />
        <TextField
          icon="lock"
          ref={(c) => {
            this.confirmation = c;
          }}
          placeholder={strings.confirmation}
          secureTextEntry
          value={this.state.confirmation}
          onChangeText={text => this.setState({ confirmation: text })}
        />

        <Text style={[styles.instruction, { color: DELETE_COLOR }]}>{this.props.error}</Text>
        <View style={styles.submit}>
          <Button title={strings.save} color={PRIMARY} onPress={() => this.submit()} />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    error: state.user.error,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({ initializeApplication }, dispatch),
}))(SetupScreen);

const styles = PlateformStyleSheet({
  container: {
    flex: 1,
    paddingTop: 18,
    backgroundColor: WHITE,
  },
  instruction: {
    android: { padding: ANDROID_MARGIN },
    ios: { padding: IOS_MARGIN },
    color: PRIMARY_TEXT,
    textAlign: 'justify',
    marginBottom: 18,
  },
  submit: {
    width: 150,
    alignSelf: 'center',
  },
});
