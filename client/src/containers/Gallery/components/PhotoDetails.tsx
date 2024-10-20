import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography
} from "@mui/material";
import {UserAvatar} from "../../../components/UI/UserAvatar/UserAvatar.tsx";
import IconButton from "@mui/material/IconButton";
import {Close, Favorite, Share} from "@mui/icons-material";
import {red} from "@mui/material/colors";
import {baseURL} from "../../../axios.ts";
import {Photo} from '../../../types';
import {NavLink} from "react-router-dom";

interface Props {
  photoData: Photo;
  role?: string;
  userId?: string;
  isModal?: boolean;
  cardStyle: object | null
  cardMediaStyle: { height: number };
  removeLoading?: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
  handleLike?: (id: string) => void;
  handleRemovePhoto?: () => void
}

export const PhotoDetails: React.FC<Props> = ({
                                                photoData,
                                                role,
                                                userId,
                                                isModal,
                                                cardStyle,
                                                cardMediaStyle,
                                                // removeLoading,
                                                handleClose,
                                                handleOpen,
                                                handleLike,
                                                // handleRemovePhoto
                                              }) => {
  return (
    <Card sx={cardStyle}>
      {isModal && (
        <CardHeader
          avatar={<UserAvatar user={photoData.author}/>}
          action={
            <Tooltip placement='top' title='Close'>
              <IconButton aria-label="settings">
                <Close style={{color: red[500]}} onClick={handleClose}/>
              </IconButton>
            </Tooltip>
          }
          title={photoData.author.username}
          subheader={photoData.author.email}
        />
      )}

      <CardActionArea onClick={handleOpen}>
        <CardMedia sx={cardMediaStyle} image={`${baseURL}/${photoData.image}`} title="Selected"/>
      </CardActionArea>

      <CardContent>
        <Typography variant="body1" sx={{color: 'text.primary'}}>
          {photoData.title || ''}
        </Typography>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          {photoData.description || ''}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {isModal ? (
          <>
            <Tooltip title='Add to favorites' placement='top'>
              <IconButton aria-label="add to favorites">
                <Favorite style={{color: red[500]}} onClick={() => handleLike?.(photoData.id)}/>
              </IconButton>
            </Tooltip>
            <Tooltip title='Share' placement='top'>
              <IconButton aria-label="share">
                <Share color='primary'/>
              </IconButton>
            </Tooltip>
          </>
        ) : (
          role === 'admin' ? (
            <Button color="error" variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          ) : photoData.author && photoData.author.id === userId ? (
            <Button color="error" variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          ) : null
        )}

        {!isModal && (
          photoData.author && photoData.author.id !== userId && (
            <Button component={NavLink} to={`/gallery/${photoData.author?.id}`} variant='outlined'>
              See More
            </Button>
          )
        )}
      </CardActions>
    </Card>
  )
};