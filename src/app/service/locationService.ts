import axiosClient from "../utils/axiosClient";

export const getAllProvinces = async () => {
  try {
    const res = await axiosClient.get("/api/province");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDistrictsByProvinceId = async (provinceId: string) => {
  try {
    const res = await axiosClient.get(`/api/district/byprovince/${provinceId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getWardsByDistrictId = async (districtId: string) => {
  try {
    const res = await axiosClient.get(`/api/ward/bydistrict/${districtId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
