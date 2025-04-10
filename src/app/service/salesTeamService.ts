import axiosClient from "../utils/axiosClient";

export const getAllSalesTeam = async () => {
  try {
    const res = await axiosClient.get(`/api/salesteam`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
