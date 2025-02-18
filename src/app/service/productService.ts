import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProductService = async () => {
  try {
    const url = `${API_URL}/api/product`;
    const res: AxiosResponse = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductServiceByLimit = async (page: number) => {
  try {
    const url = `${API_URL}/api/product/limit?page=${page}&limit=4`;
    const res: AxiosResponse = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface addProductProps {
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
  data: addProductProps
) => {
  try {
    const url = `${API_URL}/api/product?userID=${userId}`;
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
