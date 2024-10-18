import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from './store/store.ts';

export const baseURL = 'http://localhost:8000';

const axiosApi = axios.create({
  baseURL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    return config;
  });
};

export default axiosApi;
