import axiosClient from "../utils/axiosClient";

export const getOrderTotalValueService = async () => {
  try {
    const res = await axiosClient.get(`/api/analytic/ordervalue`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderValueByTime = async (from: string, to: string) => {
  try {
    const res = await axiosClient.get(
      `/api/analytic/ordervalue?from=${from}&to=${to}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderValueByDaily = async (from: string, to: string) => {
  try {
    const res = await axiosClient.get(
      `/api/analytic/sum-price-daily?from=${from}&to=${to}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderValueByYear = async () => {
  try {
    const res = await axiosClient.get(`/api/analytic/yearly-revenue`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderValueByTransactionStatus = async (status: string) => {
  try {
    const res = await axiosClient.get(
      `/api/Analytic/sum-price-by-transaction-status?transactionStatus=${status}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const getOrderValueByGateway = async (gateway: string) => {
  try {
    const res = await axiosClient.get(
      `/api/Analytic/sum-price-by-gateway?gateway=${gateway}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
