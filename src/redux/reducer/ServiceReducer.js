import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  getAllServiceCateRes: {},
  getServiceCategoryRes: {},
  getServiceSubCategoryRes: {},
  getAllServicesRes: {},
  getServiceDetails: {},
  addCart: {},
  cartId: '',
  addToCart: {},
  getCartItemsRes: {},
  removeCartItemRes: {},
  addWishlist: {},
  getAllWishlist: {},
};

const ProductSlice = createSlice({
  name: 'Service',
  initialState,
  reducers: {
    /* Get All Service Category */
    getAllServiceCateRequest(state, action) {
      state.status = action.type;
      state.getAllServiceCateRes = {};
    },
    getAllServiceCateSuccess(state, action) {
      state.getAllServiceCateRes = action.payload;
      state.status = action.type;
    },
    getAllServiceCateFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get Service Category */
    getServiceCategoryRequest(state, action) {
      state.status = action.type;
    },
    getServiceCategorySuccess(state, action) {
      state.getServiceCategoryRes = action.payload;
      state.status = action.type;
    },
    getServiceCategoryFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get Service Sub Category */
    getServiceSubCategoryRequest(state, action) {
      state.status = action.type;
    },
    getServiceSubCategorySuccess(state, action) {
      state.getServiceSubCategoryRes = action.payload;
      state.status = action.type;
    },
    getServiceSubCategoryFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get All Service */
    getAllServicesRequest(state, action) {
      state.status = action.type;
    },
    getAllServicesSuccess(state, action) {
      state.getAllServicesRes = action.payload;
      state.status = action.type;
    },
    getAllServicesFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get Service Details */
    getServiceDetailsRequest(state, action) {
      state.status = action.type;
    },
    getServiceDetailsSuccess(state, action) {
      state.getServiceDetails = action.payload;
      state.status = action.type;
    },
    getServiceDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Add Cart Service */
    addCartService(state, action) {
      state.addCart = action.payload;
      state.status = action.type;
    },

    /* Get Cart Id */
    getCartId(state, action) {
      state.cartId = action.payload;
      state.status = action.type;
    },

    /* Add To Cart Service */
    addToCartServiceRequest(state, action) {
      state.status = action.type;
    },
    addToCartServiceSuccess(state, action) {
      state.addToCart = action.payload;
      state.status = action.type;
    },
    addToCartServiceFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get Cart Items */
    getCartItemsRequest(state, action) {
      state.status = action.type;
    },
    getCartItemsSuccess(state, action) {
      state.getCartItemsRes = action.payload;
      state.status = action.type;
    },
    getCartItemsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Remove Cart Items */
    removeCartItemsRequest(state, action) {
      state.status = action.type;
    },
    removeCartItemsSuccess(state, action) {
      state.removeCartItemRes = action.payload;
      state.status = action.type;
    },
    removeCartItemsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Add Wishlist */
    addServiceWishlistRequest(state, action) {
      state.status = action.type;
    },
    addServiceWishlistSuccess(state, action) {
      state.addWishlist = action.payload;
      state.status = action.type;
    },
    addServiceWishlistFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get all Wishlist Service*/
    getAllServiceWishlistRequest(state, action) {
      state.status = action.type;
    },
    getAllServiceWishlistSuccess(state, action) {
      state.getAllWishlist = action.payload;
      state.status = action.type;
    },
    getAllServiceWishlistFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  /* Get All Service Category */
  getAllServiceCateRequest,
  getAllServiceCateSuccess,
  getAllServiceCateFailure,

  /* Get Service Category */
  getServiceCategoryRequest,
  getServiceCategorySuccess,
  getServiceCategoryFailure,

  /* Get Service Sub Category */
  getServiceSubCategoryRequest,
  getServiceSubCategorySuccess,
  getServiceSubCategoryFailure,

  /* Get All Service */
  getAllServicesRequest,
  getAllServicesSuccess,
  getAllServicesFailure,

  /* Get Service Details */
  getServiceDetailsRequest,
  getServiceDetailsSuccess,
  getServiceDetailsFailure,

  /* Add Cart Service */
  addCartService,

  /* Add To Cart Service */
  addToCartServiceRequest,
  addToCartServiceSuccess,
  addToCartServiceFailure,

  /* Get Cart Items */
  getCartItemsRequest,
  getCartItemsSuccess,
  getCartItemsFailure,

  /* Remove Cart Items */
  removeCartItemsRequest,
  removeCartItemsSuccess,
  removeCartItemsFailure,

  /* Get Cart Id */
  getCartId,

  /* Add Wishlist */
  addServiceWishlistRequest,
  addServiceWishlistSuccess,
  addServiceWishlistFailure,

  /* Get all Wishlist Service*/
  getAllServiceWishlistRequest,
  getAllServiceWishlistSuccess,
  getAllServiceWishlistFailure,
} = ProductSlice.actions;

export default ProductSlice.reducer;
