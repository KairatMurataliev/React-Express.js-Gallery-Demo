import {useParams} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {useGallery} from "../../hooks/useGallery.ts";
import {useCategories} from "../../hooks/useCategories.ts";
import {PhotoModal} from "./components/PhotoModal.tsx";
import PhotoItem from "./components/PhotoItem.tsx";
import Grid from "@mui/material/Grid2";
import {CategoriesFilters} from "./components/CategoriesFilters.tsx";
import {Button} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SubmitNewPhoto from "./components/SubmitNewPhoto.tsx";
import {usePhotoSubmit} from "../../hooks/usePhotoSubmit.ts";
import {toggleFavourite} from "../../store/users/usersThunk.ts";

const Gallery = () => {
  const {id} = useParams() as { id: string };
  const {
    categoriesList,
    selectedCategory,
    onCategorySelect,
  } = useCategories();

  const {
    open,
    selectedPhoto,
    photosList,
    galleryLoading,
    removeLoading,
    user,
    handleOpen,
    handleClose,
    handleLike,
    onPhotoRemove,
    dispatch,
  } = useGallery(id, selectedCategory);
  const { submitOpen, handleToggleModal } = usePhotoSubmit();

  const onFavouriteHandler = async (id: string) => {
    dispatch(toggleFavourite(id));
  }

  return (
    galleryLoading ? <Spinner/> : (
      <div style={{marginBottom: '30px'}}>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
          <CategoriesFilters
            categoriesList={categoriesList}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
          />

          {user && (
            <Button
              onClick={handleToggleModal}
              variant="contained"
              startIcon={<AddCircleIcon/>}
            >
              Submit New Photo
            </Button>
          )}
        </div>

        <Grid container spacing={2}>
          {photosList.map(photo => (
            <PhotoItem
              isFavourite={!!user?.favourites.includes(photo.id)}
              key={photo.id}
              item={photo}
              role={user?.role}
              onFavouriteHandler={() => onFavouriteHandler(photo.id)}
              handleRemovePhoto={() => onPhotoRemove(photo.id)}
              handleOpen={() => handleOpen(photo.id)}
              user={user}
              removeLoading={removeLoading}
            />
          ))}
        </Grid>

        {selectedPhoto && open && (
          <PhotoModal
            open={open}
            selectedPhoto={selectedPhoto}
            handleClose={handleClose}
            handleLike={handleLike}
          />
        )}

        <SubmitNewPhoto open={submitOpen} handleToggleModal={handleToggleModal}/>
      </div>
    )
  );
};

export default Gallery;