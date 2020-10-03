/* Everything related to our API will go here. All front-end requests to the back-end will be routed through here. If you're unsure of what belongs here, ask in Slack or Discord. Starting out will be the shells of the API functions. Request/function names should be built with the following syntax: targetAction.

Firestore Example: 
  firestore()
    .collection("users")
    .doc("chippickering231")
    .set({
        first: "Chip",
        last: "Pickering",
        age: 30,
    })
    .then(() => {
        console.log("User added!");
    })
    .catch((err) => console.log(err));
*/
import axios from "axios";
import firestore from "@react-native-firebase/firestore";

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
const userLogin = () => {};
const userLogout = () => {};
const userRegister = () => {};
const userUpdate = () => {};

const messageCreate = () => {};
const messageDelete = () => {};
const messageUpdate = () => {};

const planCreate = () => {};
const planList = () => {};
const planUpdate = () => {};
