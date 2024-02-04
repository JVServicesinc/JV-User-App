import {call, put, select, takeLatest} from 'redux-saga/effects';
import showErrorAlert from '../../utils/helpers/Toast';
import {getApi, postApi} from '../../utils/helpers/ApiRequest';
import {
  /* Update User Informaition */
  updateUserInfoFailure,
  updateUserInfoSuccess,

  /* User Informaition */
  getUserInfoRequest,
  getUserInfoFailure,
  getUserInfoSuccess,

  /* Update Password */
  updatePasswordSuccess,
  updatePasswordFailure,

  /* Delete Account */
  deleteAccountSuccess,
  deleteAccountFailure,

  /* Add Address */
  addAddressSuccess,
  addAddressFailure,

  /* Address */
  getAllAddressSuccess,
  getAllAddressFailure,
  
  /* Update Address */
  updateAddressSuccess,
  updateAddressFailure,
} from '../reducer/UserReducer';
import {logoutRequest} from '../reducer/AuthReducer';
import {goBack} from '../../utils/helpers/RootNavigation';

let getItem = state => state.AuthReducer;

/* User Informaition */
export function* getUserInfoSaga() {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(getApi, 'user/profile', header);
    if (response?.status == 200) {
      yield put(getUserInfoSuccess(response?.data?.data));
    } else {
      yield put(getUserInfoFailure(response?.data));
    }
  } catch (error) {
    yield put(getUserInfoFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

/* Update User Informaition */
export function* updateUserInfoSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };

  try {
    let response = yield call(postApi, 'user/profile', action?.payload, header);

    if (response?.status == 200) {
      yield put(updateUserInfoSuccess(response?.data));
      showErrorAlert(response?.data?.message);
      yield put(getUserInfoRequest());
    } else {
      yield put(updateUserInfoFailure(response?.data));
    }
  } catch (error) {
    yield put(updateUserInfoFailure(error));
    showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Update Password */
export function* updatePasswordSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
  };
  try {
    let response = yield call(
      postApi,
      'auth/forgot-password/change-password',
      action?.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(updatePasswordSuccess(response?.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(updatePasswordFailure(response?.data));
    }
  } catch (error) {
    yield put(updatePasswordFailure(error));
    showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Delete Account */
export function* deleteAccountSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(postApi, 'user/delete', action?.payload, header);
    if (response?.status == 200) {
      yield put(deleteAccountSuccess(response?.data?.data));
      showErrorAlert(response.data.message);
      yield put(logoutRequest());
    } else {
      yield put(deleteAccountFailure(response?.data));
    }
  } catch (error) {
    yield put(deleteAccountFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Add Address */
export function* addAddressSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      'user/addresses',
      action?.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(addAddressSuccess(response?.data));
      showErrorAlert(response?.data?.message);
      goBack();
    } else {
      yield put(addAddressFailure(response?.data));
    }
  } catch (error) {
    yield put(addAddressFailure(error));
    showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Address */
export function* getAllAddressSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(getApi, 'user/addresses', header);
    if (response?.status == 200) {
      yield put(getAllAddressSuccess(response?.data));
      // showErrorAlert(response?.data?.message);
    } else {
      yield put(addAddressFailure(response?.data));
    }
  } catch (error) {
    yield put(getAllAddressFailure(error));
    showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Update Address */
export function* updateAddressSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      `user/addresses/${action.payload?.id}/update`,
      action?.payload?.data,
      header,
    );
    if (response?.status == 200) {
      yield put(updateAddressSuccess(response?.data));
      showErrorAlert(response?.data?.message);
      goBack();
    } else {
      yield put(addAddressFailure(response?.data));
    }
  } catch (error) {
    yield put(updateAddressFailure(error));
    showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('User/getUserInfoRequest', getUserInfoSaga);
  })(),
  (function* () {
    yield takeLatest('User/updateUserInfoRequest', updateUserInfoSaga);
  })(),
  (function* () {
    yield takeLatest('User/updatePasswordRequest', updatePasswordSaga);
  })(),
  (function* () {
    yield takeLatest('User/deleteAccountRequest', deleteAccountSaga);
  })(),
  (function* () {
    yield takeLatest('User/addAddressRequest', addAddressSaga);
  })(),
  (function* () {
    yield takeLatest('User/getAllAddressRequest', getAllAddressSaga);
  })(),
  (function* () {
    yield takeLatest('User/updateAddressRequest', updateAddressSaga);
  })(),
];

export default watchFunction;
