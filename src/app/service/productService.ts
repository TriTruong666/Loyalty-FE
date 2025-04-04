import axiosClient from "../utils/axiosClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProductService = async () => {
  try {
    const url = `${API_URL}/api/product`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductServiceByLimit = async (
  page: number,
  mode: string,
  sortBy: string
) => {
  try {
    const url = `${API_URL}/api/product/limit?page=${page}&limit=8&mode=${mode}&sortBy=${sortBy}`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface productProps {
  productID: string;
  productName: string;
  unit: string;
  handle: string;
  imageUrl: string;
  status: string;
  brandId: string;
  price: number;
}

export const createProductService = async (
  userId: string,
  data: productProps
) => {
  try {
    const url = `${API_URL}/api/product?userID=${userId}`;
    const res = await axiosClient.post(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductService = async (
  userId: string,
  data: productProps
) => {
  try {
    const url = `${API_URL}/api/product?userID=${userId}`;
    const res = await axiosClient.put(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductService = async (productId: string) => {
  try {
    const url = `${API_URL}/api/product/${productId}`;
    const res = await axiosClient.delete(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductByBrand = async (
  handle: string,
  status: string,
  sortBy: string
) => {
  try {
    const res = await axiosClient.get(
      `/api/product/by-brand-handle/${handle}?status=${status}&sortBy=${sortBy}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductDetailByHandle = async (handle: string) => {
  try {
    const res = await axiosClient.get(`/api/product/${handle}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchProductByKeyword = async (keyword: string) => {
  try {
    const res = await axiosClient.get(
      `/api/product/keyword?keyword=${keyword}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
