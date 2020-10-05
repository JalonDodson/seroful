import { atom } from "recoil";

export const emailState = atom({
  key: "emailState",
  default: "",
});

export const pwState = atom({
  key: "pwState",
  default: "",
});
