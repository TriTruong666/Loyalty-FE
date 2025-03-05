import { Product } from "./Product";

export interface Cart {
  cartItems: CartItem[];
  gifts: GiftItem[];
  customerIDOfSales?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface GiftItem {
  id: string;
  product: Product;
  quantity: number;
}
