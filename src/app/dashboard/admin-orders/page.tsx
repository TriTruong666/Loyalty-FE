"use client";
import { IoIosInformationCircleOutline } from "react-icons/io";
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
import { useSetAtom } from "jotai";

export default function OrderPage() {
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
      <AllOrderTable />
    </div>
  );
}

function AllOrderTable() {
  const setModal = useSetAtom(confirmOrderModalState);

  const statusTheme = (status: string) => {
    switch (status) {
      case "pending":
        return "border-purple-500";
      case "processing":
        return "border-yellow-300";
      case "confirm":
        return "border-[#45A834]";
      case "returned":
        return "border-red-500";
      default:
        return "";
    }
  };
  const titleStatusTheme = (status: string) => {
    switch (status) {
      case "pending":
        return "text-purple-700";
      case "processing":
        return "text-yellow-400";
      case "confirm":
        return "text-[#45A834]";
      case "returned":
        return "text-red-500";
      default:
        return "";
    }
  };
  const handleToggleModalOn = () => {
    setModal(true);
  };
  return (
    <div className="flex mt-[20px] flex-col items-center">
      <table className="flex flex-col w-full">
        <thead>
          <tr className="grid grid-cols-12 mx-[20px] px-[20px] py-4 bg-[#111111] rounded-lg">
            <th className="col-span-1 text-[12px] text-normal font-light text-start">
              ID
            </th>
            <th className="col-span-3 text-[12px] text-normal font-light text-start">
              Tên Khách Hàng
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-center">
              Hình Thức Thanh Toán
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-center">
              Tổng Giá
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-center">
              Trạng Thái
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-end">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40">
            <td className="col-span-1 text-[13px]">1</td>
            <td className="col-span-3 flex items-center gap-x-2">
              <p className="text-[13px] font-semibold">Phuc Le</p>
            </td>
            <td className="col-span-2 text-[13px] text-center font-semibold">
              Tiền Mặt
            </td>
            <td className="col-span-2 text-[13px] text-center font-semibold">
              50$
            </td>
            <td
              className={`col-span-2 flex justify-center w-fit px-3 gap-x-1 py-[2px] border ml-[60px] ${statusTheme(
                "pending"
              )} rounded-lg`}
            >
              <IoIosInformationCircleOutline
                className={`${titleStatusTheme("pending")}`}
              />
              <p
                className={`text-[11px] font-semibold font-open ${titleStatusTheme(
                  "pending"
                )}`}
              >
                Chờ Duyệt
              </p>
            </td>
            <td className="col-span-2 text-[13px] font-semibold flex justify-end">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <BsThreeDotsVertical className="text-normal text-[16px]" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onPress={handleToggleModalOn}
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
                      showToast("Đơn hàng đã bị từ chối!", "success")
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
        </tbody>
      </table>
      <div className="mt-[20px]">
        <Pagination
          loop
          showControls
          color="default"
          initialPage={1}
          total={10}
        />
      </div>
    </div>
  );
}
