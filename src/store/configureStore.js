import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import rootReducer from '../reducers';

const config = {
  key: 'root', // key is required
  storage, // storage is now required
  blacklist: ['data', 'synchronization', 'restore'],
};

const reducer = persistReducer(config, rootReducer);

export default function configureStore() {
  const middleware = [thunkMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger();
    middleware.push(loggerMiddleware);
  }
  const store = compose(applyMiddleware(...middleware))(createStore)(reducer);

  const persistor = persistStore(store);

  return { persistor, store };
}
