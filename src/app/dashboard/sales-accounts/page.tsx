"use client";
import { useGetAllSalesCustomer } from "@/app/hooks/hook";
import { addSalesAccountState } from "@/app/store/modalAtoms";
import { useSetAtom } from "jotai";
import { HiPlusSmall } from "react-icons/hi2";
import { PiExport } from "react-icons/pi";

export default function SalesAccountPage() {
  const setIsToggleModal = useSetAtom(addSalesAccountState);
  const handleToggleModalOn = () => {
    setIsToggleModal(true);
  };
  return (
    <div className="flex flex-col font-open py-[20px]">
      <div className="flex items-center justify-between px-[40px]">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[28px] font-light select-none">
            Tài khoản khách Sales
          </p>
          <p className="text-sm text-normal">
            Quản lý các khách của Sales Team, thêm mới khách.
          </p>
        </div>
        <div className="flex items-center gap-x-3">
          {/* add button */}
          <div className="flex items-center border border-gray-400-40 px-4 py-[6px] rounded-md cursor-pointer gap-x-2">
            <PiExport className="text-[16px] text-foreground" />
            <p className="text-[12px] text-foreground">Xuất CSV</p>
          </div>
          <div
            onClick={handleToggleModalOn}
            className="flex items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group"
          >
            <HiPlusSmall className="text-[16px] text-background" />
            <p className="text-[12px] text-background">Tạo tài khoản</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function SalesAccountTable() {
  const { data: accounts } = useGetAllSalesCustomer();
  return <div className=""></div>;
}
