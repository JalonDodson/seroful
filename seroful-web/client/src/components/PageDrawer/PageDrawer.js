import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useRef,
} from "react";
import { Link } from "react-router-dom";
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
  CssBaseline,
  Paper,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core/";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import VideocamIcon from "@material-ui/icons/Videocam";

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
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ReplyIcon from "@material-ui/icons/Reply";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";

import * as api from "../../util/api";

import { userState, videoToken, roomData } from "../../store/store";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import { drawerStyles } from "../../styles/drawerStyles";

export const PageDrawer = () => {
  const activeUser = useRecoilValue(userState);
  const setToken = useSetRecoilState(videoToken);
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
  const [viewRooms, setViewReq] = useState(false);
  const [joinUser, setJoinUser] = useState("");
  const [createUser, setCreateUser] = useState("");
  const [newRoomData, setData] = useRecoilState(roomData);
  const [messages, setMessages] = useState(null);
  const [messageBox, setMessageBox] = useState(false);
  // const [chatBox, setChatBox] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const loading = searchOpen && options.length === 0;

  const friendsMenu = (ev) => setAnchor(ev.currentTarget);
  const friendsClose = () => setAnchor(null);
  const videoMenu = (ev) => setVideoAnchor(ev.currentTarget);
  const videoMenuClose = () => setVideoAnchor(null);

  const createRoom = useCallback(async () => {
    console.log(createUser, roomData);
    const data = await api.createRoom(createUser, roomData);
    data && setToken(data.token);
  }, [createUser, roomData]);

  const connectToRoom = async () => {
    console.log(joinUser, roomData);
    const data = await api.connectToRoom(joinUser, roomData);
    console.log(data);
    data && setToken(data.token);
  };

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

  // useEffect(() => {
  //   const subscriber = firebase
  //     .firestore()
  //     .collection("messages")
  //     .doc(firebase.auth().currentUser.email)
  //     .onSnapshot(
  //       (docSnapshot) => {
  //         const data = docSnapshot.data();
  //         setMessages(
  //           (x) => (x = { sent: data.sent, received: data.received })
  //         );
  //       },
  //       (e) => console.log(e)
  //     );
  //   return () => subscriber();
  // }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);
  const messagesArray = messages && [messages.sent, messages.received].flat();
  const inputMsgRef = useRef();
  // const [chatBool, setChatBool] = useState(false);
  // const chatTab = (sender, photo, message, recipient) => {
  //   return (
  //     <>
  //       <Paper onClick={() => setChatBool(!chatBool)} className={!chatBool ? styles.chatPaper : styles.chatPaperClosed}>

  //       </Paper>
  //     </>
  //   );
  // };
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
                  activeUser && activeUser.friends
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
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/friends"
        >
          <MenuItem>Friends List</MenuItem>
        </Link>
        <MenuItem onClick={() => setRequest(true)}>Requests</MenuItem>
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
            {activeUser &&
              activeUser.friends &&
              (activeUser.friends.pending === void 0
                ? "You have no pending friend requests."
                : 1 === activeUser.friends.pending.length
                ? "You have one new friend request!"
                : `You have ${activeUser.friends.pending.length} new friend requests!`)}
          </DialogContentText>
          {activeUser && activeUser.friends && activeUser.friends.pending && (
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
        <MenuItem onClick={() => setViewReq(true)}>View Room List</MenuItem>
        <MenuItem onClick={() => setJoinReq(true)}>Join Room</MenuItem>
        <MenuItem onClick={() => setCreateReq(true)}>Create Room</MenuItem>
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
            Please enter the name of the Room you would like to join, as well as
            the Screen Name by which you would like to be addressed
            <form>
              <div className={styles.inputCont}>
                <TextField
                  value={newRoomData}
                  onChange={(ev) => setData(ev.target.value)}
                  label="Existing Conference Room"
                  variant="outlined"
                />
                <TextField
                  value={joinUser}
                  onChange={(ev) => setJoinUser(ev.target.value)}
                  label="Desired Username"
                  variant="outlined"
                />
              </div>
              <Link
                to="/video"
                onClick={() => {
                  connectToRoom();
                }}
              >
                <EmojiEmotionsIcon />
                Join Room
              </Link>
            </form>
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
            Please enter the name of the Room you would like to create, as well
            as the Screen Name by which you would like to be addressed
            <form>
              <div className={styles.inputCont}>
                <TextField
                  value={newRoomData}
                  onChange={(ev) => setData(ev.target.value)}
                  label="Create Conference Room"
                  variant="outlined"
                />
                <TextField
                  value={createUser}
                  onChange={(ev) => setCreateUser(ev.target.value)}
                  label="Desired Username"
                  variant="outlined"
                />
              </div>
              <Link
                to="/video"
                onClick={() => {
                  createRoom();
                }}
              >
                <EmojiEmotionsIcon />
                Create Room
              </Link>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={viewRooms}
        onClose={() => setViewReq(false)}
        aria-labelledby="view-modal"
        aria-describedby="view-video-rooms"
      >
        <DialogContent>
          <DialogContentText>
            <h4 className={styles.activeHeader}>List of Active Video Rooms</h4>
          </DialogContentText>
          // TODO: Map through array of rooms obtained via back-end, list them
          here // TODO: Add a 'join' button that brings up the 'Join Room'
          dialog with the user's username and the video name as both of the
          values
          <List>
            <ListItem>
              <ListItemIcon>
                <VideocamIcon />
              </ListItemIcon>
              <ListItemText>
                <strong>Room Name:</strong> <i>Daddy Dick</i>
                <br />
                <strong>Created By:</strong> <i>Mommy Vagene</i>
                <br />
                <strong> Active Since:</strong> <i>Grandma</i>
                <br />
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemIcon>
                <VideocamIcon />
              </ListItemIcon>
              <ListItemText>
                <strong>Room Name:</strong> <i>Booby Face</i>
                <br />
                <strong>Created By:</strong> <i>Clitter Blitter</i>
                <br />
                <strong>Active Since:</strong> <i>Mom</i>
                <br />
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
        </DialogContent>
      </Dialog>

      {!messageBox ? (
        <>
          <CssBaseline />
          <Paper square className={styles.paperClosed}>
            <ButtonBase
              className={styles.text}
              onClick={() => setMessageBox(true)}
            >
              Messages
            </ButtonBase>
          </Paper>
        </>
      ) : (
        <>
          <CssBaseline />
          <Paper square className={styles.paper}>
            <ButtonBase
              className={styles.boxText}
              onClick={() => setMessageBox(false)}
            >
              Messages
            </ButtonBase>
            <List className={styles.list}>
              {messages &&
                messagesArray.map((x, i) => {
                  return x && x.sender !== activeUser.username ? (
                      <Fragment key={i}>
                        <ListItem>
                          <ListItemAvatar>
                            {(x.photoURL !== {}) | "" ? (
                              <Avatar alt={`${x.username}`} src={x.photoURL} />
                            ) : (
                              <Avatar>{x.sender[0]}</Avatar>
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            primary={x.sender}
                            secondary={x.message && x.message}
                          />
                          <span style={{ float: "right" }}>
                            <IconButton
                              onClick={() =>
                                setNewMessage(
                                  (y) =>
                                    (y = {
                                      bool: true,
                                      recipient: x.sender,
                                      sender: x.recipient,
                                      targetMessage: x.message,
                                    })
                                )
                              }
                            >
                              <ReplyIcon />
                            </IconButton>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </ListItem>
                      </Fragment>
                  ) : null;
                })}
            </List>
          </Paper>
          {newMessage && (
            <Dialog open={newMessage.bool} onClose={() => setNewMessage(null)}>
              <DialogTitle>New Message To: {newMessage.recipient}</DialogTitle>
              <DialogContent>
                <span style={{ textAlign: "center" }}>
                  <Typography component="h3">Their Message:</Typography>
                  <Typography>{newMessage.targetMessage}</Typography>
                  <br />
                  <br />
                </span>
                <TextField
                  variant="outlined"
                  value={newMessage.newMessage}
                  inputRef={inputMsgRef}
                  label="Message Content"
                  style={{ width: 400 }}
                />
                <Divider />
                <Button
                  startIcon={<CloseIcon />}
                  onClick={() => setNewMessage(null)}
                >
                  Cancel
                </Button>
                <Button
                  style={{ float: "right" }}
                  startIcon={<SendIcon />}
                  onClick={() => {
                    api
                      .sendMessage(
                        newMessage.sender,
                        newMessage.recipient,
                        inputMsgRef.current.value
                      )
                      .then(setNewMessage(null));
                  }}
                >
                  Send Message
                </Button>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </>
  );
};
