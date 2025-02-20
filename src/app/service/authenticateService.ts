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

export const verifyLoginService = async (data: Login) => {
  try {
    const res = await axiosClient.post("/api/user/otp", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutService = () => {
  localStorage?.removeItem("token");
  localStorage?.removeItem("account");
};
