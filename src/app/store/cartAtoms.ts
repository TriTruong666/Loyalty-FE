import { atom } from "jotai";
import { Cart } from "../interfaces/Cart";
import { userInfoState } from "./accountAtoms";

export const cartState = atom<Cart>({
  cartItems: [],
  gifts: [],
});

export const subtotalCartValueAtom = atom((get) => {
  const cart = get(cartState);
  return cart.cartItems.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );
});

export const discountCustomState = atom((get) => {
  const info = get(userInfoState);
  const cart = get(cartState);

  if (!info || !info.rank) return 0;

  const discountPercent =
    info.type === "sales" ? info.rank.discountCustom ?? 0 : 0;

  const subtotal = cart.cartItems.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );

  return subtotal * discountPercent;
});

export const discountUniqueState = atom((get) => {
  const cart = get(cartState);
  const info = get(userInfoState);

  if (!info || !info.rank) return 0;

  const discountPercent =
    info.type === "business"
      ? info.rank.discountBusiness ?? 0
      : info.rank.discountPersonal ?? 0;
  const subtotal = cart.cartItems.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );

  return subtotal * discountPercent;
});

export const discountPPState = atom((get) => {
  const cart = get(cartState);
  const info = get(userInfoState);

  if (!info || !info.rank) return 0;

  const discountPP = info.rank.discountPP ?? 0;

  const ppCart = cart.cartItems.filter(
    (item) => item.product.brand?.type === "phanphoi"
  );

  const ppSubtotal = ppCart.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );

  return (ppSubtotal * discountPP) / 100;
});

export const totalCartValueAtoms = atom((get) => {
  const subtotal = get(subtotalCartValueAtom);
  const discountUnique = get(discountUniqueState);
  const discountPP = get(discountPPState);
  const discountCustom = get(discountCustomState);
  return subtotal - discountUnique - discountPP - discountCustom;
});

export const estimatePointState = atom((get) => {
  const total = get(totalCartValueAtoms);
  return Math.floor(total / 100000);
});
