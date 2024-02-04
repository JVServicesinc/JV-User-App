import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isWarningShown: false,
    currentLocation: {},
    userData: {},
    cartId: '',
    cartData: {},
    isFetching: false,
    showLocationDisabledModal: false
  },
  reducers: {
    setWarningShownStatus: (state, action) => {
      state.isWarningShown = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = {...action.payload};
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    globalLogout: (state, action) => {
      state.cartData = {};
      state.cartId = '';
      state.currentLocation = {};
      state.userData = {};
    },
    setShowLocationDisabledModal: (state, action) => {
      state.showLocationDisabledModal = action.payload;
    }
  },
});

export const {
  setWarningShownStatus,
  setUserData,
  setCartId,
  setCartData,
  setIsFetching,
  globalLogout,
  setShowLocationDisabledModal
} = globalSlice.actions;
