import {useParams} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {getAuthorGallery, getGallery, removePhoto} from "../../store/gallery/galleryThunk.ts";
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
    dispatch,
    handleOpen,
    handleClose,
    handleLike
  } = useGallery(id || undefined);
  const { submitOpen, handleOpenModal } = usePhotoSubmit();

  const onPhotoRemove = async (photoId: string) => {
    await dispatch(removePhoto(photoId));
    if (id) {
      dispatch(getAuthorGallery(id));
    } else {
      await dispatch(getGallery());
    }
  };

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
              onClick={handleOpenModal}
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
              key={photo.id}
              item={photo}
              role={user?.role}
              handleRemovePhoto={() => onPhotoRemove(photo.id)}
              handleOpen={() => handleOpen(photo.id)}
              userId={user?.id}
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

        <SubmitNewPhoto open={submitOpen} handleOpenModal={handleOpenModal}/>
      </div>
    )
  );
};

export default Gallery;