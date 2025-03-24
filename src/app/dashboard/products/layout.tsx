"use client";
import { ProductStatusMenu } from "@/app/components/ProductStatusMenu";
import { addProductModalState } from "@/app/store/modalAtoms";
import { useSetAtom } from "jotai";
import { Suspense } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { PiExport } from "react-icons/pi";
import ProductLoadingTableLayout from "./loading";
import { useAllProduct } from "@/app/hooks/hook";
import { download, generateCsv, mkConfig } from "export-to-csv";
import AuthComponent from "@/app/components/AuthComponent";

export default function ProductDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setAddProductModal = useSetAtom(addProductModalState);
  const { data: allProducts } = useAllProduct();
  const handleOnDownloadCSV = () => {
    if (!allProducts || allProducts.length === 0) {
      console.warn("No data available for CSV export.");
      return;
    }

    const csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: "Data sản phẩm",
    });
    const csvData = allProducts.map((product) => ({
      id: product.productId,
      productName: product.productName,
      price: product.price,
    }));

    const csv = generateCsv(csvConfig)(csvData);
    download(csvConfig)(csv);
  };
  const handleOpenModal = () => {
    setAddProductModal(true);
  };
  return (
    <AuthComponent allowedRoles={["ceo", "admin"]}>
      <div className="flex flex-col font-open py-[20px]">
        <div className="flex items-center justify-between px-[40px]">
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[28px] font-light select-none">
              Quản lý sản phẩm
            </p>
            <p className="text-sm text-normal">
              Thêm, sửa, thay đổi trạng thái của sản phẩm.
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            <div
              onClick={handleOnDownloadCSV}
              className="flex items-center border border-gray-400-40 px-4 py-[6px] rounded-md cursor-pointer gap-x-2"
            >
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
          <div className="overflow-auto">{children}</div>
        </Suspense>
      </div>
    </AuthComponent>
  );
}
