import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    username: "",
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
