import axios from "./Axios";

export const checkAccount = (data) => {
  return axios.post("auth/check-account", data);
};

export const getCartData = (cartId) => {
  return axios.get(`cart?cart_id=${cartId}`);
};

export const getUserData = () => {
  return axios.get("user/profile");
};

export const createCart = (data) => {
  return axios.post("cart/auth/add", data);
};

export const updateCart = (data, cartId) => {
  return axios.post(`cart/${cartId}/update`, data);
};

export const removeCartItem = (cartId, itemId) => {
  return axios.post(`cart/${cartId}/items/${itemId}/remove`);
};

export const getServiceDetails = (serviceId) => {
  return axios.get(`services/${serviceId}`);
};

export const createOrder = (data) => {
  return axios.post("orders", data);
};

export const createPaymentIntent = (orderId) => {
  return axios.post(`orders/${orderId}/payment-intent`);
};

export const getServiceSlots = (serviceId, dayId) => {
  return axios.get(`services/${serviceId}/slots/${dayId}`);
};

export const updateServiceItemSlot = (cartId, cartItemId, data) => {
  return axios.post(`cart/${cartId}/service/${cartItemId}/slot`, data);
};

export const confirmStripePayment = (data) => {
  return axios.post("orders/confirm", data);
};

export const setDeviceToken = (data) => {
  return axios.post("user/device-token", data);
};
