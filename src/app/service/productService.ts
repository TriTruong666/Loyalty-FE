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

export const getProductServiceByLimit = async () => {
  try {
    const url = `${API_URL}/api/product/limit?page=1&limit=2`;
    const res: AxiosResponse = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
