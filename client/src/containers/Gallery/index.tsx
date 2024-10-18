import {Button, Card, CardActions, CardMedia, Grid, Modal, Typography} from "@mui/material";
import {Photo} from "../../types";
import {useParams, useLocation, NavLink} from "react-router-dom";
import {baseURL} from "../../axios.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {getAuthorGallery, getGallery, removePhoto} from "../../store/gallery/galleryThunk.ts";
import {useGalleryMainPage} from "../../hooks/useGalleryMainPage.ts";

const Gallery = () => {
  const {id} = useParams() as { id: string };
  const search = useLocation();
  const {open, selectedPhoto, photosList, loading, removeLoading, user, setOpen, setSelectedPhoto, dispatch } = useGalleryMainPage(id || undefined);

  const onPhotoRemove = async (photoId: string) => {
    await dispatch(removePhoto(photoId));
    if (id) {
      dispatch(getAuthorGallery(id));
    } else {
      await dispatch(getGallery());
    }
  };

  const handleOpen = (id: string) => {
    setOpen(true);
    const selected = photosList.find(item => item._id === id);
    if (selected) {
      setSelectedPhoto(selected);
    }
  };
  const handleClose = () => setOpen(false);

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
          {/*{photosList.map((photo) => {*/}
          {/*  return (*/}
          {/*    <PhotoItem*/}
          {/*      key={photo._id}*/}
          {/*      title={photo.title}*/}
          {/*      image={photo.image}*/}
          {/*      role={user?.role}*/}
          {/*      removePhoto={() => onPhotoRemove(photo._id)}*/}
          {/*      handleOpen={() => handleOpen(photo._id)}*/}
          {/*      author={photo?.author}*/}
          {/*      userId={user?._id}*/}
          {/*      removeLoading={removeLoading}*/}
          {/*    />*/}
          {/*  );*/}
          {/*})}*/}
        </Grid>

        {selectedPhoto &&
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
          >
            <Card sx={{maxWidth: 600, margin: 'auto', marginTop: '10%'}}>
              <CardMedia sx={{height: 300}} image={`${baseURL}/${selectedPhoto.image}`} title="Selected"/>
              <CardActions>
                <Button size="small" onClick={handleClose}>
                  Close
                </Button>
              </CardActions>
            </Card>
          </Modal>}
      </div>
  );
};

export default Gallery;