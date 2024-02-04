import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  productCategoryRes: {},
  trendingProductRes: {},
  productByCategoryRes: {},
  productDetailsRes: {},
  addProduct: {},
  productCartId: '',
  addToCartProduct: {},
  getCartProductItemsRes: {},
  removeCartProductItemRes: {},
};

const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    /* Get Product Category */
    getProductCategoryRequest(state, action) {
      state.status = action.type;
      state.productCategoryRes = {};
    },
    getProductCategorySuccess(state, action) {
      state.productCategoryRes = action.payload;
      state.status = action.type;
    },
    getProductCategoryFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get Trending Product */
    getTrendingProductRequest(state, action) {
      state.status = action.type;
    },
    getTrendingProductSuccess(state, action) {
      state.trendingProductRes = action.payload;
      state.status = action.type;
    },
    getTrendingProductFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get Product By Category */
    getProductByCategoryRequest(state, action) {
      state.status = action.type;
    },
    getProductByCategorySuccess(state, action) {
      state.productByCategoryRes = action.payload;
      state.status = action.type;
    },
    getProductByCategoryFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get Product Details */
    getProductDetailsRequest(state, action) {
      state.status = action.type;
    },
    getProductDetailsSuccess(state, action) {
      state.productDetailsRes = action.payload;
      state.status = action.type;
    },
    getProductDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Add Cart Product */
    addCartProduct(state, action) {
      state.addProduct = action.payload;
      state.status = action.type;
    },

    /* Get Cart Product Id */
    getCartProductId(state, action) {
      state.productCartId = action.payload;
      state.status = action.type;
    },

    /* Add To Cart Product */
    addToCartProductRequest(state, action) {
      state.status = action.type;
    },
    addToCartProductSuccess(state, action) {
      state.addToCartProduct = action.payload;
      state.status = action.type;
    },
    addToCartProductFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Get Cart Product Items */
    getCartProductItemsRequest(state, action) {
      state.status = action.type;
    },
    getCartProductItemsSuccess(state, action) {
      state.getCartProductItemsRes = action.payload;
      state.status = action.type;
    },
    getCartProductItemsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Remove Cart Items */
    removeCartProductItemsRequest(state, action) {
      state.status = action.type;
    },
    removeCartProductItemsSuccess(state, action) {
      state.removeCartProductItemRes = action.payload;
      state.status = action.type;
    },
    removeCartProductItemsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  /* Get Product Category */
  getProductCategoryRequest,
  getProductCategorySuccess,
  getProductCategoryFailure,

  /* Get Trending Product */
  getTrendingProductRequest,
  getTrendingProductSuccess,
  getTrendingProductFailure,

  /* Get Product By Category */
  getProductByCategoryRequest,
  getProductByCategorySuccess,
  getProductByCategoryFailure,

  /* Get Product Details */
  getProductDetailsRequest,
  getProductDetailsSuccess,
  getProductDetailsFailure,

  /* Add Cart Product */
  addCartProduct,

  /* Get Cart Product Id */
  getCartProductId,

  /* Add To Cart Product */
  addToCartProductRequest,
  addToCartProductSuccess,
  addToCartProductFailure,

  /* Get Cart Product Items */
  getCartProductItemsRequest,
  getCartProductItemsSuccess,
  getCartProductItemsFailure,

  /* Remove Cart Items */
  removeCartProductItemsRequest,
  removeCartProductItemsSuccess,
  removeCartProductItemsFailure,
} = ProductSlice.actions;

export default ProductSlice.reducer;
