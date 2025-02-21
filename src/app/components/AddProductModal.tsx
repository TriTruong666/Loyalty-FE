"use client";

import { uploadFileService } from "../service/cloudinaryService";
import { Button } from "@heroui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import React, { useState } from "react";
import { IoCloudUploadOutline, IoKeyOutline } from "react-icons/io5";
import NormalInput from "./NormalInput";
import { PiPackageDuotone } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Select, SelectItem } from "@heroui/select";
import { addProductModalState } from "../store/modalAtoms";
import TiptapEditor from "./TiptapEditor";
import { dataCreateProductState } from "../store/productAtoms";
import { showToast } from "../utils/toast";
import { createProductService } from "../service/productService";
import { useGetAllBrand } from "../hooks/hook";
import { userInfoState } from "../store/accountAtoms";

const createProductProgress = atom(1);

export default function AddProductModal() {
  const addProductModalProgress = useAtomValue(createProductProgress);
  const isToggleAddProductModal = useAtomValue(addProductModalState);
  if (!isToggleAddProductModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[700px] 2xl:max-h-[700px] bg-black flex flex-col transition-all duration-300 items-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        {addProductModalProgress === 1 && <ProductForm />}
        {addProductModalProgress === 2 && <ImageDropZone />}
      </div>
    </div>
  );
}

function ProductForm() {
  const [submitData, setSubmitData] = useAtom(dataCreateProductState);
  const setAddProductModal = useSetAtom(addProductModalState);
  const setProductModalProgress = useSetAtom(createProductProgress);
  const { data: brands } = useGetAllBrand();
  const units = [
    {
      id: 1,
      unitName: "Tuýp",
    },
    {
      id: 2,
      unitName: "Hộp",
    },
    {
      id: 3,

      unitName: "Chai",
    },
    {
      id: 4,
      unitName: "Ống",
    },
    {
      id: 5,
      unitName: "Gói",
    },
    {
      id: 6,
      unitName: "Thỏi",
    },
    {
      id: 7,
      unitName: "Hũ",
    },
    {
      id: 8,
      unitName: "Miếng",
    },
  ];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleOnChangeNameProduct = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setSubmitData({
      ...submitData,
      productName: value.toUpperCase(),
    });
  };
  const handleGoNext = () => {
    if (
      submitData.productId.trim() === "" ||
      submitData.productName.trim() === "" ||
      submitData.brandId.trim() === "" ||
      submitData.description.trim() === "" ||
      submitData.unit.trim() === ""
    ) {
      showToast("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }

    if (isNaN(Number(submitData.price)) || Number(submitData.price) <= 0) {
      showToast("Giá sản phẩm phải là một số hợp lệ", "error");
      return;
    }

    setProductModalProgress(2);
  };
  const handleCloseModal = () => {
    setAddProductModal(false);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full relative">
      <p className="text-[28px] font-bold font-inter">Thông tin sản phẩm</p>
      <div className="flex flex-col gap-2 w-full overflow-auto max-h-[490px]">
        <NormalInput
          name="productId"
          onChange={handleOnChange}
          defaultValue={submitData.productId}
          label="SKU sản phẩm"
          placeholder="ES0421"
          icon={<IoKeyOutline size={20} />}
        />
        <NormalInput
          name="productName"
          onChange={handleOnChangeNameProduct}
          defaultValue={submitData.productName}
          label="Tên sản phẩm"
          placeholder="EASYDEW EX UV CONTROL VELVET PRIMER 40ML"
          icon={<PiPackageDuotone size={20} />}
        />
        <NormalInput
          name="price"
          onChange={handleOnChange}
          defaultValue={submitData.price}
          label="Giá sản phẩm (giá sỉ)"
          placeholder="Nhập giá"
          icon={<MdOutlineAttachMoney size={20} />}
        />
        <div className="flex items-center gap-x-3">
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Thương hiệu
            </label>
            <Select
              isVirtualized
              variant="underlined"
              selectedKeys={[submitData.brandId]}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                setSubmitData({ ...submitData, brandId: selectedKey });
              }}
              placeholder="Thương hiệu"
            >
              {brands?.length ? (
                brands.map((brand) => (
                  <SelectItem value={brand.brandId} key={brand.brandId}>
                    {brand.brandName}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="">Đang tải thương hiệu...</SelectItem>
              )}
            </Select>
          </div>
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Đơn vị
            </label>
            <Select
              isVirtualized
              variant="underlined"
              selectedKeys={[submitData.unit]}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                setSubmitData({ ...submitData, unit: selectedKey });
              }}
              placeholder="Đơn vị"
            >
              {units.map((unit) => (
                <SelectItem value={unit.id} key={unit.id}>
                  {unit.unitName}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-col w-full font-inter">
          <label
            htmlFor="description"
            className="font-semibold text-sm 2xl:text-[12px] mb-2"
          >
            Mô tả
          </label>
          <TiptapEditor
            onChange={(value) =>
              setSubmitData({ ...submitData, description: value })
            }
            content={submitData.description || "<p>Nhập mô tả sản phẩm...</p>"}
            attributes={{
              class:
                "p-4 h-[300px] min-h-[300px] max-h-[400px] overflow-auto bg-gray-700 bg-opacity-20 text-normal text-sm border border-gray-600 border-opacity-10 rounded-lg focus:outline-none",
            }}
          />
        </div>
      </div>
      <div className="flex items-center w-full gap-x-[30px] mt-[20px] sticky">
        <Button
          className="w-full"
          variant="flat"
          color="default"
          size="lg"
          onPress={handleCloseModal}
        >
          <p className="font-bold">Quay lại</p>
        </Button>
        <Button
          className="w-full"
          variant="flat"
          color="secondary"
          size="lg"
          onPress={handleGoNext}
        >
          <p className="text-secondary font-bold">Tiếp tục</p>
        </Button>
      </div>
    </div>
  );
}

function ImageDropZone() {
  const setModal = useSetAtom(addProductModalState);
  const [submitData, setSubmitData] = useAtom(dataCreateProductState);
  const userInfo = useAtomValue(userInfoState);
  const setProductModalProgress = useSetAtom(createProductProgress);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitFile, setIsSubmitFile] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: ["create-product"],
    mutationFn: async ({ userId, data }: { userId: string; data: any }) =>
      createProductService(userId, data),
    onMutate: () => setIsUploading(true),
    onSuccess: (data) => {
      if (data.code === "PRODUCT_ID_ALREADY_BOUND_TO_AN_EXISTING_PRODUCT") {
        showToast(
          "Sản phẩm này đã tồn tại, vui lòng đổi SKU sản phẩm",
          "error"
        );
        return;
      }
      if (data.code === "PRODUCT_NAME_ALREADY_EXISTS") {
        showToast("Tên sản phẩm này đã bị trùng, hãy thử lại", "error");
        return;
      } else {
        showToast("Tạo sản phẩm thành công", "success");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setModal(false);
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
        setProductModalProgress(1);
        setIsUploading(false);
      }
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
        setSubmitData((prev) => ({ ...prev, imageUrl: data }));
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
      const updatedSubmitData = { ...submitData, imageUrl: uploadedUrl };
      setSubmitData(updatedSubmitData);

      // Step 3: Call the create API with updated data
      if (userInfo?.userId) {
        await createMutation.mutateAsync({
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

  const handleGoPrev = () => {
    setProductModalProgress(1);
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
          onPress={handleGoPrev}
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
