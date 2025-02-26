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
export const getUserByLimitByTypeByStatus = async (
  page: number,
  type: string,
  status: string
) => {
  try {
    const res = await axiosClient.get(
      `/api/user/limit?limit=8&page=${page}&role=${type}&status=${status}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByLimitByStatus = async (page: number, status: string) => {
  try {
    const res = await axiosClient.get(
      `/api/user/limit?limit=8&page=${page}&status=${status}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByLimitByType = async (page: number, type: string) => {
  try {
    const res = await axiosClient.get(
      `/api/user/limit?limit=8&page=${page}&role=${type}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const getCustomerUserByLimitByStatus = async (
  page: number,
  status: string
) => {
  try {
    const res = await axiosClient.get(
      `/api/user/limitcustomer?limit=8&page=${page}&status=${status}`
    );
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

export const deleteAccountService = async (userId: string) => {
  try {
    const res = await axiosClient.delete(`/api/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface Note {
  note: string;
}

export const updateUserNote = async (userId: string, note: Note) => {
  try {
    const res = await axiosClient.put(`/api/user/update/${userId}`, note);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const approveUser = async (userId: string) => {
  try {
    const res = await axiosClient.put(`/api/user/approve/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
