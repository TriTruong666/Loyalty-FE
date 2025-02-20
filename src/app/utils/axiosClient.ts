import axios from "axios";
import Router from "next/router";
import { logoutService } from "../service/authenticateService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Token hết hạn, đăng xuất...");
      logoutService();
      Router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
