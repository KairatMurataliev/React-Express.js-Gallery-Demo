import {createSlice} from '@reduxjs/toolkit';
import {Photo} from '../../types';
import {RootState} from '../store.ts';
import {submitPhoto, getGallery, getAuthorGallery, removePhoto} from "./galleryThunk";

interface GalleryState {
  list: Photo[];
  onePhoto: Photo | null;
  fetchLoading: boolean;
  submitLoading: boolean;
  removeLoading: boolean;
  openSubmitPhoto: boolean;
}

const initialState: GalleryState = {
  list: [],
  onePhoto: null,
  fetchLoading: false,
  submitLoading: false,
  removeLoading: false,
  openSubmitPhoto: false,
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    submitModalOpen: (state) => {
      state.openSubmitPhoto = !state.openSubmitPhoto
    }
  },
  extraReducers: (builder) => {
    // Submit photo
    builder.addCase(submitPhoto.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(submitPhoto.fulfilled, (state) => {
      state.submitLoading = false;
    });
    builder.addCase(submitPhoto.rejected, (state) => {
      state.submitLoading = false;
    });

    // Get Gallery
    builder.addCase(getGallery.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(getGallery.fulfilled, (state, {payload: list}) => {
      state.fetchLoading = false;
      state.list = list;
    });
    builder.addCase(getGallery.rejected, (state) => {
      state.fetchLoading = false;
    });

    // Author photos get
    builder.addCase(getAuthorGallery.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(getAuthorGallery.fulfilled, (state, {payload: list}) => {
      state.fetchLoading = false;
      state.list = list;
    });
    builder.addCase(getAuthorGallery.rejected, (state) => {
      state.fetchLoading = false;
    });

    // Remove photo
    builder.addCase(removePhoto.pending, (state) => {
      state.removeLoading = true;
    });
    builder.addCase(removePhoto.fulfilled, (state) => {
      state.removeLoading = false;
    });
    builder.addCase(removePhoto.rejected, (state) => {
      state.removeLoading = false;
    });
  },
});

export const galleryReducer = gallerySlice.reducer;

export const selectGalleryList = (state: RootState) => state.gallery.list;
export const fetchLoading = (state: RootState) => state.gallery.fetchLoading;
export const submitLoading = (state: RootState) => state.gallery.submitLoading;
export const selectRemoveLoading = (state: RootState) => state.gallery.removeLoading;
export const selectOpenSubmitPhoto = (state: RootState) => state.gallery.openSubmitPhoto;
export const { submitModalOpen } = gallerySlice.actions;
