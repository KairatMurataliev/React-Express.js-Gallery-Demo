import {createAsyncThunk} from '@reduxjs/toolkit';
import {Photo, PhotoMutation, Filters} from '../../types';
import axiosApi from "../../axios.ts";
import {RootState} from "../store.ts";

export const getGallery = createAsyncThunk<Photo[], Filters>(
  'gallery/get',
  async (filters) => {
    try {
      let url = '/gallery';
      if (filters.category) {
        url = `${url}?category=${filters.category}`;
      }
      const response = await axiosApi.get<Photo[]>(url);
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Not Authorized');
    }
  });

export const getAuthorGallery = createAsyncThunk<Photo[], { id: string, filters: Filters }>(
  'gallery/getAuthor',
  async ({ id, filters }) => {
    try {
      let url = `/gallery?author=${id}`;
      if (filters.category) {
        url = `${url}&category=${filters.category}`;
      }

      const response = await axiosApi.get<Photo[]>(url);
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Not Authorized');
    }
  });

export const submitPhoto = createAsyncThunk<void, PhotoMutation, { state: RootState }>(
  'gallery/submit',
  async (photo, {getState}) => {
    const user = getState().users.user;
    const formData = new FormData();

    const keys = Object.keys(photo) as (keyof PhotoMutation)[];
    keys.forEach((key) => {
      let value = photo[key];
      if (value !== null) {
        if (Array.isArray(value)) {
          value = JSON.stringify(value);
        }
        formData.append(key, value);
      }
    });
    if (user) {
      await axiosApi.post('/gallery/submit', formData, { headers: {Authorization: user.token} });
    }
  });

export const removePhoto = createAsyncThunk<void, string, { state: RootState }>(
  'gallery/remove',
  async (id, {getState}) => {
    const user = getState().users.user;
    if (user) {
      try {
        await axiosApi.delete(`/gallery/remove/${id}`, { headers: {Authorization: user.token} });
      } catch (err) {
        console.log(err);
        throw new Error('Remove photo error.');
      }
    }
  });

export const getAdminGallery = createAsyncThunk<Photo[], boolean, { state: RootState }>(
  'gallery/admin/get',
  async (isPublished, { getState }) => {
    try {
      const user = getState().users.user;
      if (user) {
        const response = await axiosApi.get<Photo[]>(`/gallery/admin/get?published=${isPublished}`, { headers: {Authorization: user.token} });
        return response.data;
      }
      return [];
    } catch (err) {
      console.log(err);
      throw new Error('Not Authorized');
    }
  });
