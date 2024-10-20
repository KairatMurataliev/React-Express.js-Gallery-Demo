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
    <Grid size={{xs: 6, md: 4, lg: 3}}>
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
    </Grid>
  );
};

export default PhotoItem;
