import axiosClient from "../utils/axiosClient";

interface Login {
  email: string;
  pass: string;
}

export const loginService = async (data: Login) => {
  try {
    const res = await axiosClient.post("/api/user/login", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutService = async () => {
  try {
    const res = await axiosClient.post("/api/user/logout");

    if (typeof window !== "undefined") {
      window.location.reload();
    }

    return res.data;
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const verifyLoginService = async (data: Login) => {
  try {
    const res = await axiosClient.post("/api/user/otp", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
