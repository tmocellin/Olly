import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './store/configureStore';
import Loader from './components/Loader';
import StackNavigator from './screens/StackNavigator';

const { persistor, store } = configureStore();

const App = () => (
  <PersistGate persistor={persistor} loading={<Loader />}>
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  </PersistGate>
);

export default App;
