import axios from 'axios';
import Store from '../redux/Store';
import constants from '../utils/helpers/constants';

const axiosInstance = axios.create({
  baseURL: constants.BASE_URL,
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': 'multipart/form-data',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async config => {
  const state = Store.getState();
  const accessToken = state.AuthReducer.token;
  const newConfig = {...config};
  if (accessToken && newConfig.baseURL) {
    newConfig.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return newConfig;
});

axiosInstance.interceptors.response.use(
  response => response,
  error =>
    Promise.reject(
      (error?.message || '').includes('timeout') ||
        (error?.message || '').includes('Network Error')
        ? 'Please check your internet connection'
        : error,
    ),
);

export default axiosInstance;
