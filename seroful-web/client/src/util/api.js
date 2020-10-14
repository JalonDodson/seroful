import axios from "axios";
import firebase from "firebase";
import "firebase/auth";

/*
  While in development, http://localhost:4000/ should be used for all API requests.
  When built, only /path should be used in the axios requests.
*/
// axios stuff
const instance = axios.create({ baseURL: "http://localhost:4000"});

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
  try {
    const res = await instance.post(`/users`, {
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
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

    const email =
    firebase.auth().currentUser && (await firebase.auth().currentUser.email);

  try {
    const res = await instance.patch(
      `/users?email=${email}`,
      {
        username: userData.username,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        medicines: userData.medicines,
        illnesses: userData.illnesses,
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

export const uploadPhoto = async (photo) => {
  const token =
  firebase.auth().currentUser &&
  (await firebase.auth().currentUser.getIdToken());

try {
  const res = await instance.post("/users/photo/upload", photo, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data; boundary=${photo._boundary}`
    }
  }).then(res => res.data);
  console.log(res);
  return res;
} catch (err) {
  console.log(err);
}
}

export const getUserList = async () => {
  try {
    const res = await instance
      .get(`/users?filterAll=true`)
      .then((resp) => resp.data);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addFriend = async (to, from) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  const email =
    firebase.auth().currentUser && (await firebase.auth().currentUser.email);

  try {
    const res = await instance
      .post(
        `/users/friends?email=${email}&isPending=true`,
        {
          username: to,
          requestee: from,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => resp.data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const acceptFriend = async (acceptedName, accepteeName) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  const email =
    firebase.auth().currentUser && (await firebase.auth().currentUser.email);
  try {
    const res = await instance
      .post(
        `/users/friends?email=${email}&isPending=false`,
        {
          username: acceptedName,
          acceptee: accepteeName,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => resp.data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteRequest = async (deniedName, denierName) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  const email =
    firebase.auth().currentUser && (await firebase.auth().currentUser.email);
  try {
    const res = await instance
      .delete(
        `/users/friends?email=${email}?isRejection=true`,
        {
          username: deniedName,
          denier: denierName,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
<<<<<<< HEAD
      }).then(resp => resp.data);
      return res;
    } catch (err) {
      console.log(err);
    }
    }

=======
      )
      .then((resp) => resp.data);
    return res;
  } catch (err) {
    console.log(err);
  }
};
>>>>>>> d1cc2c766914fa750f3e9ce376422bdde0f266df

export const createEntry = async (entry) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  const email =
    firebase.auth().currentUser && (await firebase.auth().currentUser.email);

  try {
    const res = await instance.patch(
      `/users/journal/entries?email=${email}`,
      {
        entry: entry,
        timestamp: Date.now(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getEntries = async () => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  const email =
    firebase.auth().currentUser && (await firebase.auth().currentUser.email);

  try {
    const res = await instance
      .get(`/users/journal/entries?email=${email}`, {
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

export const getPlans = async () => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  const email =
    firebase.auth().currentUser && (await firebase.auth().currentUser.email);

  try {
    const res = await instance
      .get(`/users/planner/plans?email=${email}`, {
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

export const createPlan = async (userData) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  const email =
    firebase.auth().currentUser && (await firebase.auth().currentUser.email);

  try {
    const res = await instance
      .patch(
        `/users/planner/plans?email=${email}`,
        {
          timestamp: Date.now(),
          dayLength: userData.dayLength,
          homework: userData.homework,
          mealtimes: userData.mealtimes,
          breaks: userData.breaks,
          appt: userData.appt,
          goals: userData.goals,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createRoom = async (username, roomName) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  try {
    const res = await instance
      .post(
        `/video`,
        {
          identity: username,
          roomName: roomName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => resp.data);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
// await instance.get(`/video?room=${roomName}
export const connectToRoom = async (identity, roomName) => {
  const token =
    firebase.auth().currentUser &&
    (await firebase.auth().currentUser.getIdToken());

  try {
    const res = await instance
      .post(
        `/video?room=${roomName}&newConnection=true`,
        {
          identity: identity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => resp.data);
    return res;
  } catch (err) {
    console.log(err);
  }
};
