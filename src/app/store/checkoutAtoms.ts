import { atom } from "jotai";
import { cartState } from "./cartAtoms";
import { Checkout } from "../interfaces/Checkout";
import { userInfoState } from "./accountAtoms";

export const checkoutResponseState = atom("");

export const paymentMethodState = atom("");

export const salesCustomerState = atom("");

export const salesCustomerNameState = atom("");

export const salesCustomerPhoneState = atom("");

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
  const salesCustomer = get(salesCustomerState);
  const user = get(userInfoState);
  const salesCustomerName = get(salesCustomerNameState);
  const salesCustomerPhone = get(salesCustomerPhoneState);
  if (
    paymentMethod === "" ||
    address.districtCode === "" ||
    address.provinceCode === "" ||
    address.street === "" ||
    address.wardCode === ""
  )
    return null;
  if (user?.type !== "sales") {
    if (info.customerName === "" || info.customerPhone === "") return null;
  }
  if (user?.type === "sales") {
    if (salesCustomerName === "" && salesCustomerPhone === "") return null;
  }
  return {
    lineItems: cart.cartItems
      .map((item) => ({
        productID: item.product.productId ?? "",
        amount: item.quantity,
        discount: item.discount,
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
  };
});
