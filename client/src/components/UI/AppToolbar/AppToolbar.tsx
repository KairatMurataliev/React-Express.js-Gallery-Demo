import {AppBar, Button, styled, Toolbar, Grid, Typography} from '@mui/material';
import {Link as NavLink} from 'react-router-dom';
import UserMenu from './UserMenu';
import {useAppSelector} from "../../../store/store-hooks.ts";
import {selectUser} from "../../../store/users/usersSlice.ts";

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">Demo React/TypeScript</Link>
          </Typography>
          <Grid item>{user ? <UserMenu user={user}/> : <Button component={NavLink} to="/login" color="inherit">Sign in</Button>}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
