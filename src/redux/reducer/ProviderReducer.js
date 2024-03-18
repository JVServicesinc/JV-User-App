import { createSlice } from "@reduxjs/toolkit";
// import constants from '../../utils/helpers/constants';
// import {getData} from '../LocalStore';

const initialState = {
  status: "",
  error: "",
  isSearchingProvider: true,
  providerSearchResults: {},
};

const LanguageSlice = createSlice({
  name: "Language",
  initialState,
  reducers: {
    /* Search All Providers for Selected Service */
    searchProvidersForServices(state, action) {
      // console.log("getAllServiceCateRequest --- ", action.type);
      state.isSearchingProvider = true;
      state.status = action.type;
      state.providerSearchResults = {};
    },
    searchProvidersForServicesSuccess(state, action) {
      // console.log("getAllServiceCateSuccess --- ", action.type);
      state.isSearchingProvider = false;
      state.providerSearchResults = action.payload;
      state.status = action.type;
    },
    searchProvidersForServicesFailure(state, action) {
      state.isSearchingProvider = false;
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  /* setLanguage */
  searchProvidersForServices,
  searchProvidersForServicesSuccess,
  searchProvidersForServicesFailure,
} = LanguageSlice.actions;

export default LanguageSlice.reducer;
