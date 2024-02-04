import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import AuthReducer from './reducer/AuthReducer';
import UserReducer from './reducer/UserReducer';
import ProductReducer from './reducer/ProductReducer';
import {logger} from 'redux-logger';
import RootSaga from './reduxSaga/RootSaga';
import ServiceReducer from './reducer/ServiceReducer';
import {persistStore, persistReducer} from 'redux-persist';
import {globalSlice} from './reducer/GlobalSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageReducer from './reducer/LanguageReducer';

const globalPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['isWarningShown'],
};

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

const Store = configureStore({
  reducer: {
    GlobalReducer: persistReducer(globalPersistConfig, globalSlice.reducer),
    AuthReducer: AuthReducer,
    LanguageReducer: LanguageReducer,
    UserReducer: UserReducer,
    ProductReducer: ProductReducer,
    ServiceReducer: ServiceReducer,
  },
  middleware,
});

sagaMiddleware.run(RootSaga);

export default Store;

export const persistor = persistStore(Store);
