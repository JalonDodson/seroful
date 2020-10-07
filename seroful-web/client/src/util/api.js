import axios from "axios";
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
      username: username,
      displayName: displayName,
      email: email,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const messages = async () => {
  try {
    const res = await axios.get("/messages");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const profile = async () => {
  try {
    const res = await axios.get("/profile");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const videoRoom = async () => {
  try {
    const res = await axios.get("/video-room");
    return res;
  } catch (error) {
    console.log(error);
  }
};

/*
  registration, cancellation functions here
  call the registration function (for the email) inside
  register function in LoginForm.js
*/
