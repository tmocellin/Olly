import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './store/configureStore';
import Loader from './components/Loader';
import StackNavigator from './screens/StackNavigator';
import { PRIMARY_DARK } from './constants/colors';

const { persistor, store } = configureStore();

const App = () => (
  <View style={styles.ctnr}>
    <StatusBar backgroundColor={PRIMARY_DARK} />
    <PersistGate persistor={persistor} loading={<Loader />}>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </PersistGate>
  </View>
);

export default App;

const styles = StyleSheet.create({
  ctnr: {
    flex: 1,
  },
});
