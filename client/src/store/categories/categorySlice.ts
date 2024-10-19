import {createSlice} from '@reduxjs/toolkit';
import {Category} from '../../types';
import {RootState} from '../store.ts';
import {getCategoriesList} from "./categoryThunk.ts";

interface CategoryState {
  list: Category[];
  fetchLoading: boolean;
  createLoading: boolean;
  removeLoading: boolean;
}

const initialState: CategoryState = {
  list: [],
  fetchLoading: false,
  createLoading: false,
  removeLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get categories list
    builder.addCase(getCategoriesList.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(getCategoriesList.fulfilled, (state, {payload: list}) => {
      state.fetchLoading = false;
      state.list = list;
    });
    builder.addCase(getCategoriesList.rejected, (state) => {
      state.fetchLoading = false;
    });

    // Remove photo
    // builder.addCase(removePhoto.pending, (state) => {
    //   state.removeLoading = true;
    // });
    // builder.addCase(removePhoto.fulfilled, (state) => {
    //   state.removeLoading = false;
    // });
    // builder.addCase(removePhoto.rejected, (state) => {
    //   state.removeLoading = false;
    // });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategoriesList = (state: RootState) => state.categories.list;
export const selectFetchLoading = (state: RootState) => state.categories.fetchLoading;
export const createCategoryLoading = (state: RootState) => state.categories.createLoading;
export const removeCategoryLoading = (state: RootState) => state.categories.removeLoading;
