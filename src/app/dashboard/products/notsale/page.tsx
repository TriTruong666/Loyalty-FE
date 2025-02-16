"use client";
import Image from "next/image";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Pagination } from "@heroui/pagination";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaInbox, FaPowerOff } from "react-icons/fa";
import { showToast } from "@/app/utils/toast";

export default function ProductInactivePage() {
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
              <Option>Tên sản phẩm (A → Z)</Option>
              <Option>Tên sản phẩm (Z → A)</Option>
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
      <ProductTable />
    </div>
  );
}

function ProductTable() {
  const statusTheme = (status: string) => {
    switch (status) {
      case "inactive":
        return "border-gray-400-40";
      case "active":
        return "border-[#45A834]";
      case "notsaleanymore":
        return "border-red-500";
      default:
        return "";
    }
  };

  const titleStatusTheme = (status: string) => {
    switch (status) {
      case "inactive":
        return "text-normal";
      case "active":
        return "text-[#45A834]";
      case "notsaleanymore":
        return "text-red-500";
      default:
        return "";
    }
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
              Sản phẩm
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-start">
              Nhãn hàng
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-center">
              Giá
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-center">
              Trạng thái
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-end">
              Thêm
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40">
            <td className="col-span-1 text-[13px]">1</td>
            <td className="col-span-3 flex items-center gap-x-2">
              <Image
                alt=""
                src="/woman-1.jpg"
                width={35}
                height={35}
                className="w-[35px] h-[35px] object-cover rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-[13px] font-semibold">Kem Dưỡng Da</p>
              </div>
            </td>
            <td className="col-span-2 text-[11px] font-semibold">Easydew</td>
            <td className="col-span-2 text-[13px] text-center font-semibold">
              700$
            </td>
            <td
              className={`col-span-2 flex justify-center w-fit px-3 gap-x-1 py-[2px] border ml-[60px] ${statusTheme(
                "inactive"
              )} rounded-lg`}
            >
              <IoIosInformationCircleOutline
                className={`${titleStatusTheme("inactive")}`}
              />
              <p
                className={`text-[11px] font-semibold font-open ${titleStatusTheme(
                  "inactive"
                )}`}
              >
                Hết Hàng
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
                    className="group"
                    color="default"
                    startContent={
                      <FaEdit className="text-[16px] group-hover:text-success" />
                    }
                    key="approve"
                  >
                    <p className="group-hover:text-success">Chỉnh sửa</p>
                  </DropdownItem>
                  <DropdownItem
                    onPress={() =>
                      showToast("Sản phẩm đã được bán lại!", "success")
                    }
                    className="group"
                    color="default"
                    startContent={
                      <FaPowerOff className="text-[16px] group-hover:text-success" />
                    }
                    key="deny"
                  >
                    <p className="group-hover:text-success">Bán lại</p>
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
