import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {
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
import PreviewIcon from '@mui/icons-material/Preview';
import {Close, Favorite, Share} from "@mui/icons-material";
import {red} from "@mui/material/colors";
import {baseURL} from "../../../axios.ts";
import {Photo, User} from '../../../types';
import {NavLink} from "react-router-dom";

interface Props {
  photoData: Photo;
  user?: User | null;
  isFavourite?: boolean;
  isModal?: boolean;
  cardStyle: object | null
  cardMediaStyle: { height: number };
  removeLoading?: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
  handleLike?: (id: string) => void;
  handleRemovePhoto?: () => void;
  togglePublishPhoto?: () => void;
  onFavouriteHandler?: () => void;
}

export const PhotoDetails: React.FC<Props> = ({
                                                photoData,
                                                user,
                                                isFavourite,
                                                isModal,
                                                cardStyle,
                                                cardMediaStyle,
                                                handleClose,
                                                handleOpen,
                                                handleLike,
                                                handleRemovePhoto,
                                                togglePublishPhoto,
                                                onFavouriteHandler
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
          (user?.role === 'ADMIN' || photoData?.author.id === user?.id) && (
            <Tooltip title='Remove' placement='top'>
              <IconButton onClick={handleRemovePhoto} aria-label="remove">
                <DeleteIcon color='error'/>
              </IconButton>
            </Tooltip>
          )
        )}

        {user?.role === 'ADMIN' && (
          <Tooltip title={photoData.published ? 'Unpublish' : 'Publish'} placement='top'>
            <IconButton onClick={togglePublishPhoto} aria-label="remove">
              {photoData.published ? <UnpublishedIcon color='secondary'/> : <PublishIcon color='primary'/>}
            </IconButton>
          </Tooltip>
        )}

        {!isModal && (
          photoData.author && photoData.author.id !== user?.id && (
           <>
             <Tooltip title='See more' placement='top'>
               <IconButton component={NavLink} to={`/gallery/${photoData.author?.id}`} aria-label="see more">
                 <PreviewIcon color='primary'/>
               </IconButton>
             </Tooltip>

             <Tooltip title={isFavourite ? 'Remove from Favourites' : 'Add to Favourites'} placement='top'>
               <IconButton onClick={onFavouriteHandler} aria-label="remove from favourites">
                 {isFavourite ? <Favorite color='error'/> : <Favorite color='disabled'/>}
               </IconButton>
             </Tooltip>
           </>
          )
        )}
      </CardActions>
    </Card>
  )
};