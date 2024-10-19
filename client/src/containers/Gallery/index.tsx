import {Button, Typography} from "@mui/material";
import {useParams, useLocation, NavLink} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {getAuthorGallery, getGallery, removePhoto} from "../../store/gallery/galleryThunk.ts";
import {useGallery} from "../../hooks/useGallery.ts";
import {PhotoModal} from "./components/PhotoModal.tsx";
import PhotoItem from "./components/PhotoItem.tsx";
import Grid from "@mui/material/Grid2";

const Gallery = () => {
  const {id} = useParams() as { id: string };
  const search = useLocation();
  const {open, selectedPhoto, photosList, loading, removeLoading, user, setOpen, setSelectedPhoto, dispatch, handleOpen, handleClose } = useGallery(id || undefined);

  const onPhotoRemove = async (photoId: string) => {
    await dispatch(removePhoto(photoId));
    if (id) {
      dispatch(getAuthorGallery(id));
    } else {
      await dispatch(getGallery());
    }
  };

  const {pathname} = search;
  return (
    loading ? <Spinner/> :
      <div style={{marginBottom: '30px'}}>
        {pathname && pathname.includes('my-gallery') && (
          <Button variant='contained' style={{marginBottom: '20px'}}>
            <NavLink to='/gallery/add' style={{textDecoration: 'none', color: '#fff'}}>
              Submit Photo
            </NavLink>
          </Button>
        )}
        <Typography variant="h4" component="div" style={{marginBottom: '20px'}}>
          {
            pathname && pathname.includes('my-gallery') ?
              'My Gallery:' :
              pathname && pathname.includes('gallery') ?
                `${photosList[0]?.author.username}'s  Gallery:` :
                'Gallery:'
          }
        </Typography>
        <Grid container spacing={2}>
          {photosList.map(photo => {
            return (
              <PhotoItem
                key={photo.id}
                title={photo.title}
                image={photo.image}
                role={user?.role}
                removePhoto={() => onPhotoRemove(photo.id)}
                handleOpen={() => handleOpen(photo._id)}
                author={photo?.author}
                userId={user?.id}
                removeLoading={removeLoading}
              />
            )
          })}
        </Grid>

        {selectedPhoto && <PhotoModal open={open} selectedPhoto={selectedPhoto} handleClose={handleClose} />}
      </div>
  );
};

export default Gallery;