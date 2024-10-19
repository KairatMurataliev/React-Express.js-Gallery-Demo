import {createSlice} from '@reduxjs/toolkit';
import {Category} from '../../types';
import {RootState} from '../store.ts';
import {getCategoriesList} from "./categoryThunk.ts";

interface GalleryState {
  list: Category[];
  fetchLoading: boolean;
  submitLoading: boolean;
  removeLoading: boolean;
}

const initialState: GalleryState = {
  list: [],
  fetchLoading: false,
  submitLoading: false,
  removeLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // // Submit photo
    // builder.addCase(submitPhoto.pending, (state) => {
    //   state.submitLoading = true;
    // });
    // builder.addCase(submitPhoto.fulfilled, (state) => {
    //   state.submitLoading = false;
    // });
    // builder.addCase(submitPhoto.rejected, (state) => {
    //   state.submitLoading = false;
    // });

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
export const fetchLoading = (state: RootState) => state.categories.fetchLoading;
export const submitLoading = (state: RootState) => state.categories.submitLoading;
export const selectRemoveLoading = (state: RootState) => state.categories.removeLoading;
