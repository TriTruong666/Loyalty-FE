"use client";

import { Button } from "@heroui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import NormalInput from "./NormalInput";
import { PiPackageDuotone } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Select, SelectItem } from "@heroui/select";
import { updateProductModalState } from "../store/modalAtoms";
import TiptapEditor from "./TiptapEditor";
import { dataUpdateProductState } from "../store/productAtoms";
import { showToast } from "../utils/toast";

import { useGetAllBrand } from "../hooks/hook";
import { updateProductService } from "../service/productService";
import { userInfoState } from "../store/accountAtoms";

export default function UpdateProductModal() {
  const isToggleUpdateProductModal = useAtomValue(updateProductModalState);
  if (!isToggleUpdateProductModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[700px] 2xl:max-h-[700px] bg-black flex flex-col transition-all duration-300 items-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <ProductForm />
      </div>
    </div>
  );
}

function ProductForm() {
  const [submitData, setSubmitData] = useAtom(dataUpdateProductState);
  const userInfo = useAtomValue(userInfoState);
  const [isLoading, setIsLoading] = useState(false);
  const setUpdateModal = useSetAtom(updateProductModalState);
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
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationKey: ["update-mutation"],
    mutationFn: async ({ userId, data }: { userId: string; data: any }) =>
      updateProductService(userId, data),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Cập nhật sản phẩm thành công", "success");
      setUpdateModal(false);
      setIsLoading(false);
    },
  });
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
  const handleSubmit = async () => {
    if (
      submitData?.productId?.trim() === "" ||
      submitData?.productName?.trim() === "" ||
      submitData?.brandId?.trim() === "" ||
      (submitData?.description as string)?.trim() === "" ||
      submitData?.unit?.trim() === ""
    ) {
      showToast("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }

    if (isNaN(Number(submitData.price)) || Number(submitData.price) <= 0) {
      showToast("Giá sản phẩm phải là một số hợp lệ", "error");
      return;
    }
    try {
      await updateMutation.mutateAsync({
        data: submitData,
        userId: userInfo?.userId as string,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseModal = () => {
    setUpdateModal(false);
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
                  <SelectItem key={brand.brandId}>{brand.brandName}</SelectItem>
                ))
              ) : (
                <SelectItem>Đang tải thương hiệu...</SelectItem>
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
                <SelectItem key={unit.id}>{unit.unitName}</SelectItem>
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
              setSubmitData({ ...submitData, description: value as string })
            }
            content={
              (submitData.description as string) ||
              "<p>Nhập mô tả sản phẩm...</p>"
            }
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
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={handleSubmit}
        >
          <p className="text-secondary font-bold">Tiếp tục</p>
        </Button>
      </div>
    </div>
  );
}
