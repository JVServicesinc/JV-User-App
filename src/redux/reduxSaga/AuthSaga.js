import AsyncStorage from "@react-native-async-storage/async-storage";
import { call, put, select, takeLatest } from "redux-saga/effects";
import constants from "../../utils/helpers/constants";
import _ from "lodash";
import {
  /* Login */
  loginSuccess,
  loginFailure,

  /* SignUp */
  signupSuccess,
  signupFailure,

  /* Logout */
  logoutFailure,
  logoutSuccess,

  /* Check Email Exits */
  checkEmailExitSuccess,
  checkEmailExitFailure,

  /* Token */
  setUserToken,

  /* Otp Verification */
  otpVerifySuccess,
  otpVerifyFailure,

  /* Resend otp */
  resendOtpSuccess,
  resendOtpFailure,

  /* Login */
  loginRequest,

  /* Request Forgot Password */
  forgotPasswordSuccess,
  forgotPasswordFailure,
  checkValidforgotPassSuccess,
  checkValidforgotPassFailure,

  /* Check Valid Forgot Password */
} from "../reducer/AuthReducer";
import showErrorAlert from "../../utils/helpers/Toast";
import { getApi, postApi } from "../../utils/helpers/ApiRequest";
import { goBack, navigate } from "../../utils/helpers/RootNavigation";

let getItem = (state) => state.AuthReducer;
let token = "";

/* Login */
export function* loginSaga(action) {
  let header = {
    Accept: "application/json",
    contenttype: "multipart/form-data",
  };
  try {
    console.log("Login Saga --- ", action.payload);
    let response = yield call(postApi, "auth/login", action.payload, header);

    if (response?.status == 200) {
      yield call(AsyncStorage.setItem, constants.TOKEN, response?.data?.data?.access_token);
      yield put(
        setUserToken({
          token: response?.data?.data?.access_token,
          user_id: 0,
        })
      );
      yield put(
        loginSuccess({
          data: action.payload,
          token: response?.data?.data?.access_token,
        })
      );
      showErrorAlert(response.data.message);
    } else {
      yield put(loginFailure(response?.data));
      showErrorAlert(response.data.message);
    }
  } catch (error) {
    console.log("error -- ", error);
    yield put(loginFailure(error?.response?.data));
    if (error?.response?.data?.errors[0] == "Email is not verified") {
      showErrorAlert(error?.response?.data?.errors[0]);
      navigate("Verification", {
        data: action?.payload,
        type: "",
      });
    } else {
      showErrorAlert(error?.response?.data?.errors[0]);
    }
  }
}

/* Check Email Exits */
export function* checkEmailExitSaga(action) {
  let header = {
    Accept: "application/json",
    contenttype: "application/json",
  };

  try {
    let response = yield call(postApi, "user/emailExists", action?.payload, header);

    if (response?.status == 200) {
      yield put(checkEmailExitSuccess(response?.data?.response?.dataset));
    } else {
      yield put(checkEmailExitFailure(response?.data));
    }
  } catch (error) {
    console.log("error -- ", error);
    yield put(checkEmailExitFailure({}));
    // showErrorAlert(error?.response?.data?.message);
  }
}

/* SignUp */
export function* signupSaga(action) {
  let header = {
    Accept: "application/json",
    contenttype: "multipart/form-data",
  };
  try {
    let response = yield call(postApi, "auth/user/register", action?.payload, header);

    if (response?.status == 200) {
      yield put(signupSuccess(action?.payload));
      showErrorAlert("Please verify your email"); //response.data.message
      navigate("Verification", {
        data: action?.payload,
        type: "",
      });
    } else {
      yield put(signupFailure(response?.data));
      showErrorAlert(response.data.message);
    }
  } catch (error) {
    yield put(signupFailure(error));
    showErrorAlert(error?.response?.data?.errors[0]);
  }
}

/* Otp Verification */
export function* otpVerifySaga(action) {
  let header = {
    Accept: "application/json",
    contenttype: "multipart/form-data",
  };
  try {
    let response = yield call(postApi, "auth/user/verify-email", action?.payload?.data, header);

    if (response?.status == 200) {
      yield put(otpVerifySuccess(action?.payload));
      showErrorAlert(response.data.message);

      let l = action?.payload?.obj;
      let fromdata = new FormData();
      fromdata.append("username", l?.email ? l?.email.toLocaleLowerCase().trim() : l?.username.toLocaleLowerCase().trim());
      fromdata.append("password", l?.password);

      yield put(loginRequest(fromdata));
    } else {
      yield put(otpVerifyFailure(response?.data));
      showErrorAlert(response.data.message);
    }
  } catch (error) {
    yield put(otpVerifyFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}

/* Resend otp */
export function* resendOtpSaga(action) {
  let header = {
    Accept: "application/json",
    contenttype: "multipart/form-data",
  };
  try {
    let response = yield call(postApi, "auth/user/resend-email-otp", action?.payload, header);

    if (response?.status == 200) {
      yield put(resendOtpSuccess(action?.payload));
      showErrorAlert(response.data.message);
    } else {
      yield put(resendOtpFailure(response?.data));
      showErrorAlert(response.data.message);
    }
  } catch (error) {
    yield put(resendOtpFailure(error));
    showErrorAlert(error?.response?.data?.errors[0]);
  }
}

/* Logout */
export function* logoutSaga() {
  try {
    yield call(AsyncStorage.removeItem, constants.TOKEN);
    yield call(AsyncStorage.removeItem, constants.CART_ID);
    yield put(
      setUserToken({
        token: null,
        user_id: null,
      })
    );
    yield put(logoutSuccess("logout"));
    showErrorAlert("Logout Successful");
  } catch (error) {
    console.log(error);
    yield put(logoutFailure(error));
    showErrorAlert("Logout Failer");
  }
}

/* Request Forgot Password */
export function* forgotPasswordSaga(action) {
  let header = {
    Accept: "application/json",
    contenttype: "multipart/form-data",
  };
  try {
    let response = yield call(postApi, "auth/forgot-password/send-otp", action?.payload?.data, header);

    if (response?.status == 200) {
      yield put(forgotPasswordSuccess(action?.payload?.data));
      showErrorAlert(response.data.message);

      if (action?.payload?.type == "request") {
        navigate("Verification", {
          data: action?.payload?.data,
          type: "fp",
        });
      }
    } else {
      yield put(forgotPasswordFailure(response?.data));
      showErrorAlert(response.data.message);
    }
  } catch (error) {
    yield put(forgotPasswordFailure(error));
    showErrorAlert(error?.response?.data?.errors[0]);
  }
}

/* Check Valid Forgot Password */
export function* checkValidforgotPassSaga(action) {
  let header = {
    Accept: "application/json",
    contenttype: "multipart/form-data",
  };
  try {
    let response = yield call(postApi, "auth/forgot-password/validate-otp", action?.payload, header);

    if (response?.status == 200) {
      yield put(checkValidforgotPassSuccess(action?.payload));
      showErrorAlert(response.data.message);

      navigate("ChangePassword", {
        data: action?.payload,
      });
    } else {
      yield put(checkValidforgotPassFailure(response?.data));
      showErrorAlert(response.data.message);
    }
  } catch (error) {
    yield put(checkValidforgotPassFailure(error));
    showErrorAlert(error?.response?.data?.errors[0]);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest("Auth/loginRequest", loginSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/checkEmailExitRequest", checkEmailExitSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/signupRequest", signupSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/otpVerifyRequest", otpVerifySaga);
  })(),
  (function* () {
    yield takeLatest("Auth/resendOtpRequest", resendOtpSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/logoutRequest", logoutSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/forgotPasswordRequest", forgotPasswordSaga);
  })(),
  (function* () {
    yield takeLatest("Auth/checkValidforgotPassRequest", checkValidforgotPassSaga);
  })(),
];

export default watchFunction;
