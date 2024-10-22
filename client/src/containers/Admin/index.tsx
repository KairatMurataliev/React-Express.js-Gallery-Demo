import {useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store-hooks.ts";
import {selectGalleryList} from "../../store/gallery/gallerySlice.ts";
import {useEffect} from "react";
import {getAdminGallery} from "../../store/gallery/galleryThunk.ts";

export const AdminPanel = () => {
  const [searchParams,] = useSearchParams( );
  const dispatch = useAppDispatch();

  const photos = useAppSelector(selectGalleryList);

  useEffect(() => {
    const isPublished: boolean = Boolean(searchParams.get('published'));
    dispatch(getAdminGallery(isPublished));
  }, [dispatch, searchParams]);

  console.log(photos);
  return (
    <div></div>
  )
};