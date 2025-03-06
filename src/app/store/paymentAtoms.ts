import { atom } from "jotai";
import { totalCartValueAtoms } from "./cartAtoms";
import { userInfoState } from "./accountAtoms";
import { checkoutResponseState } from "./checkoutAtoms";
import { Payment } from "../interfaces/Payment";

export const paymentState = atom<Payment | null>((get) => {
  const amount = get(totalCartValueAtoms);
  const info = get(userInfoState);
  const orderId = get(checkoutResponseState);

  if (!amount || !info || !orderId) return null;

  return {
    amount: amount,
    orderID: orderId,
    userID: info.userId,
    description: `PicareVN Loyalty ${orderId}`,
  };
});
