import React, { useState } from "react";

import {
  ButtonBase,
  Divider,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
  // Link,
} from "@material-ui/core/";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentIcon from '@material-ui/icons/Assignment';

import { drawerStyles } from "../../styles/drawerStyles";

export const PageDrawer = () => {
  const styles = drawerStyles();

  const [anchor, setAnchor] = useState(null);

  const friendsMenu = ev => setAnchor(ev.currentTarget);
  const friendsClose = () => setAnchor(null);
  
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out."));
  };
  return (
    <>
      <Drawer
        className={styles.drawer}
        variant="permanent"
        classes={{ paper: styles.drawerPaper }}
        anchor="left"
      >
        <div className={styles.header}>
          <Typography className={styles.seroful} variant="h3">
            Seroful
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button key="Home" component="a" href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="Profile" component="a" href="/profile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem key="Friends">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ButtonBase aria-controls="friends-menu" variant="text" className={styles.friendsButton} aria-haspopup="true" onClick={friendsMenu}>Friends</ButtonBase>
          </ListItem>
          <ListItem button key="Planner" component="a" href="/planner">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText
              primary="Planner"
              onClick={() => console.log("put a menu here soon")}
            />
          </ListItem>
          <ListItem button key="Journal" component="a" href="/journal">
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Journal" />
          </ListItem>
          <ListItem button key="Settings" component="a" href="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button key="Sign Out" onClick={() => logout()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
      <Menu
        id="friends-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={friendsClose}>
            <MenuItem onClick={null}>Friends List</MenuItem>
            <MenuItem onClick={null}>Messages</MenuItem>
            <MenuItem onClick={null}>Add by Username</MenuItem>
        </Menu>
    </>
  );
};
