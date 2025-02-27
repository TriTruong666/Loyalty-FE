import axiosClient from "../utils/axiosClient";

export const getOrderByLimitByStatus = async (page: number, status: string) => {
  try {
    const res = await axiosClient.get(
      `/api/order/limit?limit=8&page=${page}&status=${status}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrders = async () => {
  try {
    const res = await axiosClient.get(`/api/order`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
