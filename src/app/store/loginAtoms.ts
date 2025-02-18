import { atom } from "jotai";

export const loginProgressState = atom(1);

export const dataLoginState = atom({
  email: "",
  pass: "",
});

export const dataVerifyOTPState = atom({
  email: "",
  pass: "",
});
