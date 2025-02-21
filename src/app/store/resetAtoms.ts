import { atom } from "jotai";

export const resetProgressState = atom(1);

export const dataForgetState = atom({
  email: "",
});

export const dataForgetVerifyState = atom({
  email: "",
  otp: "",
});

export const dataResetState = atom({
  email: "",
  newPassword: "",
  confirmPassword: "",
});
