import { atom, selector } from "recoil";
import { getPlans } from "../util/api";

export const userState = atom({
  key: "userState",
  default: {
    username: "",
    email: "",
    pw: "",
    displayName: "",
    photo: {},
    medicines: [],
    illnesses: [],
    plans: [],
    journals: [],
  },
});

export const userToken = atom({
  key: "userToken",
  default: "",
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