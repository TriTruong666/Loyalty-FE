import axios from "axios";
import axiosClient from "../utils/axiosClient";
export const getUserInfo = async () => {
  try {
    const res = await axiosClient.get("/api/user/userinfo");
    return res.data;
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
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
export const getAllCustomerUser = async () => {
  try {
    const res = await axiosClient.get(
      `/api/user/limitcustomer?limit=1000000&page=1&status=active`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
interface CreateAddress {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  street: string;
}

interface CreateUser {
  userName: string;
  email: string;
  phoneNumber: string;
  birthday?: string;
  address: CreateAddress;
  mst?: string;
  type: string;
}

export const createAccountService = async (data: CreateUser) => {
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

interface PercentCustom {
  discountCustom: number;
}

export const updateCustomPercent = async (
  userId: string,
  percent: PercentCustom
) => {
  try {
    const res = await axiosClient.put(`/api/user/update/${userId}`, percent);
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

export const getAllSalesCustomer = async () => {
  try {
    const res = await axiosClient.get(`/api/salescustomer`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSalesCustomerByLimit = async (page: number, limit: number) => {
  try {
    const res = await axiosClient.get(
      `/api/SalesCustomer/limit?limit=${limit}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface SalesCustomer {
  userName: string;
  phoneNumber: string;
  salePersonID: string;
  mst: string;
}

export const createSalesCustomer = async (data: SalesCustomer) => {
  try {
    const res = await axiosClient.post(`/api/salescustomer`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface UpdateAddress {
  provincecode?: string;
  districtcode?: string;
  wardcode?: string;
  street?: string;
}

export interface UpdateUser {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  birthday?: string;
  address?: UpdateAddress;
  mst?: string;
  type?: string;
  status?: string;
  note?: string;
  discountCustom?: number;
}

export const updateUserService = async (userId: string, data: UpdateUser) => {
  try {
    const res = await axiosClient.put(`/api/user/update/${userId}`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface ChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export const ChangePasswordService = async (data: ChangePassword) => {
  try {
    const res = await axiosClient.post(`/api/user/change-password`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const blockAccountService = async (id: string) => {
  try {
    const res = await axiosClient.post(`/api/user/ban/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const unlockAccountService = async (id: string) => {
  try {
    const res = await axiosClient.post(`/api/user/unban/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAnonymousRankingService = async (type: string) => {
  try {
    const res = await axiosClient.get(
      `/api/user/anonymousRanking?type=${type}&limit=5`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
