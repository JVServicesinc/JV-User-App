import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  currentPosition: {},
  userInfo: {},
  editProfileRes: {},
  chnagePasswordRes: {},
  deleteAccountRes: {},
  addAddressRes: {},
  getAddressAllRes: {},
  updateAddressRes: {},
};

const AuthSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    /* Set User Current Position */
    setUserCurrentPosition(state, action) {
      state.currentPosition = action.payload;
      state.status = action.type;
    },

    /* User Informaition */
    getUserInfoRequest(state, action) {
      state.status = action.type;
    },
    getUserInfoSuccess(state, action) {
      state.userInfo = action.payload;
      state.status = action.type;
    },
    getUserInfoFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Update User Informaition */
    updateUserInfoRequest(state, action) {
      state.status = action.type;
    },
    updateUserInfoSuccess(state, action) {
      state.editProfileRes = action.payload;
      state.status = action.type;
    },
    updateUserInfoFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Update Password */
    updatePasswordRequest(state, action) {
      state.status = action.type;
    },
    updatePasswordSuccess(state, action) {
      state.chnagePasswordRes = action.payload;
      state.status = action.type;
    },
    updatePasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Delete Account */
    deleteAccountRequest(state, action) {
      state.status = action.type;
    },
    deleteAccountSuccess(state, action) {
      state.deleteAccountRes = action.payload;
      state.status = action.type;
    },
    deleteAccountFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Add Address */
    addAddressRequest(state, action) {
      state.status = action.type;
    },
    addAddressSuccess(state, action) {
      state.addAddressRes = action.payload;
      state.status = action.type;
    },
    addAddressFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Address */
    getAllAddressRequest(state, action) {
      state.status = action.type;
    },
    getAllAddressSuccess(state, action) {
      state.getAddressAllRes = action.payload;
      state.status = action.type;
    },
    getAllAddressFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Update Address */
    updateAddressRequest(state, action) {
      state.status = action.type;
    },
    updateAddressSuccess(state, action) {
      state.updateAddressRes = action.payload;
      state.status = action.type;
    },
    updateAddressFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  /* Set User Current Position */
  setUserCurrentPosition,

  /* User Informaition */
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,

  /* Update User Informaition */
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailure,

  /* Update Password */
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,

  /* Delete Account */
  deleteAccountRequest,
  deleteAccountSuccess,
  deleteAccountFailure,

  /* Add Address */
  addAddressRequest,
  addAddressSuccess,
  addAddressFailure,

  /* Address */
  getAllAddressRequest,
  getAllAddressSuccess,
  getAllAddressFailure,

  /* Update Address */
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,
} = AuthSlice.actions;

export default AuthSlice.reducer;
