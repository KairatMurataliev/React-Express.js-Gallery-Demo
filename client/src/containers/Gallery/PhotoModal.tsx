import React from 'react';
import {Button, Card, CardActions, CardMedia, Modal} from "@mui/material";
import {baseURL} from "../../axios.ts";
import {Photo} from "../../types";

interface Props {
  handleClose: () => void;
  selectedPhoto: Photo;
  open: boolean;
}

export const PhotoModal: React.FC<Props> = ({handleClose, selectedPhoto, open}) => {
  return (
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
    </Modal>
  )
};