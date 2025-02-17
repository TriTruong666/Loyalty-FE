import { v2 as cloudinary } from "cloudinary";

const config = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_SECRET_API,
};

cloudinary.config(config);
