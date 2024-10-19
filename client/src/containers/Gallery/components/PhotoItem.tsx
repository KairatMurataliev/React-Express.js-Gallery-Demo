import React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import {NavLink} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {baseURL} from "../../../axios.ts";
import Grid from "@mui/material/Grid2";

interface Props {
  title: string;
  image: string | null;
  role?: string;
  removePhoto?: () => void;
  handleOpen: () => void;
  author?: { id: string, username: string };
  userId?: string;
  removeLoading: boolean;
}

const PhotoItem: React.FC<Props> = ({
                                      author,
                                      userId,
                                      handleOpen,
                                      removePhoto,
                                      title,
                                      image,
                                      role,
                                      removeLoading
                                    }) => {
  return (
    <Grid item xs={4}>
      <Card sx={{maxWidth: 345}}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia sx={{height: 200}} image={`${baseURL}/${image}`} title="Photo"/>
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Author:
            <NavLink to={`/gallery/${author?.id}`}>
              {author?.username}
            </NavLink>
          </Typography>
        </CardContent>
        <CardActions>
          {role === 'admin' ? (
            <LoadingButton variant="contained" color="error" loading={removeLoading} onClick={removePhoto}>
              Delete
            </LoadingButton>
          ) : author && author.id === userId ? (
            <LoadingButton variant="contained" color="error" loading={removeLoading} onClick={removePhoto}>
              Delete
            </LoadingButton>
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PhotoItem;
