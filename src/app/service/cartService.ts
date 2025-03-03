import { Cart } from "../interfaces/Cart";
import { Product } from "../interfaces/Product";

export const getCartFromStorage = (): Cart => {
  if (typeof window === "undefined") return { cartItems: [], gifts: [] };

  const storage = localStorage.getItem("cart");
  return storage ? JSON.parse(storage) : { cartItems: [], gifts: [] };
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
    const existingProductIndex = prevCart.cartItems.findIndex(
      (item) => item.product.productId === product.productId
    );

    let updatedCart: Cart;
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...prevCart.cartItems];
      updatedCartItems[existingProductIndex].quantity += quantity;
      updatedCart = { ...prevCart, cartItems: updatedCartItems };
    } else {
      updatedCart = {
        ...prevCart,
        cartItems: [
          ...prevCart.cartItems,
          {
            id: crypto.randomUUID(),
            product,
            quantity,
          },
        ],
      };
    }

    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};

export const addGiftsToCart = (
  gift: Product,
  quantity: number,
  setCart: (update: (prevCart: Cart) => Cart) => void
) => {
  setCart((prevCart) => {
    const existingGiftIndex = prevCart.gifts.findIndex(
      (item) => item.product.productId === gift.productId
    );

    let updatedCart: Cart;
    if (existingGiftIndex !== -1) {
      const updatedGifts = [...prevCart.gifts];
      updatedGifts[existingGiftIndex].quantity += quantity;
      updatedCart = { ...prevCart, gifts: updatedGifts };
    } else {
      updatedCart = {
        ...prevCart,
        gifts: [
          ...prevCart.gifts,
          {
            id: crypto.randomUUID(),
            product: gift,
            quantity,
          },
        ],
      };
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
    const updatedCart = {
      ...prevCart,
      cartItems: prevCart.cartItems.filter((item) => item.id !== productId),
      gifts: prevCart.gifts.filter((item) => item.id !== productId), // Ensure gifts are removed too
    };

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
    const updatedCartItems = prevCart.cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(quantity, 1) } : item
    );

    const updatedGifts = prevCart.gifts.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(quantity, 1) } : item
    );

    const updatedCart = {
      ...prevCart,
      cartItems: updatedCartItems,
      gifts: updatedGifts,
    };
    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};
