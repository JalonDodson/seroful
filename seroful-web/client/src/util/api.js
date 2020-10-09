import axios from "axios";
import { nanoid } from "nanoid";

import firebase from "firebase/app";
import "firebase/auth";

/*
  While in development, http://localhost:4000/ should be used for all API requests.
  When built, only /path should be used in the axios requests.
*/
// axios stuff
const instance = axios.create({ baseURL: "http://localhost:4000" });

export const getActiveUser = async (email) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  try {
    const res = await instance
      .get(`/users?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => resp.data);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (username, displayName, email) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  try {
    const res = await instance.post(
      `/users`,
      {
        displayName: displayName,
        email: email,
        username: username,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (userData) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());
  try {
    const res = await instance.patch(
      `/users?email=${userData.email}`,
      {
        username: userData.username,
        email: userData.email,
        displayName: userData.displayName,
        photo: userData.photo,
        medicines: userData.medicines,
        illnesses: userData.illnesses,
        plans: userData.plans,
        journals: userData.journals,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createEntry = async (entry, email) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  try {
    const res = await instance.post(
      `/users/entries?email=${email}`,
      {
        entry: entry,
        timestamp: Date().now(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getEntries = async (email) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  try {
    const res = await instance
      .get(`/users/entries?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => resp.data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const videoRoom = async (roomId) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  try {
    let res = null;
    if (roomId) {
      res = await instance.get(`/video-chat/${roomId}`);
    } else {
      res = await instance.get(`/video-chat/${nanoid()}`);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};
