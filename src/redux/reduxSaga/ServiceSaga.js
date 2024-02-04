import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi, postApi} from '../../utils/helpers/ApiRequest';
import {
  addCartService,

  /* Add Wishlist */
  addServiceWishlistFailure,
  addServiceWishlistSuccess,

  /* Add To Cart Service */
  addToCartServiceFailure,
  addToCartServiceSuccess,

  /* Get All Service Category */
  getAllServiceCateFailure,
  getAllServiceCateSuccess,
  
  /* Get all Wishlist Service*/
  getAllServiceWishlistFailure,
  getAllServiceWishlistSuccess,

  /* Get All Service */
  getAllServicesFailure,
  getAllServicesSuccess,
  getCartId,

  /* Get Cart Items */
  getCartItemsFailure,
  getCartItemsRequest,
  getCartItemsSuccess,

  /* Get Service Category */
  getServiceCategoryFailure,
  getServiceCategorySuccess,

  /* Get Service Details */
  getServiceDetailsFailure,
  getServiceDetailsSuccess,

  /* Get Service Sub Category */
  getServiceSubCategoryFailure,
  getServiceSubCategorySuccess,

  /* Remove Cart Items */
  removeCartItemsFailure,
  removeCartItemsSuccess,
} from '../reducer/ServiceReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/helpers/constants';

let getItem = state => state.AuthReducer;

/* Get All Service Category */
export function* getAllServiceCateSaga() {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(getApi, 'services', header);

    if (response?.status == 200) {
      yield put(getAllServiceCateSuccess(response?.data?.data));
    } else {
      yield put(getAllServiceCateFailure(response?.data));
    }
  } catch (error) {
    yield put(getAllServiceCateFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

/* Get Service Category */
export function* getServiceCategorySaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };

  try {
    let response = yield call(
      getApi,
      `services/${action?.payload}/categories`,
      header,
    );

    if (response?.status == 200) {
      yield put(getServiceCategorySuccess(response?.data));
      //   showErrorAlert(response?.data?.message);
    } else {
      yield put(getServiceCategoryFailure(response?.data));
    }
  } catch (error) {
    yield put(getServiceCategoryFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Get Service Sub Category */
export function* getServiceSubCategorySaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      getApi,
      `services/${action.payload?.cateId}/categories/${action.payload?.serId}/subcategories`, // `services/2/categories/58/subcategories`,
      header,
    );
    if (response?.status == 200) {
      yield put(getServiceSubCategorySuccess(response?.data));
      //   showErrorAlert(response?.data?.message);
    } else {
      yield put(getServiceSubCategoryFailure(response?.data));
    }
  } catch (error) {
    yield put(getServiceSubCategoryFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Get All Service */
export function* getAllServicesSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      getApi,
      `services/${action?.payload?.cateId}/subcategories/${action?.payload?.serId}/services`,
      header,
    );
    if (response?.status == 200) {
      yield put(getAllServicesSuccess(response?.data?.data));
      //   showErrorAlert(response.data.message);
    } else {
      yield put(getAllServicesFailure(response?.data));
    }
  } catch (error) {
    yield put(getAllServicesFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Get Service Details */
export function* getServiceDetailsSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(getApi, `services/${action?.payload}`, header);

    if (response?.status == 200) {
      yield put(getServiceDetailsSuccess(response?.data?.data));
      //   showErrorAlert(response.data.message);
    } else {
      yield put(getServiceDetailsFailure(response?.data));
    }
  } catch (error) {
    yield put(getServiceDetailsFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Add To Cart Service */
export function* addToCartServiceSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      `cart/auth/add`,
      action?.payload,
      header,
    );

    if (response?.status == 200) {
      yield put(addToCartServiceSuccess(response?.data?.data));
      yield put(getCartItemsRequest({id: response?.data?.data?.cart_id}));
      yield call(
        AsyncStorage.setItem,
        constants.CART_ID,
        response?.data?.data?.cart_id,
      );
      yield put(getCartId(response?.data?.data?.cart_id));
      showErrorAlert(response.data.message);
    } else {
      yield put(addToCartServiceFailure(response?.data));
    }
  } catch (error) {
    console.log('error -- ', error);
    yield put(addToCartServiceFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Get Cart Items */
export function* getCartItemsSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };

  try {
    let response = yield call(
      getApi,
      `cart?cart_id=${action?.payload?.id}`,
      header,
    );

    if (response?.status == 200) {
      yield put(getCartItemsSuccess(response?.data?.data));
      yield put(addCartService(response?.data?.data?.items));
    } else {
      yield put(getCartItemsFailure(response?.data));
    }
  } catch (error) {
    yield put(getCartItemsFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Add To Cart Service */
export function* removeCartItemsSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      `cart/${action?.payload?.cart_id}/items/${action?.payload?.service_id}/remove`,
      action?.payload,
      header,
    );

    if (response?.status == 200) {
      yield put(removeCartItemsSuccess(response?.data));
      yield put(getCartItemsRequest({id: action?.payload?.cart_id}));
      showErrorAlert(response.data.message);
    } else {
      yield put(removeCartItemsFailure(response?.data));
    }
  } catch (error) {
    console.log('error -- ', error);
    yield put(removeCartItemsFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Add Wishlist */
export function* addServiceWishlistSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: item.token,
  };
  try {
    let response = yield call(postApi, `wishlists`, action?.payload, header);

    if (response?.status == 200) {
      yield put(addServiceWishlistSuccess(response?.data));
      // yield put(getCartItemsRequest({id: response?.data?.data?.cart_id}));
      showErrorAlert(response.data.message);
    } else {
      yield put(addServiceWishlistFailure(response?.data));
    }
  } catch (error) {
    console.log('error -- ', error);
    yield put(addServiceWishlistFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Get all Wishlist Service*/
export function* getAllServiceWishlistSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };

  try {
    let response = yield call(getApi, `wishlists`, header);

    if (response?.status == 200) {
      yield put(getAllServiceWishlistSuccess(response?.data?.data));
    } else {
      yield put(getAllServiceWishlistFailure(response?.data));
    }
  } catch (error) {
    yield put(getAllServiceWishlistFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Service/getAllServiceCateRequest', getAllServiceCateSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Service/getServiceCategoryRequest',
      getServiceCategorySaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Service/getServiceSubCategoryRequest',
      getServiceSubCategorySaga,
    );
  })(),
  (function* () {
    yield takeLatest('Service/getAllServicesRequest', getAllServicesSaga);
  })(),
  (function* () {
    yield takeLatest('Service/getServiceDetailsRequest', getServiceDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Service/addToCartServiceRequest', addToCartServiceSaga);
  })(),
  (function* () {
    yield takeLatest('Service/getCartItemsRequest', getCartItemsSaga);
  })(),
  (function* () {
    yield takeLatest('Service/removeCartItemsRequest', removeCartItemsSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Service/addServiceWishlistRequest',
      addServiceWishlistSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Service/getAllServiceWishlistRequest',
      getAllServiceWishlistSaga,
    );
  })(),
];

export default watchFunction;
