import axios from "axios";

export const users = async () => {
  try {
    const res = await axios.get("/users");
    return res;
  } catch (err) {
    console.log(err);
  }
};
