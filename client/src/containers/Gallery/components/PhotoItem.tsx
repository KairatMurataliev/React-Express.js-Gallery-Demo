import React from 'react';
import Grid from "@mui/material/Grid2";
import {PhotoDetails} from "./PhotoDetails.tsx";
import {Photo, User} from "../../../types";

interface Props {
  item: Photo;
  isFavourite?: boolean;
  handleRemovePhoto?: () => void;
  handleOpen: () => void;
  togglePublishPhoto?: () => void;
  onFavouriteHandler?: () => void;
  user?: User | null;
  removeLoading?: boolean;
}

const PhotoItem: React.FC<Props> = ({
                                      item,
                                      user,
                                      handleOpen,
                                      handleRemovePhoto,
                                      isFavourite,
                                      removeLoading,
                                      togglePublishPhoto,
                                      onFavouriteHandler
                                    }) => {
  return (
    <Grid size={{xs: 6, md: 4, lg: 3}}>
      <PhotoDetails
        isModal={false}
        photoData={item}
        user={user}
        isFavourite={isFavourite}
        removeLoading={removeLoading}
        handleRemovePhoto={handleRemovePhoto}
        togglePublishPhoto={togglePublishPhoto}
        onFavouriteHandler={onFavouriteHandler}
        handleOpen={handleOpen}
        cardStyle={{maxWidth: 400}}
        cardMediaStyle={{height: 200}}
      />
    </Grid>
  );
};

export default PhotoItem;
