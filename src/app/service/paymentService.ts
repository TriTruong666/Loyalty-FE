import { Payment } from "../interfaces/Payment";
import axiosClient from "../utils/axiosClient";

export const createPaymentQR = async (data: Payment) => {
  try {
    const res = await axiosClient.post(`/acb/qr`, data, {
      headers: {
        Authorization: `Basic ${process.env.NEXT_PUBLIC_ACB_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
