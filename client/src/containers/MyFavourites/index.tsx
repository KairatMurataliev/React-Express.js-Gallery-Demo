import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../store/store-hooks.ts";
import {selectGalleryList} from "../../store/gallery/gallerySlice.ts";
import {useEffect} from "react";
import {CategoriesFilters} from "../Gallery/components/CategoriesFilters.tsx";
import Grid from "@mui/material/Grid2";
import PhotoItem from "../Gallery/components/PhotoItem.tsx";
import {useCategories} from "../../hooks/useCategories.ts";
import {useGallery} from "../../hooks/useGallery.ts";
import {getFavourites} from "../../store/gallery/galleryThunk.ts";
import {toggleFavourite} from "../../store/users/usersThunk.ts";

export const MyFavourites = () => {
  const [searchParams,] = useSearchParams( );
  const photos = useAppSelector(selectGalleryList);

  const { categoriesList, selectedCategory, onCategorySelect } = useCategories();

  const {user, dispatch, handleOpen } = useGallery();

  useEffect(() => {
    dispatch(getFavourites({ category: selectedCategory }));
  }, [dispatch, searchParams, selectedCategory]);

  const onFavouriteHandler = async (id: string) => {
    dispatch(toggleFavourite(id));
    dispatch(getFavourites({ category: selectedCategory }));
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
            handleOpen={() => handleOpen(photo.id)}
            onFavouriteHandler={() => onFavouriteHandler(photo.id)}
            user={user}
          />
        ))}
      </Grid>
    </div>
  )
};