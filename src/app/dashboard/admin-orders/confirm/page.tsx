"use client";
import { Pagination } from "@heroui/pagination";
import { FaInbox } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { showToast } from "@/app/utils/toast";
import { IoCheckmarkSharp } from "react-icons/io5";
import { confirmOrderModalState } from "@/app/store/modalAtoms";
import { atom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useGetAllOrders, useGetOrderByLimitByStatus } from "@/app/hooks/hook";
import { LoadingTable } from "@/app/components/loading";
import { formatPrice } from "@/app/utils/format";

export const orderIdState = atom("");

export default function OrderPage() {
  return (
    <>
      <AllOrderTable />
    </>
  );
}

function AllOrderTable() {
  const setOrderId = useSetAtom(orderIdState);
  const setModal = useSetAtom(confirmOrderModalState);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const { data: orders, isLoading } = useGetOrderByLimitByStatus(
    page,
    "confirmed"
  );
  const limit = 8;
  const { data: allOrders } = useGetAllOrders();

  const filteredAllProduct = allOrders?.filter(
    (order) => order.orderStatus === "confirmed"
  );
  useEffect(() => {
    if (filteredAllProduct) {
      setTotalPage(Math.ceil(filteredAllProduct.length / limit));
    }
    setIsMounted(true);
  }, [filteredAllProduct]);

  const handleToggleModalOn = (orderId: string) => {
    setOrderId(orderId);
    setModal(true);
  };
  if (isLoading || !isMounted) {
    return (
      <>
        <LoadingTable />
      </>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center px-[40px] py-[20px] mt-[10px] justify-end gap-x-4">
        <div className="w-[250px]">
          {/* <ThemeProvider value={selectTheme}>
            <Select
              label="Sắp xếp"
              variant="standard"
              className="font-inter font-semibold"
            >
              <Option>Tên khách hàng (A → Z)</Option>
              <Option>Tên khách hàng (Z → A)</Option>
            </Select>
          </ThemeProvider> */}
        </div>
        <div className="w-[250px]">
          {/* <ThemeProvider value={selectTheme}>
            <Select
              label="Bộ lọc"
              variant="standard"
              className="font-inter font-semibold"
            >
              <Option>Bởi trạng thái</Option>
              <Option>Bởi ID (Tăng dần)</Option>
              <Option>Bởi ID (Giảm dần)</Option>
            </Select>
          </ThemeProvider> */}
        </div>
      </div>
      <div className="flex mt-[20px] flex-col items-center">
        <table className="flex flex-col w-full">
          <thead>
            <tr className="grid grid-cols-12 mx-[20px] px-[20px] py-4 bg-[#111111] rounded-lg">
              <th className="col-span-1 text-[12px] text-normal font-light text-start">
                Mã đơn
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Tên khách hàng
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Tạm tính
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Tổng
              </th>
              <th className="col-span-1 text-[12px] text-normal font-light text-center">
                Hạng Loyalty
              </th>
              <th className="col-span-1 text-[12px] text-normal font-light text-center">
                Thanh toán
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Ghi chú
              </th>
              <th className="col-span-1 text-[12px] text-normal font-light text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order.orderId}
                className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40"
              >
                <td className="col-span-1 text-[13px]">{order.orderId}</td>
                <td className="col-span-2 text-[13px] text-center font-semibold">
                  {order.customerName}
                </td>
                <td className="col-span-2 text-[13px] text-center font-semibold">
                  {formatPrice(order.totalOrderValue)}
                </td>
                <td className="col-span-2 text-[13px] text-center font-semibold">
                  {formatPrice(order.totalPayment)}
                </td>
                <td className="col-span-1 text-[13px] text-center font-semibold">
                  {order.rankName}
                </td>
                <td className="col-span-1 text-[13px] text-center font-semibold">
                  {/* {order.transaction.gateway} */}
                </td>
                <td className="col-span-2 text-[13px] text-center font-semibold">
                  {order.note}
                </td>
                <td className="col-span-1 text-[13px] font-semibold flex justify-end">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <BsThreeDotsVertical className="text-normal text-[16px]" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onPress={() => handleToggleModalOn(order.orderId)}
                        className="group"
                        color="default"
                        startContent={
                          <IoCheckmarkSharp className="text-[16px] group-hover:text-success" />
                        }
                        key="approve"
                      >
                        <p className="group-hover:text-success">Xác Nhận</p>
                      </DropdownItem>
                      <DropdownItem
                        onPress={() =>
                          showToast("Đã từ chối đơn hàng!", "success")
                        }
                        className="group"
                        color="default"
                        startContent={
                          <FaXmark className="text-[16px] group-hover:text-success" />
                        }
                        key="deny"
                      >
                        <p className="group-hover:text-success">Từ chối</p>
                      </DropdownItem>
                      <DropdownItem
                        className="group"
                        color="default"
                        startContent={
                          <FaInbox className="text-[16px] group-hover:text-success" />
                        }
                        key="show"
                      >
                        <p className="group-hover:text-success">Chi tiết</p>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
    </div>
  );
}
