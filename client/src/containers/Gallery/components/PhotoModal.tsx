import * as React from 'react';
import {Photo, User} from "../../../types";
import { Modal } from "@mui/material";
import {PhotoDetails} from "./PhotoDetails.tsx";

interface Props {
  selectedPhoto: Photo;
  user: User | null;
  open: boolean;
  handleClose: () => void;
  onFavouriteHandler?: () => void;
}

export const PhotoModal: React.FC<Props> = ({selectedPhoto, user, open, handleClose, onFavouriteHandler}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <PhotoDetails
        user={user}
        isModal={true}
        photoData={selectedPhoto}
        cardStyle={{maxWidth: 800, margin: 'auto', marginTop: '5%'}}
        cardMediaStyle={{height: 300}}
        handleClose={handleClose}
        onFavouriteHandler={onFavouriteHandler}
      />
    </Modal>
  )
};