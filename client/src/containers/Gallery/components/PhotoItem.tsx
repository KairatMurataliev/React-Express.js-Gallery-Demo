import React from 'react';
import Grid from "@mui/material/Grid2";
import {PhotoDetails} from "./PhotoDetails.tsx";
import {Photo} from "../../../types";

interface Props {
  item: Photo;
  role?: string;
  handleRemovePhoto?: () => void;
  handleOpen: () => void;
  userId?: string;
  removeLoading: boolean;
}

const PhotoItem: React.FC<Props> = ({
                                      item,
                                      userId,
                                      handleOpen,
                                      handleRemovePhoto,
                                      role,
                                      removeLoading
                                    }) => {
  return (
    <Grid size={{xs: 6, md: 4, lg: 4}}>
      <PhotoDetails
        isModal={false}
        photoData={item}
        userId={userId}
        role={role}
        removeLoading={removeLoading}
        handleRemovePhoto={handleRemovePhoto}
        handleOpen={handleOpen}
        cardStyle={{maxWidth: 400}}
        cardMediaStyle={{height: 200}}
      />
      {/*<Card sx={{maxWidth: 400}}>*/}
      {/*  <CardActionArea onClick={handleOpen}>*/}
      {/*    <CardMedia sx={{height: 200}} image={`${baseURL}/${image}`} title="Photo"/>*/}
      {/*  </CardActionArea>*/}
      {/*  <CardContent>*/}
      {/*    <Typography gutterBottom variant="h5" component="div">*/}
      {/*      {title}*/}
      {/*    </Typography>*/}

      {/*    <Typography variant="body2" color="text.secondary">*/}
      {/*      Author:*/}
      {/*      <NavLink to={`/gallery/${author?.id}`}>*/}
      {/*        {author?.username}*/}
      {/*      </NavLink>*/}
      {/*    </Typography>*/}
      {/*  </CardContent>*/}
      {/*  <CardActions>*/}
      {/*    {role === 'admin' ? (*/}
      {/*      <LoadingButton variant="contained" color="error" loading={removeLoading} onClick={removePhoto}>*/}
      {/*        Delete*/}
      {/*      </LoadingButton>*/}
      {/*    ) : author && author.id === userId ? (*/}
      {/*      <LoadingButton variant="contained" color="error" loading={removeLoading} onClick={removePhoto}>*/}
      {/*        Delete*/}
      {/*      </LoadingButton>*/}
      {/*    ) : null}*/}
      {/*  </CardActions>*/}
      {/*</Card>*/}
    </Grid>
  );
};

export default PhotoItem;
