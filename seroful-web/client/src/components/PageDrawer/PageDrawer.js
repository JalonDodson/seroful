import React, { useState, useEffect } from "react";

import {
  TextField,
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteIcon from "@material-ui/icons/Delete";

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
import CircularProgress from "@material-ui/core/CircularProgress";
import VideoCallIcon from "@material-ui/icons/VideoCall";

import * as api from "../../util/api";

import { userState } from "../../store/store";
import { useRecoilValue } from "recoil";

import { drawerStyles } from "../../styles/drawerStyles";

export const PageDrawer = () => {
  const activeUser = useRecoilValue(userState);
  const styles = drawerStyles();

  const [anchor, setAnchor] = useState(null);
  const [videoAnchor, setVideoAnchor] = useState(null);
  const [requestOpen, setRequest] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [searchOpen, setSearch] = useState(false);
  const [addByOpen, setAddBy] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [joinReq, setJoinReq] = useState(false);
  const [createReq, setCreateReq] = useState(false);

  const loading = searchOpen && options.length === 0;

  const friendsMenu = (ev) => setAnchor(ev.currentTarget);
  const friendsClose = () => setAnchor(null);
  const videoMenu = (ev) => setVideoAnchor(ev.currentTarget);
  const videoMenuClose = () => setVideoAnchor(null);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out."));
  };

  useEffect(() => {
    let active = true;

    if (!loading) return undefined;

    (async () => {
      const resp = await api.getUserList();
      const users = await resp;
      if (active) setOptions(users);
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!searchOpen) setOptions([]);
  }, [searchOpen]);

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
                  activeUser.friends
                    ? activeUser.friends.pending &&
                      activeUser.friends.pending.length
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
          <ListItem button key="VideoChat">
            <ListItemIcon>
              <VideoCallIcon />
            </ListItemIcon>
            <ButtonBase
              aria-controls="video-menu"
              aria-haspopup="true"
              variant="text"
              className={styles.videoButton}
              onClick={videoMenu}
            >
              Video Chat
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
        <MenuItem onClick={() => setAddBy(true)}>Add by Username</MenuItem>
      </Menu>
      <Dialog
        open={requestOpen}
        onClose={() => setRequest(false)}
        aria-labelledby="requests-modal"
        aria-describedby="requests-modal"
      >
        <DialogTitle id="requests-title">Friend Requests</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {activeUser.friends &&
              (activeUser.friends.pending === void 0
                ? "You have no pending friend requests."
                : 1 === activeUser.friends.pending.length
                ? "You have one new friend request!"
                : `You have ${activeUser.friends.pending.length} new friend requests!`)}
          </DialogContentText>
          {activeUser.friends && activeUser.friends.pending && (
            <List>
              {activeUser.friends.pending.map((x) => {
                return (
                  <ListItem>
                    {!isChecked ? (
                      <>
                        <ButtonGroup
                          className={styles.buttonGroup}
                          aria-label="request-handlers"
                        >
                          <IconButton
                            color="primary"
                            onClick={() => {
                              api.acceptFriend(x.username, activeUser.username);
                              setChecked(true);
                            }}
                          >
                            <PersonAddIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => {
                              api.deleteRequest(
                                x.username,
                                activeUser.username
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ButtonGroup>
                        <Typography>{x.username}</Typography>
                      </>
                    ) : (
                      <Typography>
                        {x.username} was succesfully added!
                      </Typography>
                    )}
                  </ListItem>
                );
              })}
            </List>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={addByOpen}
        onClose={() => setAddBy(false)}
        aria-labelledby="requests-dialog"
        aria-describedby="search-dialog"
      >
        <DialogTitle id="search-title">Add by Username</DialogTitle>
        <DialogContentText>
          Do you have a friend that uses Seroful you'd like to add? Feel free to
          search for their username and add them here!
        </DialogContentText>
        <DialogContent>
          <Autocomplete
            id="async-user-search"
            open={searchOpen}
            onOpen={() => setSearch(true)}
            onClose={() => setSearch(false)}
            getOptionSelected={(opt, val) => opt.username === val.username}
            getOptionLabel={(opt) => opt.username}
            options={options}
            loading={loading}
            onChange={(ev, val) => setCurrentSearch(val)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add by Username"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                error={
                  currentSearch &&
                  currentSearch.username === activeUser.username
                }
                helperText={
                  currentSearch &&
                  currentSearch.username === activeUser.username
                    ? "You can't add yourself as a friend, silly (although, love yourself ♡)!"
                    : ""
                }
              />
            )}
          />
          {currentSearch ? (
            <Button
              disabled={
                currentSearch && currentSearch.username === activeUser.username
              }
              className={styles.addButton}
              onClick={() => {
                api.addFriend(currentSearch.username, activeUser.username);
                setCurrentSearch(null);
              }}
            >
              Add Friend
            </Button>
          ) : null}
          <Button
            style={{ float: "right" }}
            className={styles.addButton}
            onClick={() => {
              setAddBy(false);
              setCurrentSearch(null);
            }}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
      <Menu
        id="video-menu"
        anchorEl={videoAnchor}
        keepMounted
        open={Boolean(videoAnchor)}
        onClose={videoMenuClose}
      >
        <MenuItem onClick={null}>Join Room</MenuItem>
        <MenuItem onClick={null}>Create Room</MenuItem>
      </Menu>
      <Dialog
        open={joinReq}
        onClose={() => setJoinReq(false)}
        aria-labelledby="join-modal"
        aria-describedby="join-modal"
      >
        <DialogTitle id="join-title">Join Conference Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the Room you would like to join, as well as the Screen Name you would like people to use when they
            address you as
            <TextField />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={createReq}
        onClose={() => setCreateReq(false)}
        aria-labelledby="create-modal"
        aria-describedby="create-modal"
      >
        <DialogTitle id="create-title">Create Conference Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the Room you would like to create, as well as the Screen Name you would like people to use when they
            address you as
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
