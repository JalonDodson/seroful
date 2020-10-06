import React from "react";

import {
  Button,
  Divider,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@material-ui/core/";

import MenuBookIcon from "@material-ui/icons/MenuBook";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from '@material-ui/icons/Person';
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

import { homeStyles } from "../../styles/homeStyles";

export const PageDrawer = () => {
  const styles = homeStyles();

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
          <ListItem button key="Friends">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Friends"
              onClick={() => console.log("put a menu here soon")}
            />
          </ListItem>
          <ListItem button key="Planner">
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>
            <ListItemText
              primary="Planner"
              onClick={() => console.log("put a menu here soon")}
            />
          </ListItem>
          <ListItem button key="Journal">
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Journal" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
