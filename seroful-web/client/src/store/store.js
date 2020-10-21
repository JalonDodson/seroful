import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    username: "",
    email: "",
    pw: "",
    displayName: "",
    photoURL: "",
    medicines: [],
    illnesses: [],
    plans: [],
    journals: [],
  },
});

export const msgState = atom({
  key: "msgState",
  default: "",
});

export const loginHelperState = atom({
  key: "loginHelperState",
  default: {
    txt: "",
    errorMsg: "",
    emailError: false,
    pwError: false,
  },
});

export const registerHelperState = atom({
  key: "registerHelperState",
  default: {
    txt: "",
    pwText: "",
    userTxt: "",
    emailError: false,
    pwError: false,
    userError: false,
  },
});

export const newUser = atom({
  key: "newUser",
  default: false,
});

export const videoToken = atom({
  key: "videoToken",
  default: "",
});

export const roomData = atom({
  key: "roomData",
  default: "",
});

export const pwChanged = atom({
  key: "pwChanged",
  default: false,
});
