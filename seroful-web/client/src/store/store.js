import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    first: "",
    last: "",
    email: "",
    pw: "",
    displayName: "",
    photoURL: "",
    gradeLevel: 0,
    medicines: [{}],
    illnesses: [{}],
    plans: [{}],
  },
});

export const userToken = atom({
  key: "userToken",
  default: "",
});
