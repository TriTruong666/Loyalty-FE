import { Product } from "./Product";

export type Cart = CartItem[];

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
