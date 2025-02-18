import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Login {
  email: string;
  pass: string;
}

export const loginService = async (data: Login) => {
  try {
    const url = `${API_URL}/api/user/login`;
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyLoginService = async (data: Login) => {
  try {
    const url = `${API_URL}/api/user/otp`;
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
