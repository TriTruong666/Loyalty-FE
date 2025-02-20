import {
  CloudinaryAsset,
  DeleteFile,
  Signature,
} from "../interfaces/Cloudinary";
import axiosClient from "../utils/axiosClient";
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET_NAME = process.env.NEXT_PUBLIC_UPLOAD_PRESET_NAME;
const HOST_URL = process.env.NEXT_PUBLIC_API_URL;
export const uploadFileService = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET_NAME as string);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME as string);
    const res = await axiosClient.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    console.log(res.data);
    return res.data.url;
  } catch (error) {
    console.error("Lỗi khi tải ảnh lên Cloudinary:", error);
    return null;
  }
};

export const createSignatureService = async (data: Signature) => {
  try {
    const url = `${HOST_URL}/api/cloudinary`;
    const res = await axiosClient.post(url, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFileService = async (data: DeleteFile) => {
  try {
    const formData = new FormData();
    formData.append("public_id", data.public_id);
    formData.append("api_key", data.api_key);
    formData.append("timestamp", data.timestamp);
    formData.append("signature", data.signature);
    const res = await axiosClient.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
      formData
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return false;
  }
};

export const getAllAssets = async (): Promise<CloudinaryAsset[]> => {
  try {
    const url = `${HOST_URL}/api/cloudinary`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAssetsByLimit = async (page: number) => {
  try {
    const url = `${HOST_URL}/api/cloudinary/limit?limit=10&page=${page}`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
