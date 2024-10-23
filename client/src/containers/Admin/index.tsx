import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../store/store-hooks.ts";
import {selectGalleryList} from "../../store/gallery/gallerySlice.ts";
import {useEffect} from "react";
import {getAdminGallery, togglePublish} from "../../store/gallery/galleryThunk.ts";
import {CategoriesFilters} from "../Gallery/components/CategoriesFilters.tsx";
import Grid from "@mui/material/Grid2";
import PhotoItem from "../Gallery/components/PhotoItem.tsx";
import {useCategories} from "../../hooks/useCategories.ts";
import {useGallery} from "../../hooks/useGallery.ts";

export const AdminPanel = () => {
  const [searchParams,] = useSearchParams( );
  const photos = useAppSelector(selectGalleryList);

  const { categoriesList, selectedCategory, onCategorySelect } = useCategories();

  const {
    removeLoading,
    user,
    dispatch,
    handleOpen,
    onPhotoRemove,
  } = useGallery();

  useEffect(() => {
    const isPublished: string | null = searchParams.get('published');
    dispatch(getAdminGallery({ isPublished, filters: { category: selectedCategory }}));
  }, [dispatch, searchParams, selectedCategory]);


  const togglePublishPhoto = async (id: string) => {
    const isPublished: string | null = searchParams.get('published');
    await dispatch(togglePublish(id));
    dispatch(getAdminGallery({ isPublished, filters: { category: selectedCategory }}));
  }

  return (
    <div style={{marginBottom: '30px'}}>

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
        <CategoriesFilters
          categoriesList={categoriesList}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />
      </div>

      <Grid container spacing={2}>
        {photos.map(photo => (
          <PhotoItem
            key={photo.id}
            item={photo}
            role={user?.role}
            handleRemovePhoto={() => onPhotoRemove(photo.id)}
            handleOpen={() => handleOpen(photo.id)}
            togglePublishPhoto={() => togglePublishPhoto(photo.id)}
            userId={user?.id}
            removeLoading={removeLoading}
          />
        ))}
      </Grid>
    </div>
  )
};