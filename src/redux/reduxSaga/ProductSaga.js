import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi, postApi} from '../../utils/helpers/ApiRequest';
import {
  /* Add Cart Product */
  addCartProduct,

  /* Add To Cart Product */
  addToCartProductFailure,
  addToCartProductSuccess,

  /* Get Cart Product Id */
  getCartProductId,

  /* Get Cart Product Items */
  getCartProductItemsFailure,
  getCartProductItemsRequest,
  getCartProductItemsSuccess,

  /* Get Product By Category */
  getProductByCategoryFailure,
  getProductByCategorySuccess,

  /* Get Product Category */
  getProductCategoryFailure,
  getProductCategorySuccess,

  /* Get Product Details */
  getProductDetailsFailure,
  getProductDetailsSuccess,

  /* Get Trending Product */
  getTrendingProductFailure,
  getTrendingProductSuccess,

  /* Remove Cart Items */
  removeCartProductItemsFailure,
  removeCartProductItemsSuccess,
} from '../reducer/ProductReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/helpers/constants';

let getItem = state => state.AuthReducer;

/* Get Product Category */
export function* getProductCategorySaga() {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(getApi, 'products/categories', header);

    if (response?.status == 200) {
      yield put(getProductCategorySuccess(response?.data?.data));
    } else {
      yield put(getProductCategoryFailure(response?.data));
    }
  } catch (error) {
    yield put(getProductCategoryFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

/* Get Trending Product */
export function* getTrendingProductSaga() {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };

  try {
    let response = yield call(getApi, 'products/trending', header);

    if (response?.status == 200) {
      yield put(getTrendingProductSuccess(response?.data?.data));
      //   showErrorAlert(response?.data?.message);
    } else {
      yield put(getTrendingProductFailure(response?.data));
    }
  } catch (error) {
    yield put(getTrendingProductFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Get Product By Category */
export function* getProductByCategorySaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      getApi,
      `products/categories/${action.payload}/products`, // id <- 1
      header,
    );
    if (response?.status == 200) {
      yield put(getProductByCategorySuccess(response?.data?.data));
      //   showErrorAlert(response?.data?.message);
    } else {
      yield put(getProductByCategoryFailure(response?.data));
    }
  } catch (error) {
    yield put(getProductByCategoryFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Get Product Details */
export function* getProductDetailsSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(getApi, `products/${action?.payload}`, header); // id <- 1
    if (response?.status == 200) {
      yield put(getProductDetailsSuccess(response?.data?.data));
      //   showErrorAlert(response.data.message);
    } else {
      yield put(getProductDetailsFailure(response?.data));
    }
  } catch (error) {
    yield put(getProductDetailsFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Add To Cart Product */
export function* addToCartProductSaga(action) {
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
      yield put(addToCartProductSuccess(response?.data?.data));
      // yield put(getCartItemsRequest({id: response?.data?.data?.cart_id}));

      yield call(
        AsyncStorage.setItem,
        constants.PRODUCT_CART_ID,
        response?.data?.data?.cart_id,
      );
      yield put(getCartProductItemsRequest({id: response?.data?.data?.cart_id}));
      yield put(getCartProductId(response?.data?.data?.cart_id));
      showErrorAlert(response.data.message);
    } else {
      yield put(addToCartProductFailure(response?.data));
    }
  } catch (error) {
    console.log('error -- ', error);
    yield put(addToCartProductFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Get Cart Items */
export function* getCartProductItemsSaga(action) {
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
      yield put(getCartProductItemsSuccess(response?.data?.data));
      yield put(addCartProduct(response?.data?.data?.items));
    } else {
      yield put(getCartProductItemsFailure(response?.data));
    }
  } catch (error) {
    yield put(getCartProductItemsFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

/* Remove Cart Items */
export function* removeCartProductItemsSaga(action) {
  const item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item.token,
  };
  try {
    let response = yield call(
      postApi,
      `cart/${action?.payload?.cart_id}/items/${action?.payload?.product_id}/remove`,
      action?.payload,
      header,
    );

    if (response?.status == 200) {
      yield put(removeCartProductItemsSuccess(response?.data));
      yield put(getCartProductItemsRequest({id: action?.payload?.cart_id}));
      showErrorAlert(response.data.message);
    } else {
      yield put(removeCartProductItemsFailure(response?.data));
    }
  } catch (error) {
    console.log('error -- ', error);
    yield put(removeCartProductItemsFailure(error));
    // showErrorAlert(error?.response?.data?.response.status.msg);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest(
      'Product/getProductCategoryRequest',
      getProductCategorySaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Product/getTrendingProductRequest',
      getTrendingProductSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Product/getProductByCategoryRequest',
      getProductByCategorySaga,
    );
  })(),
  (function* () {
    yield takeLatest('Product/getProductDetailsRequest', getProductDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Product/addToCartProductRequest', addToCartProductSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Product/getCartProductItemsRequest',
      getCartProductItemsSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Product/removeCartProductItemsRequest',
      removeCartProductItemsSaga,
    );
  })(),
];

export default watchFunction;
