import React, {useState} from 'react';
import {Avatar, Button, Menu, MenuItem} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {User} from "../../../types";
import {useAppDispatch} from "../../../store/store-hooks.ts";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // dispatch(logout());
  };

  let avatar = '';
  if (user.avatar) {
    if (user.avatar.includes('images') || user.avatar.includes('fixtures')) {
      avatar = `${'http://localhost:8000'}/${user.avatar}`;
    } else {
      avatar = user.avatar;
    }
  }

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        {user.avatar && <Avatar style={{marginRight: '15px'}} alt="avatar" src={avatar}/>}
        Hello, {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <NavLink to={`/my-gallery/${user._id}`} style={{textDecoration: 'none', color: '#000'}}>
          <MenuItem>My Gallery</MenuItem>
        </NavLink>
        <NavLink to="/gallery/add" style={{textDecoration: 'none', color: '#000'}}>
          <MenuItem>Submit Photo</MenuItem>
        </NavLink>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
