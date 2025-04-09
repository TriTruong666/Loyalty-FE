"use client";
import AuthComponent from "@/app/components/AuthComponent";
import { LoadingTable } from "@/app/components/loading";
import {
  useGetAllSalesCustomer,
  useGetSalesCustomerByLimit,
} from "@/app/hooks/hook";
import { addSalesAccountModalState } from "@/app/store/modalAtoms";
import { Pagination } from "@heroui/react";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { PiExport } from "react-icons/pi";

export default function SalesAccountPage() {
  const setIsToggleModal = useSetAtom(addSalesAccountModalState);
  const handleToggleModalOn = () => {
    setIsToggleModal(true);
  };
  return (
    <AuthComponent allowedRoles={["ceo", "admin"]}>
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
        <SalesAccountTable />
      </div>
    </AuthComponent>
  );
}
function SalesAccountTable() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 8;
  const [isMounted, setIsMounted] = useState(false);

  const { data: allAccounts } = useGetAllSalesCustomer();
  const { data: accounts, isLoading } = useGetSalesCustomerByLimit(page, limit);
  useEffect(() => {
    if (allAccounts) {
      setTotalPage(Math.ceil(allAccounts.length / limit));
    }
    setIsMounted(true);
  }, [allAccounts]);
  if (isLoading || !isMounted) {
    return (
      <>
        <LoadingTable />
      </>
    );
  }
  return (
    <>
      <div className="flex items-center px-[40px] py-[20px] mt-[10px] justify-end gap-x-4">
        <div className="w-[250px]">
          {/* <Select aria-label="sort" placeholder="Sắp xếp" variant="underlined">
            {accountSort.map((item) => (
              <SelectItem key={item.key}>{item.title}</SelectItem>
            ))}
          </Select> */}
        </div>
      </div>
      <div className="flex mt-[20px] flex-col items-center">
        <table className="flex flex-col w-full">
          <thead>
            <tr className="grid grid-cols-12 mx-[20px] px-[20px] py-4 bg-[#111111] rounded-lg">
              <th className="col-span-3 text-[12px] text-normal font-light text-start">
                ID
              </th>
              <th className="col-span-3 text-[12px] text-normal font-light text-start">
                Tên khách hàng
              </th>
              <th className="col-span-3 text-[12px] text-normal font-light text-start">
                Số điện thoại
              </th>
              <th className="col-span-3 text-[12px] text-normal font-light text-start">
                Thuộc team
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((user) => (
              <tr
                key={user.customerIDOfSales}
                className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40"
              >
                <td className="col-span-3 text-[13px]">
                  {user.customerIDOfSales}
                </td>
                <td className="col-span-3 flex items-center gap-x-2">
                  <div className="flex flex-col">
                    <p className="text-[13px] font-semibold">{user.userName}</p>
                  </div>
                </td>
                <td className="col-span-3 text-[13px] text-start font-semibold">
                  {user.phoneNumber}
                </td>
                <td className="col-span-3 text-[13px] text-start font-semibold">
                  {user.salePersonName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-[20px]">
          <Pagination
            loop
            showControls
            color="default"
            initialPage={page}
            total={totalPage}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </>
  );
}
