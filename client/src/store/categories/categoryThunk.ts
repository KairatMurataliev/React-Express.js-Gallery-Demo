import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from "../../axios.ts";
import {Category} from "../../types";
import {RootState} from "../store.ts";

export const getCategoriesList = createAsyncThunk<Category[], undefined>(
  '/categories',
  async (_) => {
    try {
      const response = await axiosApi.get<Category[]>('/categories');
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Not Authorized');
    }
  }
);

export const removeCategory = createAsyncThunk<void, string, { state: RootState }>(
  '/categories/remove',
  async (id, { getState }) => {
    try {
      const user = getState().users.user;
      if (user) {
        try {
          await axiosApi.delete(`/categories/admin/remove/${id}`, { headers: {Authorization: user.token} });
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);