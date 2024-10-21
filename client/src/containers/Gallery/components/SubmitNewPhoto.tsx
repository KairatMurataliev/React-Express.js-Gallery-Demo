import {Modal, Typography} from "@mui/material";
import SubmitPhotoForm from "./SubmitPhotoForm";
import React from "react";
import Box from "@mui/material/Box";

interface Props {
  open: boolean;
  handleToggleModal: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const SubmitNewPhoto: React.FC<Props> = ({ open, handleToggleModal }) => {
  return (
    <Modal
      open={open}
      onClose={handleToggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" sx={{mb: 2}}>Submit Photo</Typography>

        <SubmitPhotoForm />
      </Box>
    </Modal>
  );
};

export default SubmitNewPhoto;