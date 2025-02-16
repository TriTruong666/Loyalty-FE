"use client";
import { ProductStatusMenu } from "@/app/components/ProductStatusMenu";
import { addProductModalState } from "@/app/store/modalAtoms";
import { useSetAtom } from "jotai";
import { Suspense } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { PiExport } from "react-icons/pi";
import ProductLoadingTableLayout from "./loading";

export default function ProductDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setAddProductModal = useSetAtom(addProductModalState);
  const handleOpenModal = () => {
    setAddProductModal(true);
  };
  return (
    <div className="flex flex-col font-open py-[20px]">
      <div className="flex items-center justify-between px-[40px]">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[28px] font-light select-none">Quản lý sản phẩm</p>
          <p className="text-sm text-normal">
            Thêm, sửa, thay đổi trạng thái của sản phẩm.
          </p>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="flex items-center border border-gray-400-40 px-4 py-[6px] rounded-md cursor-pointer gap-x-2">
            <PiExport className="text-[16px] text-foreground" />
            <p className="text-[12px] text-foreground">Xuất CSV</p>
          </div>
          {/* add button */}
          <div
            className="flex items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group"
            onClick={handleOpenModal}
          >
            <HiPlusSmall className="text-[16px] text-background" />
            <p className="text-[12px] text-background">Tạo sản phẩm</p>
          </div>
        </div>
      </div>

      <ProductStatusMenu />
      <Suspense fallback={<ProductLoadingTableLayout />}>
        <div className="">{children}</div>
      </Suspense>
    </div>
  );
}
