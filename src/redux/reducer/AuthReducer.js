import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  isStart: null,
  token: null,
  proToken: null,
  user_id: null,
  initialTab: false,
  loginRes: {},
  signupRes: {},
  logoutRes: {},
  emailExitsRes: {},
  otpVerifyRes: {},
  resendOtpRes: {},
  forgotPasswordRes: {},
  validForgotPassRes: {},
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    /* onStart */
    setStart(state, action) {
      state.isLoading = false;
      state.isStart = action.payload;
      state.status = action.type;
    },

    /* Token */
    setUserToken(state, action) {
      state.isLoading = false;
      state.isStart = '1';
      state.token = action.payload?.token;
      state.user_id = action.payload?.user_id;
      state.status = action.type;
    },

    /* Booking Details Tab */
    setCurrentTab(state, action) {
      state.initialTab = action.payload;
    },

    /* Login */
    loginRequest(state, action) {
      state.status = action.type;
    },
    loginSuccess(state, action) {
      state.loginRes = action.payload.data;
      state.proToken = action.payload.token;
      state.status = action.type;
    },
    loginFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Check Email Exits */
    checkEmailExitRequest(state, action) {
      state.status = action.type;
    },
    checkEmailExitSuccess(state, action) {
      state.emailExitsRes = action.payload;
      state.status = action.type;
    },
    checkEmailExitFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Sign Up */
    signupRequest(state, action) {
      state.status = action.type;
    },
    signupSuccess(state, action) {
      state.signupRes = action.payload;
      state.status = action.type;
    },
    signupFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Otp Verification */
    otpVerifyRequest(state, action) {
      state.status = action.type;
    },
    otpVerifySuccess(state, action) {
      state.otpVerifyRes = action.payload;
      state.status = action.type;
    },
    otpVerifyFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Resend otp */
    resendOtpRequest(state, action) {
      state.status = action.type;
    },
    resendOtpSuccess(state, action) {
      state.resendOtpRes = action.payload;
      state.status = action.type;
    },
    resendOtpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Logout */
    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.logoutRes = action.payload;
      state.status = action.type;
    },
    logoutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Request Forgot Password */
    forgotPasswordRequest(state, action) {
      state.status = action.type;
    },
    forgotPasswordSuccess(state, action) {
      state.forgotPasswordRes = action.payload;
      state.status = action.type;
    },
    forgotPasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Check Valid Forgot Password */
    checkValidforgotPassRequest(state, action) {
      state.status = action.type;
    },
    checkValidforgotPassSuccess(state, action) {
      state.validForgotPassRes = action.payload;
      state.status = action.type;
    },
    checkValidforgotPassFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  /* onStart */
  setStart,

  /* Token */
  setUserToken,

  /* Booking Details Tab */
  setCurrentTab,

  /* Login */
  loginRequest,
  loginSuccess,
  loginFailure,

  /* Check Email Exits */
  checkEmailExitRequest,
  checkEmailExitSuccess,
  checkEmailExitFailure,

  /* Sign Up */
  signupFailure,
  signupSuccess,
  signupRequest,

  /* Otp Verification */
  otpVerifyRequest,
  otpVerifySuccess,
  otpVerifyFailure,

  /* Resend otp */
  resendOtpRequest,
  resendOtpSuccess,
  resendOtpFailure,

  /* Logout */
  logoutRequest,
  logoutSuccess,
  logoutFailure,

  /* Request Forgot Password */
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  /* Check Valid Forgot Password */
  checkValidforgotPassRequest,
  checkValidforgotPassSuccess,
  checkValidforgotPassFailure,
} = AuthSlice.actions;

export default AuthSlice.reducer;
