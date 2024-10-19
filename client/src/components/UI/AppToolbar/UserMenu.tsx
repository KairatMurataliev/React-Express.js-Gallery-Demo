import React, {useState} from 'react';
import {Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {User} from "../../../types";
import {UserAvatar} from "../UserAvatar/UserAvatar.tsx";
import {DrawerComponent} from "../DrawerComponent/DrawerComponent.tsx";
import {useAppDispatch} from "../../../store/store-hooks.ts";
import {logout} from "../../../store/users/usersThunk.ts";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = () => setOpenDrawer(prev => !prev);

  return (
    <>
      <Button
        onClick={toggleDrawer}
        endIcon={<MenuIcon />}
        color="inherit"
      >
        {user.avatar && <UserAvatar style={{marginRight: '15px'}} user={user}/>}
        {user.username}
      </Button>

      <DrawerComponent
        user={user}
        anchor='right'
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        handleLogout={() => dispatch(logout())}
      />
      {/*<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>*/}
      {/*  <NavLink to={`/my-gallery/${user.id}`} style={{textDecoration: 'none', color: '#000'}}>*/}
      {/*    <MenuItem>My Gallery</MenuItem>*/}
      {/*  </NavLink>*/}
      {/*  <NavLink to="/gallery/add" style={{textDecoration: 'none', color: '#000'}}>*/}
      {/*    <MenuItem>Submit Photo</MenuItem>*/}
      {/*  </NavLink>*/}
      {/*  <MenuItem onClick={handleLogout}>Logout</MenuItem>*/}
      {/*</Menu>*/}
    </>
  );
};

export default UserMenu;
