import axios from "axios";

export const users = async () => {
  try {
    const res = await axios.get("/users");
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const messages = async () => {
  try {
    const res = await axios.get('/messages');
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const profile = async () => {
  try {
    const res = await axios.get('/profile');
    return res;
  } catch (error) {
    console.log(error);
  }
};
