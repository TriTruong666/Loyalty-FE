import { Checkout } from "../interfaces/Checkout";
import axiosClient from "../utils/axiosClient";

export const createOrderService = async (data: Checkout) => {
  try {
    const res = await axiosClient.post(`/api/order`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
