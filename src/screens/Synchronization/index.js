/*
* @flow
*/
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { ReduxState } from '../../reducers/types';
import * as synchronizationActions from '../../actions/synchronization';
import Synchronization from './Synchronization';
import Login from './Login';

type Props = {
  navigation: Object,
  actions: Object,
  accessToken: string,
  isLoggedIn: boolean,
};

const Index = (props: Props) => {
  if (props.isLoggedIn) {
    return <Synchronization navigation={props.navigation} accessToken={props.accessToken} />;
  }
  return (
    <Login
      navigation={props.navigation}
      setAccessToken={token => props.actions.SetAccessToken(token)}
    />
  );
};

function mapStateToProps(state: ReduxState) {
  return {
    isLoggedIn: state.synchronization.userLoggedToDropbox,
    accessToken: state.synchronization.accessToken,
  };
}
export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(synchronizationActions, dispatch),
}))(Index);
