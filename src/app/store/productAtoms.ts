import { atom } from "jotai";

export const dataCreateProductState = atom({
  productId: "",
  productName: "",
  unit: "",
  handle: "",
  imageUrl: "",
  status: "dangban",
  brandId: "",
  price: 0,
  description: "",
});
