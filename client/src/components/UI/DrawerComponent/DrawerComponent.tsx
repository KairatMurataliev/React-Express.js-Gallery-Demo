import React from 'react';
import Box from '@mui/material/Box';
import {Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
import MailIcon from '@mui/icons-material/Mail';
import {PropsWithChildren} from "react";
import {User} from "../../../types";
import IconButton from "@mui/material/IconButton";
import ImageIcon from '@mui/icons-material/Image';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';

type Anchor = "right";

interface Props {
  user: User;
  anchor: Anchor;
  openDrawer: boolean;
  toggleDrawer: () => void;
  handleLogout: () => void;
}

export const DrawerComponent: React.FC<PropsWithChildren<Props>> = ({
                                                                      children,
                                                                      anchor,
                                                                      user,
                                                                      toggleDrawer,
                                                                      openDrawer,
                                                                      handleLogout
                                                                    }) => {
  const DrawerList = (
    <>
      <Box sx={{width: 300}} role="presentation">

        <Box padding={2}>
          <IconButton onClick={toggleDrawer}>
            <ChevronRightIcon/>
          </IconButton>
        </Box>

        <Divider/>

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddCircleIcon/>
              </ListItemIcon>
              <ListItemText primary={'Submit Photo'}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ImageIcon/>
              </ListItemIcon>
              <ListItemText primary={'My Gallery'}/>
            </ListItemButton>
          </ListItem>

        </List>

        <Divider/>

        <List>
          {user.role === 'ADMIN' && (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
                <ListItemText primary='Admin Panel'/>
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary='Logout'/>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );

  return (
    <div>
      {children}
      <Drawer anchor={anchor} open={openDrawer} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </div>
  );
}