import {createAsyncThunk} from '@reduxjs/toolkit';
import {Photo, PhotoMutation} from '../../types';
import axiosApi from "../../axios.ts";
import {RootState} from "../store.ts";

export const getGallery = createAsyncThunk<Photo[], undefined, { state: RootState }>(
  'gallery/get',
  async (_, {getState}) => {
    const user = getState().users.user;
    try {
      const response = await axiosApi.get<Photo[]>('/gallery', {
        headers: {Authorization: user?.token},
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Not Authorized');
    }
  });

export const getAuthorGallery = createAsyncThunk<Photo[], string>(
  'gallery/getAuthor',
  async (id) => {
    try {
      const response = await axiosApi.get<Photo[]>(`/gallery?author=${id}`);
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
