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
      localStorage.removeItem("cart");
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

interface Forget {
  email: string;
}

export const forgetPassService = async (data: Forget) => {
  try {
    const res = await axiosClient.post("/api/user/forgot-password", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyForgetService = async (data: Forget) => {
  try {
    const res = await axiosClient.post("/api/user/verify-otp", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

interface Reset {
  email: string;
  newPassword: string;
}
export const resetPassService = async (data: Reset) => {
  try {
    const res = await axiosClient.post("/api/user/reset-password", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
