/*
* @flow
*/
import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  Linking,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuidV4 from 'uuid/v4';
import shittyQs from 'shitty-qs';
import { NavigationActions } from 'react-navigation';
import strings from '../locales/strings';
import { PRIMARY_TEXT, PRIMARY, WHITE, DELETE_COLOR } from '../constants/colors';
import TextField from '../components/TextField';
import * as SynchronizationActions from '../actions/synchronization';
import type { ReduxState } from '../reducers/types';

const appKey = 'puzyl8gt4mor5kp';

const img = require('../img/paper_plane.png');

type Props = {
  navigation: Object,
  actions: Object,
  msg: string,
  pendingAction: boolean,
};

type State = {
  verification: string,
  password: string,
};

class Login extends Component<void, Props, State> {
  state = {
    verification: uuidV4(),
    password: '',
  };

  componentDidMount() {
    Linking.addEventListener('url', event => this.handleLinkingUrl(event));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', event => this.handleLinkingUrl(event));
  }

  handleLinkingUrl(event: Object) {
    const [, queryString] = event.url.match(/\#(.*)/);
    const query = shittyQs(queryString);
    if (this.state.verification === query.state) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Unlock' })],
      });
      const reset = () => this.props.navigation.dispatch(resetAction);
      this.props.actions.RestoreData(query.access_token, this.state.password, reset);
    }
  }

  restore() {
    const redirectUri = Platform.OS === 'ios' ? 'olly://open' : 'https://www.olly.com/open';

    const url = `https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=${appKey}&redirect_uri=${redirectUri}&state=${this
      .state.verification}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  renderAction(pending: boolean) {
    if (pending) {
      return (
        <View style={styles.submit}>
          <ActivityIndicator size="large" color={PRIMARY} animating />
        </View>
      );
    }
    return (
      <View style={styles.submit}>
        <Button title={strings.restore} onPress={() => this.restore()} color={PRIMARY} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.subContainer}>
          <Image source={img} />
          <Text style={styles.title}>{strings.restoreDropBoxInstruction}</Text>
          <TextField
            icon="lock"
            iosOutline
            placeholder={strings.password}
            secureTextEntry
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            returnKeyType="done"
          />
          {this.renderAction(this.props.pendingAction)}
          <Text style={{ color: DELETE_COLOR }}>{this.props.msg}</Text>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    msg: state.restore.message,
    pendingAction: state.restore.pendingAction,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(SynchronizationActions, dispatch),
}))(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 32,
    textAlign: 'center',
    color: PRIMARY_TEXT,
  },
  submit: {
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
