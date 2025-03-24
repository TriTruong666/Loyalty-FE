import axiosClient from "../utils/axiosClient";

export const getLoyaltyInfo = async (type: string) => {
  try {
    const res = await axiosClient.get(`/api/loyalty?type=${type}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
