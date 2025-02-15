"use client";

import { uploadFileService } from "../service/cloudinaryService";
import { Button } from "@heroui/button";
import { useMutation } from "@tanstack/react-query";
import { atom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCloudUploadOutline, IoLinkOutline } from "react-icons/io5";
import NormalInput from "./NormalInput";
import { PiPackageDuotone } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Select, SelectItem } from "@heroui/select";
import { addProductModalState } from "../store/modalAtoms";
import TiptapEditor from "./TiptapEditor";

const createProductProgress = atom(1);

export default function AddProductModal() {
  const addProductModalProgress = useAtomValue(createProductProgress);
  const isToggleAddProductModal = useAtomValue(addProductModalState);
  if (!isToggleAddProductModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-[2px] bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
      <div className="w-[700px] bg-black flex flex-col transition-all duration-300 items-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        {addProductModalProgress === 1 && <ProductForm />}
        {addProductModalProgress === 2 && <ImageDropZone />}
      </div>
    </div>
  );
}

function ProductForm() {
  const setAddProductModal = useSetAtom(addProductModalState);
  const setProductModalProgress = useSetAtom(createProductProgress);
  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];
  const handleGoNext = () => {
    setProductModalProgress(2);
  };
  const handleCloseModal = () => {
    setAddProductModal(false);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <p className="text-[28px] font-bold font-inter">Thông tin sản phẩm</p>
      <div className="flex flex-col gap-2 w-full">
        <NormalInput
          label="Tên sản phẩm"
          placeholder="email123@gmail.com"
          icon={<PiPackageDuotone size={20} />}
        />
        <NormalInput
          label="Giá sản phẩm (giá sỉ)"
          placeholder="Nhập giá"
          icon={<MdOutlineAttachMoney size={20} />}
        />
        <NormalInput
          label="Handle"
          placeholder="Nhập đường link mà khách hàng có thể truy cập"
          icon={<IoLinkOutline size={20} />}
        />
        <div className="flex items-center gap-x-3">
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Thương hiệu
            </label>
            <Select variant="bordered" placeholder="Thương hiệu">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Đơn vị
            </label>
            <Select variant="bordered" placeholder="Đơn vị">
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
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
          <TiptapEditor />
        </div>
      </div>
      <div className="flex items-center w-full gap-x-[30px] mt-[20px]">
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
  const setProductModalProgress = useSetAtom(createProductProgress);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitFile, setIsSubmitFile] = useState<boolean>(false);
  const uploadMutation = useMutation({
    mutationKey: ["upload"],
    mutationFn: uploadFileService,
    onMutate() {
      setIsUploading(true);
    },
    onSuccess(data) {
      setPreviewUrl(data);
      setIsUploading(false);
      toast.success("Upload ảnh thành công", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
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
      if (file) {
        await uploadMutation.mutateAsync(file);
      }
    } catch (error) {
      console.log(error);
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
            <>
              <div className="w-full">
                <Image
                  alt=""
                  src={previewUrl}
                  width={616}
                  height={400}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
            </>
          ) : (
            <>
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
            </>
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
