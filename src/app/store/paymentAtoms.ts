import { atom } from "jotai";

export const paymentState = atom({
  amount: "",
  orderID: "",
  userID: "",
  description: "",
});

export const qrImageState = atom("");

export const responsePaymentState = atom({
  amount: "",
  orderID: "",
  userID: "",
  description: "",
});
