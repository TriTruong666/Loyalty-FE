import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllBrand = async () => {
  try {
    const url = `${API_URL}/api/brand`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
