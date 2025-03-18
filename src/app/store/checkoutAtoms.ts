import { atom } from "jotai";
import { cartState } from "./cartAtoms";
import { Checkout } from "../interfaces/Checkout";
import { userInfoState } from "./accountAtoms";

export const checkoutResponseState = atom("");

export const paymentMethodState = atom("");

export const salesCustomerState = atom("");

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
  const salesCustomer = get(salesCustomerState);

  if (
    paymentMethod === "" ||
    address.districtCode === "" ||
    address.provinceCode === "" ||
    address.street === "" ||
    address.wardCode === "" ||
    info.customerName === "" ||
    info.customerPhone === ""
  )
    return null;

  return {
    lineItems: cart.cartItems
      .map((item) => ({
        productID: item.product.productId ?? "",
        amount: item.quantity,
      }))
      .filter((item) => item.productID !== ""),
    gifts: cart.gifts
      .map((item) => ({
        productID: item.product.productId ?? "",
        amount: item.quantity,
      }))
      .filter((item) => item.productID !== ""),
    gateway: paymentMethod,
    shippingAddress: address,
    customerIDOfSales: salesCustomer,
    note,
    customer: info,
    discountCustom,
  };
});
