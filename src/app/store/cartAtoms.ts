import { atom } from "jotai";
import { Cart } from "../interfaces/Cart";

export const cartState = atom<Cart>([]);

export const totalCartValueAtom = atom((get) => {
  const cart = get(cartState);
  return cart.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );
});
