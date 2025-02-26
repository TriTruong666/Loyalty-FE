import { atom } from "jotai";
import { Cart } from "../interfaces/Cart";
import { userInfoState } from "./accountAtoms";

export const cartState = atom<Cart>([]);

export const subtotalCartValueAtom = atom((get) => {
  const cart = get(cartState);
  return cart.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );
});

export const discountUniqueState = atom((get) => {
  const cart = get(cartState);
  const info = get(userInfoState);

  if (!info || !info.rank) return 0;

  const discountPercent =
    info.type === "business"
      ? info.rank.discountBusiness ?? 0
      : info.rank.discountPersonal ?? 0;
  const subtotal = cart.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );

  return subtotal * discountPercent;
});

export const discountPPState = atom((get) => {
  const cart = get(cartState);
  const info = get(userInfoState);

  if (!info || !info.rank) return 0; // Không có thông tin, không giảm giá

  const discountPP = info.rank.discountPP ?? 0; // Lấy phần trăm giảm giá PP

  // Lọc ra các sản phẩm có brand.type === "phanphoi"
  const ppCart = cart.filter((item) => item.product.brand?.type === "phanphoi");

  // Tính tổng tiền của các sản phẩm thuộc phân phối
  const ppSubtotal = ppCart.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );

  return (ppSubtotal * discountPP) / 100;
});
