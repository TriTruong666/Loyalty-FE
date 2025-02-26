import { atom } from "jotai";
import { cartState } from "./cartAtoms";
import { Checkout } from "../interfaces/Checkout";

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

// export const checkoutState = atom<Checkout | null>((get) => {
//   const cart = get(cartState);
//   const paymentMethod = get(paymentMethodState);
//   const address = get(shippingAddressState);
//   const info = get(userInfoCheckoutState);
//   const note = get(noteCheckoutState);

//   if (!cart || !paymentMethod || !address || !info) return null;

//   return {
//     lineItems: cart
//       .map((item) => ({
//         id: item.product.productId ?? "", // Ensure it's a string
//         quantity: item.quantity,
//       }))
//       .filter((item) => item.id !== ""), // Filter out invalid items
//     gateway: paymentMethod,
//     shippingAddress: address,
//     note,
//     customer: info,
//   };
// });
