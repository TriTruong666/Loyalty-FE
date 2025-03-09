import axiosClient from "../utils/axiosClient";

interface CreateNoti {
  title: string;
  content: string;
}

export const createNotificationService = async (data: CreateNoti) => {
  try {
    const res = await axiosClient.post(`/api/notification`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getListNotification = async () => {
  try {
    const res = await axiosClient.get(`/api/notification`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailNotification = async (id: string) => {
  try {
    const res = await axiosClient.get(`/api/notification/id/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
