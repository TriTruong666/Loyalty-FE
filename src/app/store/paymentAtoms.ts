import { atom } from "jotai";

export const paymentState = atom({
  amount: "",
  orderID: "",
  userID: "",
  description: "",
});

export const qrImageState = atom("");
