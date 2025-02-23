"use client";
import { Pagination } from "@heroui/pagination";
import {
  IoIosCheckboxOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { IoCheckmarkSharp, IoTrashBinOutline } from "react-icons/io5";
import { showToast } from "@/app/utils/toast";
import { useGetAccountsByLimitPending, useGetAllUser } from "@/app/hooks/hook";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPenAlt } from "react-icons/fa";
import { Input } from "@heroui/react";
import { atom, useAtom, useSetAtom } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAccountService,
  updateUserNote,
} from "@/app/service/accountService";
import { LoadingTable } from "@/app/components/loading";
const noteModalState = atom<string | null>(null);
const noteContentState = atom<string | null>(null);
export default function CEOPermissionPage() {
  const setNoteModal = useSetAtom(noteModalState);
  const setNoteContent = useSetAtom(noteContentState);
  const handleOffModal = (event: React.MouseEvent) => {
    if (!(event.target as HTMLElement).closest(".modal-content")) {
      setNoteModal(null);
      setNoteContent(null);
    }
  };

  return (
    <div
      className="flex flex-col font-open py-[20px] overflow-x-hidden"
      onClick={handleOffModal}
    >
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
  const [modalId, setModalId] = useAtom(noteModalState);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 8;
  const { data: allAccounts } = useGetAllUser();
  const { data: accounts, isLoading } = useGetAccountsByLimitPending(page);
  const [note, setNote] = useAtom(noteContentState);
  const [isSubmit, setIsSubmit] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const filteredAllAccounts = allAccounts?.filter(
    (user) => user.status === "pending"
  );
  const queryClient = useQueryClient();
  const deleteAccountMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteAccountService,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showToast("Xoá tài khoản thành công", "success");
    },
  });
  const updateNoteMutation = useMutation({
    mutationKey: ["update-note-user"],
    mutationFn: async ({ userId, note }: { userId: string; note: string }) =>
      updateUserNote(userId, { note }),
    onMutate() {
      setIsSubmit(true);
    },
    onSuccess() {
      setModalId(null);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsSubmit(false);
      showToast("Ghi chú thành công", "success");
    },
  });
  const handleOnChangeNote = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    userId: string
  ) => {
    if (e.key === "Enter") {
      handleSubmitNote(userId);
    }
  };

  const handleSubmitNote = async (userId: string) => {
    if (note === null) {
      showToast("Vui lòng nhập ghi chú", "error");
      return;
    }
    try {
      await updateNoteMutation.mutateAsync({
        userId: userId,
        note: note,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteAccountMutation.mutateAsync(userId);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (filteredAllAccounts) {
      setTotalPage(Math.ceil(filteredAllAccounts.length / limit));
      console.log(totalPage);
    }
  }, [filteredAllAccounts]);
  const handleToggleNoteModal = (userId: string) => {
    setModalId(userId);
  };
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
        <div className="flex flex-col w-full justify-center items-center h-[550px] gap-y-[20px]">
          <IoIosCheckboxOutline className="text-[50px] text-normal " />
          <p className="text-normal">
            Không có bất kì tài khoản nào đang chờ bạn duyệt.
          </p>
        </div>
      </>
    );
  }

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
        <table className="flex flex-col w-full">
          <thead>
            <tr className="grid grid-cols-12 mx-[20px] px-[20px] py-4 bg-[#111111] rounded-lg">
              <th className="col-span-1 text-[12px] text-normal font-light text-start">
                ID
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-start">
                Thông tin
              </th>
              <th className="col-span-3 text-[12px] text-normal font-light text-start">
                Địa chỉ
              </th>
              <th className="col-span-1 text-[12px] text-normal font-light text-center">
                Số điện thoại
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Trạng thái
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Ghi chú
              </th>
              <th className="col-span-1 text-[12px] text-normal font-light text-end">
                Thêm
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((user, i) => (
              <tr
                key={user.userId}
                className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40 relative"
              >
                <td className="col-span-1 text-[13px]">{i + 1}</td>
                <td className="col-span-2 flex items-center gap-x-2">
                  <div className="flex flex-col">
                    <p className="text-[13px] font-semibold">{user.userName}</p>
                    <p className="text-[11px] text-normal">{user.email}</p>
                  </div>
                </td>
                <td className="col-span-3 text-[11px] font-semibold">
                  {user.address.street}, {user.address.wardName},{" "}
                  {user.address.districtName}, {user.address.provinceName}
                </td>
                <td className="col-span-1 text-[13px] text-center font-semibold">
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
                <td className="col-span-2 text-[13px] text-center font-semibold">
                  {user.note}
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
                      <DropdownItem
                        onPress={() => handleToggleNoteModal(user.userId)}
                        className="group"
                        color="default"
                        startContent={
                          <FaPenAlt className="text-[16px] group-hover:text-foreground" />
                        }
                        key="write-note"
                      >
                        <p className="group-hover:text-foreground">Ghi chú</p>
                      </DropdownItem>
                      <DropdownItem
                        onPress={() => handleDeleteUser(user.userId)}
                        className="group"
                        color="default"
                        startContent={
                          <IoTrashBinOutline className="text-[16px] group-hover:text-danger" />
                        }
                        key="delete"
                      >
                        <p className="group-hover:text-danger">
                          Xoá tài khoản(test)
                        </p>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
                {/* note modal */}
                {modalId === user.userId && (
                  <td
                    className="absolute 3xl:left-[80%] 2xl:left-[75%] top-[7px] w-[300px] p-[10px] bg-default-50 rounded-[15px] z-10 modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="">
                      <Input
                        defaultValue={note as string}
                        onChange={handleOnChangeNote}
                        onKeyDown={(e) => handleKeyDown(e, user.userId)}
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
    </>
  );
}
