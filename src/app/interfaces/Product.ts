import { Brand } from "./Brand";

export interface Product {
  productId?: string;
  productName?: string;
  unit: string;
  price?: number;
  handle?: string;
  imageUrl?: string;
  description: string | Node;
  createdBy?: string | null;
  createdDate?: string | null;
  updatedBy?: string | null;
  updatedDate?: string | null;
  status?: string;
  brand?: Brand;
  brandId: string;
}
