import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { updateImageModalState } from "../store/modalAtoms";
import { userInfoState } from "../store/accountAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductService } from "../service/productService";
import { showToast } from "../utils/toast";
import { uploadFileService } from "../service/cloudinaryService";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from "@heroui/react";
import { dataUpdateProductState } from "../store/productAtoms";

export default function UpdateImageProduct() {
  const isToggleModal = useAtomValue(updateImageModalState);
  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[700px] 2xl:max-h-[700px] bg-black flex flex-col transition-all duration-300 items-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <ImageDropZone />
      </div>
    </div>
  );
}

function ImageDropZone() {
  const setModal = useSetAtom(updateImageModalState);
  const [submitData, setSubmitData] = useAtom(dataUpdateProductState);
  const userInfo = useAtomValue(userInfoState);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitFile, setIsSubmitFile] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationKey: ["update-image"],
    mutationFn: async ({ userId, data }: { userId: string; data: any }) =>
      updateProductService(userId, data),
    onMutate: () => setIsUploading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Thêm ảnh thành công", "success");
      setSubmitData({
        productId: "",
        productName: "",
        unit: "",
        imageUrl: "",
        status: "dangban",
        brandId: "",
        price: 0,
        description: "",
      });
    },
    onError: (error) => {
      console.error("Lỗi tạo sản phẩm:", error);
      showToast("Lỗi khi tạo sản phẩm", "error");
      setIsUploading(false);
    },
  });

  const uploadMutation = useMutation({
    mutationKey: ["upload"],
    mutationFn: uploadFileService,
    onMutate: () => setIsUploading(true),
    onSuccess: (data) => {
      if (data) {
        setPreviewUrl(data);
        setSubmitData({
          ...submitData,
          imageUrl: data,
        });
      }
      setIsUploading(false);
    },
    onError: (error) => {
      console.error("Lỗi upload:", error);
      showToast("Upload ảnh thất bại", "error");
      setIsUploading(false);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setIsSubmitFile(true);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        showToast("Vui lòng chọn một tệp", "error");
        return;
      }

      setIsUploading(true);

      // Step 1: Upload the file first
      const uploadedUrl = await uploadMutation.mutateAsync(file);

      if (!uploadedUrl) {
        showToast("Lỗi khi tải ảnh lên", "error");
        setIsUploading(false);
        return;
      }

      // Step 2: Update submitData with the uploaded image URL
      const updatedSubmitData = { imageUrl: submitData };

      // Step 3: Call the create API with updated data
      if (userInfo?.userId) {
        await updateMutation.mutateAsync({
          userId: userInfo.userId,
          data: updatedSubmitData,
        });
      }

      setIsUploading(false);
    } catch (error) {
      console.error("Lỗi khi tải lên:", error);
      showToast("Upload thất bại", "error");
      setIsUploading(false);
    }
  };

  const handleDeleteImage = () => {
    setFile(null);
    setPreviewUrl(null);
    setIsSubmitFile(false);
  };

  const handleGoBack = () => {
    setModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <p className="text-[28px] font-bold font-inter">Thêm ảnh sản phẩm</p>
      <p className="text-[12px] text-normal">
        Vui lòng chọn ảnh với kích thước 800 x 400 để hiển thị tốt nhất.
      </p>
      <div className="flex w-full mt-[20px]">
        <div className="flex items-center justify-center w-full">
          {previewUrl ? (
            <div className="w-full">
              <Image
                alt="Ảnh sản phẩm"
                src={previewUrl}
                width={616}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-gray-600 border-opacity-20 border-dashed rounded-lg cursor-pointer bg-gray-800 bg-opacity-20"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IoCloudUploadOutline className="text-[30px] mb-[15px]" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Tải ảnh lên</span> bằng cách
                  nhấp vào đây.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG, WEBP (800px x 400px)
                </p>
              </div>
              <input
                disabled={isUploading}
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>
      {previewUrl && (
        <div
          className="flex w-full justify-start mt-[10px] cursor-pointer"
          onClick={handleDeleteImage}
        >
          <p className="text-[13px] text-normal font-light underline">
            Chọn ảnh khác
          </p>
        </div>
      )}
      <div className="flex items-center w-full gap-x-[30px] mt-[20px]">
        <Button
          className="w-full"
          variant="flat"
          color="default"
          size="lg"
          onPress={handleGoBack}
        >
          <p className="font-bold">Quay lại</p>
        </Button>
        <Button
          className="w-full"
          variant="flat"
          color="secondary"
          size="lg"
          onPress={handleUpload}
          isDisabled={!isSubmitFile}
          isLoading={isUploading}
        >
          <p className="text-secondary font-bold">Tạo sản phẩm</p>
        </Button>
      </div>
    </div>
  );
}
