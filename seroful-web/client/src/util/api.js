import axios from "axios";
import { nanoid } from "nanoid";

import firebase from "firebase/app";
import "firebase/auth";

/*
  While in development, http://localhost:4000/ should be used for all API requests.
  When built, only /path should be used in the axios requests.
*/
const instance = axios.create({ baseURL: "http://localhost:4000" });

instance.interceptors.request.use(
  async (config) => {
    const token = await firebase.auth().currentUser.getIdToken();
    if (config.cancelToken) config.cancelToken.throwIfRequested();

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export const getActiveUser = async (email) => {
  try {
    const res = await instance
      .get(`/users?email=${email}`)
      .then((resp) => resp.data);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (username, displayName, email) => {
  try {
    const res = await axios.post(`/users`, {
      displayName: displayName,
      email: email,
      username: username,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (userData) => {
  try {
    const res = await axios.patch(`/users`, {
      username: userData.username,
      email: userData.email,
      displayName: userData.displayName,
      photo: userData.photo,
      medicines: userData.medicines,
      illnesses: userData.illnesses,
      plans: userData.plans,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createEntry = async (entry, timestamp) => {
  try {
    const res = await axios.post(`http://localhost:4000/users/${}`, {entry: entry, timestamp: Date().now()})
  } catch (error) {
    console.log(error);
  }
}; 

export const videoRoom = async (roomId) => {
  try {
    let res = null;
    if (roomId) {
      res = await axios.get(`/video-chat/${roomId}`);
    } else {
      res = await axios.get(`/video-chat/${nanoid()}`);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};
