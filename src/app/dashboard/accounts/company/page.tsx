"use client";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Pagination } from "@heroui/pagination";
import {
  useGetAllUser,
  useGetCustomerUserByLimitByStatus,
} from "@/app/hooks/hook";
import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { showToast } from "@/app/utils/toast";
import { IoCheckmarkSharp } from "react-icons/io5";
import { LoadingTable } from "@/app/components/loading";
import { FaUserXmark } from "react-icons/fa6";
export default function AccountPage() {
  return (
    <div className="flex flex-col">
      <AccountStaffTable />
    </div>
  );
}

function AccountStaffTable() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 8;
  const { data: allAccounts = [] } = useGetAllUser();
  const { data: accounts, isLoading } = useGetCustomerUserByLimitByStatus(
    page,
    "active"
  );
  const filteredAllAccounts = allAccounts?.filter(
    (account) =>
      (account.type === "business" || account.type === "personal") &&
      account.status === "active"
  );

  useEffect(() => {
    if (filteredAllAccounts) {
      setTotalPage(Math.ceil(filteredAllAccounts.length / limit));
      console.log(totalPage);
    }
  }, [filteredAllAccounts]);
  const accountSort = [
    {
      key: "nameASC",
      title: "Tên A-Z",
    },
    {
      key: "nameDESC",
      title: "Tên Z-A",
    },
  ];
  if (isLoading) {
    return (
      <>
        <LoadingTable />
      </>
    );
  }

  if (accounts?.length === 0) {
    return (
      <>
        <div className="flex flex-col w-full justify-center items-center h-[500px] gap-y-[20px]">
          <FaUserXmark className="text-[50px] text-normal " />
          <p className="text-normal">
            Không tìm thấy bất kỳ tài khoản nào trong hệ thống
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center px-[40px] py-[20px] mt-[10px] justify-end gap-x-4">
        <div className="w-[250px]">
          <Select aria-label="sort" placeholder="Sắp xếp" variant="underlined">
            {accountSort.map((item) => (
              <SelectItem key={item.key}>{item.title}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex mt-[20px] flex-col items-center">
        <table className="flex flex-col w-full">
          <thead>
            <tr className="grid grid-cols-12 mx-[20px] px-[20px] py-4 bg-[#111111] rounded-lg">
              <th className="col-span-2 text-[12px] text-normal font-light text-start">
                ID
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-start">
                Thông tin
              </th>
              <th className="col-span-3 text-[12px] text-normal font-light text-start">
                Địa chỉ
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Số điện thoại
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Trạng thái
              </th>
              <th className="col-span-1 text-[12px] text-normal font-light text-end">
                Thêm
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((user) => (
              <tr
                key={user.userId}
                className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40"
              >
                <td className="col-span-2 text-[13px]">{user.userId}</td>
                <td className="col-span-2 flex items-center gap-x-2">
                  <div className="flex flex-col">
                    <p className="text-[13px] font-semibold">{user.userName}</p>
                    <p className="text-[11px] text-normal">{user.email}</p>
                  </div>
                </td>
                <td className="col-span-3 text-[11px] font-semibold">
                  {" "}
                  {user.address.street}, {user.address.wardName},{" "}
                  {user.address.districtName}, {user.address.provinceName}
                </td>
                <td className="col-span-2 text-[13px] text-center font-semibold">
                  {user.phoneNumber}
                </td>
                <td className="col-span-2 flex justify-center">
                  <div
                    className={`flex justify-center w-fit px-3 gap-x-1 py-[2px] border border-success rounded-lg`}
                  >
                    <IoIosInformationCircleOutline className={`text-success`} />
                    <p
                      className={`text-[11px] font-semibold font-open text-success`}
                    >
                      Đang hoạt động
                    </p>
                  </div>
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
