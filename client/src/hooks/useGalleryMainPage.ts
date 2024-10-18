import {useEffect, useState} from "react";
import {Photo} from "../types";
import {useAppDispatch, useAppSelector} from "../store/store-hooks.ts";
import {selectUser} from "../store/users/usersSlice.ts";
import {getAuthorGallery, getGallery} from "../store/gallery/galleryThunk.ts";
import {fetchLoading, selectGalleryList, selectRemoveLoading} from "../store/gallery/gallerySlice.ts";

export const useGalleryMainPage = (id?: string) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const dispatch = useAppDispatch();
  const photosList = useAppSelector(selectGalleryList);
  const loading = useAppSelector(fetchLoading);
  const removeLoading = useAppSelector(selectRemoveLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(getAuthorGallery(id));
    } else {
      dispatch(getGallery());
    }
  }, [dispatch, id]);

  return {
    open,
    setOpen,
    selectedPhoto,
    setSelectedPhoto,

    photosList,
    loading,
    removeLoading,
    user,
    dispatch
  }
}