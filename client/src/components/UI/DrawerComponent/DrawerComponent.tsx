import React from 'react';
import Box from '@mui/material/Box';
import {Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {PropsWithChildren} from "react";

interface Props {
  toggleDrawer: () => void;
  openDrawer: boolean;
}

export const DrawerComponent: React.FC<PropsWithChildren<Props>> = ({ children, toggleDrawer, openDrawer }) => {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {children}
      <Drawer open={openDrawer} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </div>
  );
}