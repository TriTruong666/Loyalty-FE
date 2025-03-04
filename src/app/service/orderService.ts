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

interface UpdateOrderData {
  orderID: string;
  orderStatus?: string;
  note?: string;
  attachment?: string;
}

export const updateOrderService = async (data: UpdateOrderData) => {
  try {
    const res = await axiosClient.put(`/api/order/update`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface UpdateTransactionData {
  id: string;
  transactionStatus?: string;
}

export const updateTransactionService = async (data: UpdateTransactionData) => {
  try {
    const res = await axiosClient.put(`/api/transaction`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailOrderService = async (orderId: string) => {
  try {
    const res = await axiosClient.get(`/api/order/id/${orderId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
