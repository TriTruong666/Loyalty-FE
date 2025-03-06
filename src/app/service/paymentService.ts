import { Payment } from "../interfaces/Payment";
import axiosClient from "../utils/axiosClient";

export const createPaymentQR = async (data: Payment) => {
  try {
    const res = await axiosClient.post(`/acb/qr`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
