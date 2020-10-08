import axios from "axios";
import { nanoid } from 'nanoid';
/*
  While in development, http://localhost:4000/ should be used for all API requests.
  When built, only /path should be used in the axios requests.
*/

/*
  import sendgrid here
  import sendgrid api key here
*/

export const users = async (token) => {
  try {
    const res = await axios.get("http://localhost:4000/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (username, displayName, email) => {
  try {
    const res = await axios.post(`http://localhost:4000/users`, {
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
    const res = await axios.patch(`http://localhost:4000/users`, {
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
      res = await axios.get(`/video-chat/${nanoid()}`)
    }
    return res;
  } catch (error) {
    console.log(error)
  }
};

/*
  registration, cancellation functions here
  call the registration function (for the email) inside
  register function in LoginForm.js
*/
