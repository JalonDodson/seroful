/* Everything related to our API will go here. All front-end requests to the back-end will be routed through here. If you're unsure of what belongs here, ask in Slack or Discord. Starting out will be the shells of the API functions. Request/function names should be built with the following syntax: targetAction.

Firestore Example: 
  firestore()
    .collection("users")
    .doc(email)
    .set({
        first: "",
        last: "",
        age: 0,
    })
    .then(() => {
        console.log("User added!");
    })
    .catch((err) => console.log(err));
*/
import axios from "axios";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const userCheckIn = () => {};
const userCheckInList = () => {};
const userDelete = () => {};
export const userList = async () => {
  try {
    await firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        console.log("Total number of users: ", querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          console.log("Users: ", documentSnapshot.data());
        });
      });
  } catch (err) {
    console.log(err);
  }
};
export const userLogin = async (userData) => {
  const { email, pw } = userData;
  try {
    auth()
      .signInWithEmailAndPassword(email, pw)
      .then(() => console.log("User signed in ", email))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err)
  }
};
const userLogout = () => {};
export const userRegister = async (userData) => {
  const { first, last, email, pw } = userData;
  try {
    auth()
      .createUserWithEmailAndPassword(email, pw)
      .then(() => {
        console.log(`User created with email: ${email}`);
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          console.error("Email already in use, nothing done.");
          return "That email is already in use!";
        }
        if (err.code === "auth/invalid-email") {
          console.log("Email invalid, nothing happened.");
          return "That email is invalid, please try again.";
        }
        console.log(err);
      });

    await firestore().collection("users").doc(email).set({
      first: first,
      last: last,
      email: email,
    });
  } catch (err) {
    console.log(err);
  }
};
const userUpdate = () => {};

const messageCreate = () => {};
const messageDelete = () => {};
const messageUpdate = () => {};

const planCreate = () => {};
const planList = () => {};
const planUpdate = () => {};
