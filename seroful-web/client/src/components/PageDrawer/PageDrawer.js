import React, { useState } from "react";

import {
  Button,
  ButtonGroup,
  ButtonBase,
  Divider,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  // Link,
} from "@material-ui/core/";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteIcon from '@material-ui/icons/Delete';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentIcon from "@material-ui/icons/Assignment";

import * as api from "../../util/api";

import { userState } from "../../store/store";
import { useRecoilValue } from "recoil";

import { drawerStyles } from "../../styles/drawerStyles";

export const PageDrawer = () => {
  const activeUser = useRecoilValue(userState);
  const styles = drawerStyles();

  const [anchor, setAnchor] = useState(null);
  const [requestOpen, setRequest] = useState(false);

  const friendsMenu = (ev) => setAnchor(ev.currentTarget);
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
              <Badge
                badgeContent={
                  activeUser.friends !== undefined
                    ? activeUser.friends.pending.length
                    : 0
                }
                color="primary"
              >
                <PeopleIcon />
              </Badge>
            </ListItemIcon>
            <ButtonBase
              aria-controls="friends-menu"
              variant="text"
              className={styles.friendsButton}
              aria-haspopup="true"
              onClick={friendsMenu}
            >
              Friends
            </ButtonBase>
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
        onClose={friendsClose}
      >
        <MenuItem onClick={null}>Friends List</MenuItem>
        <MenuItem onClick={() => setRequest(true)}>Requests</MenuItem>
        <MenuItem onClick={null}>Messages</MenuItem>
        <MenuItem onClick={null}>Add by Username</MenuItem>
      </Menu>
      // Dialogs
      <Dialog
        open={requestOpen}
        onClose={() => setRequest(false)}
        aria-labelledby="requests-modal"
        aria-describedby="requests-modal-desc"
      >
        <DialogTitle id="requests-title">Friend Requests</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {activeUser.friends ? 1 === activeUser.friends.pending.length ? "You have one new friend request!" : `You have ${activeUser.friends.pending.length} new friend requests!` : "You don't have any new friend requests right now."}
          </DialogContentText>
          {activeUser.friends &&
          <List>
            {activeUser.friends.pending.map(x => {
              return (
              <ListItem>
                <ButtonGroup className={styles.buttonGroup} aria-label="request-handlers"><IconButton color="primary" onClick={() => api.acceptFriend(x.username, activeUser.username)}><PersonAddIcon /></IconButton><IconButton color="secondary" onClick={() => api.deleteRequest(x.username, activeUser.username)}><DeleteIcon /></IconButton></ButtonGroup> {x.username}
              </ListItem>)
            })}
          </List>
          }
            
        </DialogContent>
      </Dialog>
    </>
  );
};
