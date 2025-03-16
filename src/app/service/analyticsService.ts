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
