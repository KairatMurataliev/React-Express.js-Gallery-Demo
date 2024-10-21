import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from "../../axios.ts";
import {Category} from "../../types";

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
)