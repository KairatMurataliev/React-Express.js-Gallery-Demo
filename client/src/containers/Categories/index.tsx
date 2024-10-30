import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {useCategories} from "../../hooks/useCategories.ts";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const Categories = () => {

  const {categoriesList, onCategoryRemove} = useCategories();

  return (
    <Box sx={{width: '100%'}}>
      <Button
        style={{marginBottom: 20}}
        // onClick={onCategoryCreate}
        variant="contained"
        startIcon={<AddCircleIcon/>}
      >
        Create Category
      </Button>
      <Paper>
        <Toolbar sx={[{pl: {sm: 2}, pr: {xs: 1, sm: 1}}]}>
          <Typography sx={{flex: '1 1 100%'}} variant="h6" component="div">Categories</Typography>
        </Toolbar>

        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesList.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="right">{category.createdAt}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onCategoryRemove(category.id)}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
};