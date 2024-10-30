import React from 'react';
import Box from '@mui/material/Box';
import {Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CategoryIcon from '@mui/icons-material/Category';
import {PropsWithChildren} from "react";
import {User} from "../../../types";
import IconButton from "@mui/material/IconButton";
import ImageIcon from '@mui/icons-material/Image';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from "react-router-dom";
import {ExpandLess, ExpandMore, Unpublished} from "@mui/icons-material";

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

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
            <ListItemButton component={NavLink} to={`/`}>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary={'Home'}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to={`/my-gallery/${user.id}`}>
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

            <>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon/>
                </ListItemIcon>
                <ListItemText primary="Admin Settings" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/admin?published=true`}>
                    <ListItemIcon>
                      <PublishedWithChangesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Published" />
                  </ListItemButton>

                  <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/admin?published=false`}>
                    <ListItemIcon>
                      <Unpublished />
                    </ListItemIcon>
                    <ListItemText primary="Unpublished" />
                  </ListItemButton>

                  <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/admin/categories`}>
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
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