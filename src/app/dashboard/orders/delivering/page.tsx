"use client";
import { Pagination } from "@heroui/pagination";
import { FaInbox, FaPenAlt } from "react-icons/fa";
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
import {
  cancelOrderModalState,
  confirmOrderModalState,
  orderDetailModalState,
} from "@/app/store/modalAtoms";
import { useAtom, useSetAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetAllOrders, useGetOrderByLimitByStatus } from "@/app/hooks/hook";
import { LoadingTable } from "@/app/components/loading";
import { formatPrice } from "@/app/utils/format";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderService } from "@/app/service/orderService";
import { Input } from "@heroui/react";
import {
  cancelOrderState,
  confirmOrderState,
  detailOrderState,
  noteOrderState,
} from "@/app/store/orderAtomts";

export default function OrderPage() {
  return (
    <>
      <AllOrderTable />
    </>
  );
}

function AllOrderTable() {
  const setOrderDetailModal = useSetAtom(orderDetailModalState);
  const [orderId, setOrderId] = useAtom(noteOrderState);
  const setDetailModalId = useSetAtom(detailOrderState);
  const setConfirmModalId = useSetAtom(confirmOrderState);
  const setCancelModalId = useSetAtom(cancelOrderState);
  const setConfirmModal = useSetAtom(confirmOrderModalState);
  const setCancelModal = useSetAtom(cancelOrderModalState);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [noteData, setNoteData] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const { data: orders, isLoading } = useGetOrderByLimitByStatus(
    page,
    "exported"
  );
  const limit = 8;
  const { data: allOrders } = useGetAllOrders();

  const filteredAllProduct = allOrders?.filter(
    (order) => order.orderStatus === "exported"
  );
  useEffect(() => {
    if (filteredAllProduct) {
      setTotalPage(Math.ceil(filteredAllProduct.length / limit));
    }
    setIsMounted(true);
  }, [filteredAllProduct]);
  const queryClient = useQueryClient();
  const updateNoteMutation = useMutation({
    mutationKey: ["update-note"],
    mutationFn: updateOrderService,
    onMutate() {},
    onSuccess(data) {
      if (data.message === "Ok") {
        showToast("Ghi chú thành công", "success");
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        setOrderId("");
        setNoteData("");
      }
    },
  });
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && orderId) {
      handleSubmitNote();
    }
  };

  const handleSubmitNote = async () => {
    try {
      await updateNoteMutation.mutateAsync({
        note: noteData,
        orderID: orderId,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnChangeNote = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteData(e.target.value);
  };
  const handleToggleModalConfirmOn = (orderId: string) => {
    setConfirmModalId(orderId);
    setConfirmModal(true);
  };
  const handleToggleNoteModalOff = () => {
    setOrderId("");
    setNoteData("");
  };
  const handleToggleNoteModalOn = (orderId: string) => {
    setOrderId(orderId);
  };
  const handleToggleOrderDetailModalOn = (orderId: string) => {
    setDetailModalId(orderId);
    setOrderDetailModal(true);
  };
  const handleToggleCancelOrderModalOn = (orderId: string) => {
    setCancelModalId(orderId);
    setCancelModal(true);
  };
  const handleFinanceStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-700";
      case "cancelled":
        return "bg-danger-50 text-red-600";
      case "confirmed":
        return "bg-success-200";
      default:
        return "";
    }
  };
  const handleFinanceStatusName = (status: string) => {
    switch (status) {
      case "pending":
        return "Chưa thanh toán";
      case "cancelled":
        return "Đã huỷ đơn";
      case "confirmed":
        return "Đã thanh toán";
      default:
        return "";
    }
  };
  if (isLoading || !isMounted) {
    return (
      <>
        <LoadingTable />
      </>
    );
  }
  return (
    <div className="flex flex-col" onClick={handleToggleNoteModalOff}>
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
              <th className="col-span-2 text-[12px] text-normal font-light text-start">
                Mã đơn hàng
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-start">
                Tên khách hàng
              </th>
              <th className="col-span-2 text-[12px] text-start text-normal font-light">
                Tổng
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-start">
                Trạng thái thanh toán
              </th>
              <th className="col-span-3 text-[12px] text-normal font-light text-start">
                Ghi chú
              </th>
              <th className="col-span-1 text-[12px] text-normal font-light text-end">
                Thêm
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order.orderId}
                className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40 relative"
              >
                <td className="col-span-2 text-[13px]">{order.orderId}</td>
                <td className="col-span-2 text-[13px] text-start font-semibold">
                  {order.customerName}
                </td>
                <td className="col-span-2 text-[13px] text-start font-semibold">
                  {formatPrice(order.totalPayment)}
                </td>
                <td className="col-span-2 flex justify-start">
                  <p
                    className={`text-[10px] font-semibold text-center px-[20px] py-[4px] rounded-lg ${handleFinanceStatus(
                      order.transaction.transactionStatus
                    )}`}
                  >
                    {handleFinanceStatusName(
                      order.transaction.transactionStatus
                    )}
                  </p>
                </td>
                <td className="col-span-3 text-[13px] text-start">
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
                        onPress={() =>
                          handleToggleModalConfirmOn(order.orderId)
                        }
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
                          handleToggleCancelOrderModalOn(order.orderId)
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
                        onPress={() => handleToggleNoteModalOn(order.orderId)}
                        className="group"
                        color="default"
                        startContent={
                          <FaPenAlt className="text-[16px] group-hover:text-foreground" />
                        }
                        key="note"
                      >
                        <p className="group-hover:text-foreground">Ghi chú</p>
                      </DropdownItem>
                      <DropdownItem
                        onPress={() =>
                          handleToggleOrderDetailModalOn(order.orderId)
                        }
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
                {/* this is note modal */}
                {orderId === order.orderId && (
                  <td
                    className="absolute 3xl:left-[80%] 2xl:left-[75%] top-[7px] w-[300px] p-[10px] bg-default-50 rounded-[15px] z-10 modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="">
                      <Input
                        defaultValue={noteData as string}
                        onChange={handleOnChangeNote}
                        onKeyDown={handleKeyDown}
                        placeholder="Viết ghi chú..."
                        size="sm"
                        variant="underlined"
                      />
                    </div>
                  </td>
                )}
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
