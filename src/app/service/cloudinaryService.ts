import axios, { AxiosResponse } from "axios";
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET_NAME = process.env.NEXT_PUBLIC_UPLOAD_PRESET_NAME;

export const uploadFileService = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET_NAME as string);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME as string);

    const res: AxiosResponse = await axios.post(
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
