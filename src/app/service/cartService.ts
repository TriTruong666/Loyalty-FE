import { Cart, GiftItem } from "../interfaces/Cart";
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

export const removeFromCart = (
  productId: string,
  setCart: (update: (prevCart: Cart) => Cart) => void
) => {
  setCart((prevCart) => {
    const updatedCart = {
      ...prevCart,
      cartItems: prevCart.cartItems.filter((item) => item.id !== productId),
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

    const updatedCart = { ...prevCart, cartItems: updatedCartItems };
    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};

export const addGiftToCartItem = (
  itemId: string,
  gift: Product | null,
  setCart: (update: (prevCart: Cart) => Cart) => void
) => {
  setCart((prevCart) => {
    let updatedGifts: GiftItem[] = [...(prevCart.gifts || [])];

    if (gift) {
      const existingGiftIndex = updatedGifts.findIndex(
        (giftItem) => giftItem.id === itemId
      );

      if (existingGiftIndex !== -1) {
        updatedGifts[existingGiftIndex] = {
          id: itemId,
          gifts: gift,
          quantity: 1,
        };
      } else {
        updatedGifts.push({ id: itemId, gifts: gift, quantity: 1 });
      }
    } else {
      updatedGifts = updatedGifts.filter((giftItem) => giftItem.id !== itemId);
    }

    const updatedCart = { ...prevCart, gifts: updatedGifts };
    saveCartToStorage(updatedCart);
    return updatedCart;
  });
};
