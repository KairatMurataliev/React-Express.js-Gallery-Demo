import * as React from 'react';
import {Photo} from "../../../types";
import { Modal } from "@mui/material";
import {PhotoDetails} from "./PhotoDetails.tsx";

interface Props {
  selectedPhoto: Photo;
  open: boolean;
  handleClose: () => void;
  handleLike: (id: string) => void
}

export const PhotoModal: React.FC<Props> = ({selectedPhoto, open, handleClose, handleLike}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <PhotoDetails
        isModal={true}
        photoData={selectedPhoto}
        cardStyle={{maxWidth: 800, margin: 'auto', marginTop: '5%'}}
        cardMediaStyle={{height: 300}}
        handleLike={handleLike}
        handleClose={handleClose}
      />
    </Modal>
  )
};