import {useEffect, useState} from "react";
import {Photo} from "../types";
import {useAppDispatch, useAppSelector} from "../store/store-hooks.ts";
import {selectUser} from "../store/users/usersSlice.ts";
import {getAuthorGallery, getGallery} from "../store/gallery/galleryThunk.ts";
import {fetchLoading, selectGalleryList, selectRemoveLoading} from "../store/gallery/gallerySlice.ts";
import {usePhotoSubmit} from "./usePhotoSubmit.ts";

export const useGallery = (id?: string) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const photosList = useAppSelector(selectGalleryList);
  const galleryLoading = useAppSelector(fetchLoading);
  const removeLoading = useAppSelector(selectRemoveLoading);
  const user = useAppSelector(selectUser);

  const {submitOpen} = usePhotoSubmit();

  useEffect(() => {
    if (id) {
      dispatch(getAuthorGallery(id));
    } else {
      dispatch(getGallery());
    }
  }, [dispatch, id, submitOpen]);

  const handleOpen = (id: string) => {
    setOpen(true);
    const selected = photosList.find(({id: itemId}) => itemId === id);
    if (selected) setSelectedPhoto(selected);
  };

  const handleClose = () => setOpen(prev => !prev);

  const handleLike = (id: string) => {
    console.log(id, 'PHOTO  ID');
  }

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
    handleLike
  }
}