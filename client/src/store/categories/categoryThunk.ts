import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import axiosApi from "../../axios.ts";
import {Category} from "../../types";

export const getCategoriesList = createAsyncThunk<Category[], undefined, { state: RootState }>(
  '/categories',
  async (_, { getState }) => {
    const user = getState().users.user;
    try {
      const response = await axiosApi.get<Category[]>('/categories', {
        headers: {Authorization: user?.token},
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Not Authorized');
    }
  }
)