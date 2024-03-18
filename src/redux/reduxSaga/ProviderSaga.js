import { call, put, select, takeLatest } from "redux-saga/effects";
import showErrorAlert from "../../utils/helpers/Toast";
import { providerSearchPostApi } from "../../utils/helpers/ApiRequest";
import {
  /* User Informaition */

  searchProvidersForServicesSuccess,
  searchProvidersForServicesFailure,
} from "../reducer/ProviderReducer";

let getItem = (state) => state.AuthReducer;

/* User Informaition */
export function* getProviderForServicesSaga() {
  const item = yield select(getItem);
  console.log("Item Token --- ", item);
  let header = {
    Accept: "application/json",
    contenttype: "application/json",
    accesstoken: item.token,
  };
  try {
    let response = yield call(providerSearchPostApi, "push", header);

    if (response?.status == 200) {
      console.log("Provider Search Responses -- ", JSON.stringify(response?.data?.data));
      yield put(searchProvidersForServicesSuccess(response?.data?.data));
    } else {
      console.log("Provider Search Error -- ", JSON.stringify(response?.data));
      yield put(searchProvidersForServicesFailure(response?.data));
    }
  } catch (error) {
    console.log("Provider Search Catch Error -- ", error);
    yield put(searchProvidersForServicesFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest("Provider/searchProvidersForServices", getProviderForServicesSaga);
  })(),
];

export default watchFunction;
