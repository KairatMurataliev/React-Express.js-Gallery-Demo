import {Box, CircularProgress} from "@mui/material";

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress style={{margin: 'auto'}} />
    </Box>
  );
};

export default Spinner;