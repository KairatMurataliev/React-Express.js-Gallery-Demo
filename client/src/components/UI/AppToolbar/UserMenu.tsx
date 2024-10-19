import React, {useState} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {User} from "../../../types";
// import {useAppDispatch} from "../../../store/store-hooks.ts";
// import {baseURL} from "../../../axios.ts";
import {UserAvatar} from "../UserAvatar/UserAvatar.tsx";
import {DrawerComponent} from "../DrawerComponent/DrawerComponent.tsx";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  // const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // dispatch(logout());
  };

  const toggleDrawer = () => setOpenDrawer(prev => !prev);

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        {user.avatar && <UserAvatar style={{marginRight: '15px'}} user={user}/>}
        Hello, {user.username}
      </Button>

      <Button onClick={toggleDrawer}>Open drawer</Button>

      <DrawerComponent
        toggleDrawer={toggleDrawer}
        openDrawer={openDrawer}
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
