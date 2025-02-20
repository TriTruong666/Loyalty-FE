import axiosClient from "../utils/axiosClient";

export const getUserInfo = async () => {
  try {
    const res = await axiosClient.get("/api/user/userinfo");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
