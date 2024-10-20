import {Alert, Button, TextField} from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import Grid from "@mui/material/Grid2";
import {usePhotoSubmit} from "../../../hooks/usePhotoSubmit.ts";

const SubmitPhotoForm = () => {
  const {state, error, fileInputChangeHandler, inputChangeHandler, submitFormHandler} = usePhotoSubmit();

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      {error && <Alert style={{marginBottom: '20px'}} severity="error">All fields are required!</Alert>}
      <Grid container direction="column" spacing={2}>
        <Grid size={{ xs: 12, md: 12, lg: 12}}>
          <TextField id="title" label="Title" value={state.title} onChange={inputChangeHandler} name="title"
                     required/>
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 12}}>
          <TextField id="description" label="Description" value={state.description} onChange={inputChangeHandler} name="description"
                     required/>
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 12}}>
          <FileInput label="Image" onChange={fileInputChangeHandler} name="image" type="image/*"/>
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 12}}>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>

        </Grid>
      </Grid>
    </form>
  );
};

export default SubmitPhotoForm;