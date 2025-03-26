"use client";

import { Button } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { TbShoppingCart, TbShoppingCartCancel } from "react-icons/tb";
import {
  productDetailModalState,
  updateProductModalState,
} from "../store/modalAtoms";
import { useGetProductDetailByHandle } from "../hooks/hook";
import {
  dataUpdateProductState,
  productDetailState,
} from "../store/productAtoms";
import { formatDate, formatPrice } from "../utils/format";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductService } from "../service/productService";
import { showToast } from "../utils/toast";
import { userInfoState } from "../store/accountAtoms";
import { Product } from "../interfaces/Product";
import { IoWarningOutline } from "react-icons/io5";
import { useState } from "react";

export default function ProductDetailModal() {
  const setUpdateModal = useSetAtom(updateProductModalState);
  const setSelectedProduct = useSetAtom(dataUpdateProductState);
  const [isUpdating, setIsUpdating] = useState(false);
  const userInfo = useAtomValue(userInfoState);

  const [isToggleModal, setIsToggleModal] = useAtom(productDetailModalState);
  const handle = useAtomValue(productDetailState);
  const { data: detail } = useGetProductDetailByHandle(handle as string);
  const queryClient = useQueryClient();
  const updateStatusMutation = useMutation({
    mutationKey: ["update-status"],
    mutationFn: async ({ userId, data }: { userId: string; data: any }) =>
      updateProductService(userId, data),
    onMutate() {
      setIsUpdating(true);
    },
    onSuccess() {
      setIsToggleModal(false);
      setIsUpdating(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Sửa đổi trạng thái thành công", "success");
    },
  });
  const handleChangeStatusBanLaiProduct = async (data: Product) => {
    try {
      await updateStatusMutation.mutateAsync({
        userId: userInfo?.userId as string,
        data: {
          productId: data.productId,
          status: "dangban",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeStatusHetHangProduct = async (data: Product) => {
    try {
      await updateStatusMutation.mutateAsync({
        userId: userInfo?.userId as string,
        data: {
          productId: data.productId,
          status: "hethang",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeStatusHetBanProduct = async (data: Product) => {
    try {
      await updateStatusMutation.mutateAsync({
        userId: userInfo?.userId as string,
        data: {
          productId: data.productId,
          status: "hetban",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const safeHTML = DOMPurify.sanitize(detail?.description || "");
  const unitProduct = (unit: string) => {
    switch (unit) {
      case "1":
        return "Tuýp";
      case "2":
        return "Hộp";
      case "3":
        return "Chai";
      case "4":
        return "Ống";
      case "5":
        return "Gói";
      case "6":
        return "Thỏi";
      case "7":
        return "Hũ";
      case "8":
        return "Miếng";
    }
  };
  const handleToggleModalOff = () => {
    setIsToggleModal(false);
  };
  const handleUpdateProduct = (data: Product) => {
    setUpdateModal(true);
    setSelectedProduct(data);
  };
  return (
    <AnimatePresence>
      {isToggleModal && (
        <motion.div
          onClick={handleToggleModalOff}
          className="fixed w-screen h-screen flex justify-end bg-black bg-opacity-70 z-[40] font-open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="w-[500px] h-full max-h-full overflow-auto bg-[#111111] shadow-md absolute right-0 flex flex-col justify-between"
          >
            <div className="flex flex-col">
              <div className="flex justify-center py-[30px]">
                {detail?.imageUrl && (
                  <Image
                    alt={detail?.productName ?? "Product Image"}
                    src={detail.imageUrl}
                    width={300}
                    height={300}
                    className="object-cover rounded-xl"
                  />
                )}
              </div>
              <p className="text-[13px] font-bold px-[30px]">
                {detail?.productName}
              </p>
              <div className="px-[30px] gap-y-[15px] flex flex-col mt-[30px]">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-normal">Mã SKU: </p>
                  <p className="text-[13px]">#{detail?.productId}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-normal">Giá sản phẩm: </p>
                  <p className="text-[13px]">
                    {formatPrice(detail?.price as number)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-normal">Hãng: </p>
                  <p className="text-[13px]">{detail?.brand?.brandName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-normal">Đơn vị: </p>
                  <p className="text-[13px]">
                    {unitProduct(detail?.unit as string)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-normal">Ngày tạo: </p>
                  <p className="text-[13px]">
                    {formatDate(detail?.createdDate as string)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-normal">Tạo bởi: </p>
                  <p className="text-[13px]">
                    {unitProduct(detail?.unit as string)}
                  </p>
                </div>
                <div className="flex flex-col pb-[30px]">
                  <p className="text-[12px] text-normal">Mô tả: </p>
                  <div
                    className="text-[12px] mt-[15px] leading-loose"
                    dangerouslySetInnerHTML={{ __html: safeHTML }}
                  ></div>
                </div>
              </div>
            </div>
            {detail?.status !== "hetban" && (
              <div className="sticky left-0 bottom-0 flex justify-between px-[15px] gap-x-[15px] py-[25px] bg-[#111111] border-t border-gray-400-40">
                {detail && (
                  <Button
                    onPress={() => handleUpdateProduct(detail)}
                    size="sm"
                    variant="flat"
                    color="default"
                    className="flex w-full"
                  >
                    <MdEdit />
                    <p>Chỉnh sửa</p>
                  </Button>
                )}

                {detail?.status === "dangban" && (
                  <Button
                    onPress={() => handleChangeStatusHetHangProduct(detail)}
                    size="sm"
                    variant="flat"
                    color="warning"
                    className="flex w-full"
                    isDisabled={isUpdating}
                    isLoading={isUpdating}
                  >
                    <TbShoppingCartCancel />
                    <p>Hết hàng</p>
                  </Button>
                )}
                {detail?.status === "hethang" && (
                  <>
                    <Button
                      onPress={() => handleChangeStatusBanLaiProduct(detail)}
                      size="sm"
                      variant="flat"
                      color="success"
                      className="flex w-full"
                      isDisabled={isUpdating}
                      isLoading={isUpdating}
                    >
                      <TbShoppingCart />
                      <p>Bán lại</p>
                    </Button>
                    <Button
                      onPress={() => handleChangeStatusHetBanProduct(detail)}
                      size="sm"
                      variant="flat"
                      color="danger"
                      className="flex w-full"
                      isDisabled={isUpdating}
                      isLoading={isUpdating}
                    >
                      <IoWarningOutline />
                      <p>Hết bán</p>
                    </Button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
