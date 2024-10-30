import {useEffect, useState} from "react";
import {Filters, Photo} from "../types";
import {useAppDispatch, useAppSelector} from "../store/store-hooks.ts";
import {selectUser} from "../store/users/usersSlice.ts";
import {getAuthorGallery, getGallery, removePhoto} from "../store/gallery/galleryThunk.ts";
import {fetchLoading, selectGalleryList, selectRemoveLoading} from "../store/gallery/gallerySlice.ts";
import {usePhotoSubmit} from "./usePhotoSubmit.ts";

export const useGallery = (id?: string, selectedCategory?: string) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const photosList = useAppSelector(selectGalleryList);
  const galleryLoading = useAppSelector(fetchLoading);
  const removeLoading = useAppSelector(selectRemoveLoading);
  const user = useAppSelector(selectUser);

  const {submitOpen} = usePhotoSubmit();

  useEffect(() => {
    const filters: Filters = { category: '' };
    if (selectedCategory) {
      filters.category = selectedCategory;
    }

    if (id) {
      dispatch(getAuthorGallery({id, filters}));
    } else {
      dispatch(getGallery(filters));
    }
  }, [dispatch, id, selectedCategory, submitOpen]);

  const handleOpen = (id: string) => {
    setOpen(true);
    const selected = photosList.find(({id: itemId}) => itemId === id);
    if (selected) setSelectedPhoto(selected);
  };

  const onPhotoRemove = async (photoId: string) => {
    await dispatch(removePhoto(photoId));
    if (id) {
      dispatch(getAuthorGallery({id, filters: { category: selectedCategory }}));
    } else {
      await dispatch(getGallery({ category: selectedCategory }));
    }
  };

  const handleClose = () => setOpen(prev => !prev);

  return {
    open,
    selectedPhoto,
    photosList,
    galleryLoading,
    removeLoading,
    user,
    setSelectedPhoto,
    setOpen,
    dispatch,
    handleOpen,
    handleClose,
    onPhotoRemove,
  }
}