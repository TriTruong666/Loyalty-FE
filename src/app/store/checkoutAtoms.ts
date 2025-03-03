import { atom } from "jotai";
import { cartState } from "./cartAtoms";
import { Checkout } from "../interfaces/Checkout";
import { userInfoState } from "./accountAtoms";

export const paymentMethodState = atom("");

export const userInfoCheckoutState = atom({
  customerName: "",
  customerPhone: "",
  customerId: "",
});

export const shippingAddressState = atom({
  provinceCode: "",
  districtCode: "",
  wardCode: "",
  street: "",
});

export const noteCheckoutState = atom("");

export const checkoutState = atom<Checkout | null>((get) => {
  const cart = get(cartState);
  const paymentMethod = get(paymentMethodState);
  const address = get(shippingAddressState);
  const info = get(userInfoCheckoutState);
  const note = get(noteCheckoutState);
  const user = get(userInfoState);
  const discountCustom = user?.rank.discountCustom;
  if (!paymentMethod || !address || !info) return null;

  return {
    lineItems: cart.cartItems
      .map((item) => ({
        productID: item.product.productId ?? "",
        amount: item.quantity,
      }))
      .filter((item) => item.productID !== ""),
    gateway: paymentMethod,
    shippingAddress: address,
    note,
    customer: info,
    discountCustom,
  };
});
