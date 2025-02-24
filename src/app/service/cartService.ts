import { Cart } from "../interfaces/Cart";
import { Product } from "../interfaces/Product";

export const getCartFromStorage = (): Cart => {
  if (typeof window === "undefined") return [];

  const storage = localStorage.getItem("cart");
  return storage ? JSON.parse(storage) : [];
};

export const saveCartToStorage = (cart: Cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const addToCart = (
  product: Product,
  quantity: number,
  setCart: (update: (prevCart: Cart) => Cart) => void
) => {
  setCart((prevCart) => {
    const existingProductIndex = prevCart.findIndex(
      (item) => item.product.productId === product.productId
    );

    let updatedCart;
    if (existingProductIndex !== -1) {
      updatedCart = [...prevCart];
      updatedCart[existingProductIndex].quantity += quantity;
    } else {
      updatedCart = [
        ...prevCart,
        {
          id: crypto.randomUUID(),
          product,
          quantity,
        },
      ];
    }

    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};

export const removeFromCart = (
  productId: string,
  setCart: (update: (prevCart: Cart) => Cart) => void
) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.filter((item) => item.id !== productId);
    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};

export const updateCartItemQuantity = (
  itemId: string,
  quantity: number,
  setCart: (update: (prevCart: Cart) => Cart) => void
) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(quantity, 1) } : item
    );

    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};
