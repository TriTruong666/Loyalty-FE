"use client";
import { Pagination } from "@heroui/pagination";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { IoCheckmarkSharp } from "react-icons/io5";
import { showToast } from "@/app/utils/toast";
import { useGetAccountsByLimit, useGetAllUser } from "@/app/hooks/hook";
import { useEffect, useState } from "react";
export default function CEOPermissionPage() {
  return (
    <div className="flex flex-col font-open py-[20px] ">
      <div className="flex flex-col gap-y-[5px] px-[40px]">
        <p className="text-[28px] font-light select-none">Xét duyệt đăng ký</p>
        <p className="text-sm text-normal">
          CEO có thể xét duyệt tài khoản được tạo tại đây.
        </p>
      </div>
      <div className="">
        <Table />
      </div>
    </div>
  );
}

function Table() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 8;
  const { data: allAccounts } = useGetAllUser();
  const { data: accounts, isLoading } = useGetAccountsByLimit(page);
  const filteredAccounts = accounts?.filter(
    (account) => account.status === false
  );
  const filteredAllAccounts = allAccounts?.filter(
    (account) => account.status === false
  );
  useEffect(() => {
    if (filteredAllAccounts) {
      setTotalPage(Math.ceil(filteredAllAccounts.length / limit));
    }
  }, [filteredAllAccounts]);
  return (
    <>
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
        <table className="flex flex-col w-full max-h-[407px]">
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
            {filteredAccounts?.map((user, i) => (
              <tr
                key={user.userId}
                className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40"
              >
                <td className="col-span-1 text-[13px]">{i + 1}</td>
                <td className="col-span-3 flex items-center gap-x-2">
                  <div className="flex flex-col">
                    <p className="text-[13px] font-semibold">{user.userName}</p>
                    <p className="text-[11px] text-normal">{user.email}</p>
                  </div>
                </td>
                <td className="col-span-2 text-[11px] font-semibold">
                  {" "}
                  {/* {account.address} */}
                </td>
                <td className="col-span-2 text-[13px] text-center font-semibold">
                  {user.phoneNumber}
                </td>
                <td className="col-span-2 flex justify-center">
                  <div
                    className={` flex justify-center w-fit px-3 gap-x-1 py-[2px] border border-warning rounded-lg`}
                  >
                    <IoIosInformationCircleOutline className={`text-warning`} />
                    <p
                      className={`text-[11px] font-semibold font-open text-warning`}
                    >
                      Chờ duyệt
                    </p>
                  </div>
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
                        onPress={() =>
                          showToast("Tài khoản đã được duyệt!", "success")
                        }
                        className="group"
                        color="default"
                        startContent={
                          <IoCheckmarkSharp className="text-[16px] group-hover:text-success" />
                        }
                        key="approve"
                      >
                        <p className="group-hover:text-success">
                          Duyệt tài khoản
                        </p>
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
    </>
  );
}
