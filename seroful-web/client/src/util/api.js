import axios from "axios";
/*
  While in development, http://localhost:4000/ should be used for all API requests.
  When built, only /path should be used in the axios requests.
*/

export const users = async (token) => {
  try {
    const res = await axios.get("http://localhost:4000/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return res;
  } catch (err) {
    console.log(err);
  }
};
