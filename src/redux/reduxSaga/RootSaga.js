import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import UserSaga from './UserSaga';
import ProductSaga from './ProductSaga';
import ServiceSaga from './ServiceSaga';

const combinedSaga = [...AuthSaga, ...UserSaga, ...ProductSaga, ...ServiceSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
