import axiosClient from "../utils/axiosClient";

export const getUserInfo = async () => {
  try {
    const res = await axiosClient.get("/api/user/userinfo");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUser = async () => {
  try {
    const res = await axiosClient.get("/api/user");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const getUserByLimit = async (page: number) => {
  try {
    const res = await axiosClient.get(`/api/user/limit?limit=8&page=${page}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface Address {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  street: string;
}

interface User {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthday?: string;
  address: Address;
  mst?: string;
  type: string;
}

export const createAccountService = async (data: User) => {
  try {
    const res = await axiosClient.post(`/api/user/create`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
