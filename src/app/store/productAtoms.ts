import { atom } from "jotai";
import { Product } from "../interfaces/Product";

export const dataCreateProductState = atom({
  productId: "",
  productName: "",
  unit: "",
  imageUrl: "",
  status: "dangban",
  brandId: "",
  price: 0,
  description: "",
});

export const dataUpdateProductState = atom<Product>({
  productId: "",
  productName: "",
  unit: "",
  imageUrl: "",
  status: "dangban",
  brandId: "",
  price: 0,
  description: "",
});

export const productDetailState = atom("");
