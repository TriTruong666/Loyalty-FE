"use client";
import Image from "next/image";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Pagination } from "@heroui/pagination";
export default function AccountSalesPage() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center px-[40px] py-[20px] mt-[10px] justify-end gap-x-4">
        <div className="w-[250px]">
          {/* <ThemeProvider value={selectTheme}>
            <Select
              label="Sắp xếp"
              variant="standard"
              className="font-inter font-semibold" children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
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
      <AccountSalesTable />
    </div>
  );
}

function AccountSalesTable() {
  const statusTheme = (status: string) => {
    switch (status) {
      case "inactive":
        return "border-gray-400-40";
      case "active":
        return "border-[#45A834]";
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
              Thông tin
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-start">
              Địa chỉ
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-center">
              Số điện thoại
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
                <p className="text-[13px] font-semibold">Truong Hoang Tri</p>
                <p className="text-[11px] text-normal">
                  tritruonghoang3@gmail.com
                </p>
              </div>
            </td>
            <td className="col-span-2 text-[11px] font-semibold">
              {" "}
              98/7 Nam Chau, Phuong 11, Quan Tan Binh, TP.HCM
            </td>
            <td className="col-span-2 text-[13px] text-center font-semibold">
              0776003669
            </td>

            <td
              className={`col-span-2 flex justify-center w-fit px-3 gap-x-1 py-[2px] border ml-[60px] ${statusTheme(
                "active"
              )} rounded-lg`}
            >
              <IoIosInformationCircleOutline
                className={`${titleStatusTheme("active")}`}
              />
              <p
                className={`text-[11px] font-semibold font-open ${titleStatusTheme(
                  "active"
                )}`}
              >
                Active
              </p>
            </td>
            <td className="col-span-2 text-[13px] font-semibold text-end">
              Actions
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
