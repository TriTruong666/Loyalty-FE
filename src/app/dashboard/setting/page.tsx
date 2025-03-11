"use client";
import NormalInput from "@/app/components/NormalInput";
import { UpdateUser, updateUserService } from "@/app/service/accountService";
import { userInfoState } from "@/app/store/accountAtoms";
import { showToast } from "@/app/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { IoMail } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";

export default function SettingPage() {
  const info = useAtomValue(userInfoState);
  const [submitData, setSubmitData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    mst: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (info) {
      setSubmitData({
        ...submitData,
        email: info.email || "",
        mst: info.mst || "",
        phoneNumber: info.phoneNumber || "",
        userName: info.userName || "",
      });
    }
  }, [info]);
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateUser;
    }) => updateUserService(userId, data),
    onMutate() {
      setIsSubmit(true);
    },
    onSuccess(data) {
      if (data.message === "Updated Successfully") {
        setIsSubmit(false);
        showToast("Cập nhật thông tin thành công", "success");
        queryClient.invalidateQueries({
          queryKey: ["user-info"],
        });
      }
      setIsSubmit(false);
    },
  });
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleOnSubmit = async () => {
    try {
      await updateMutation.mutateAsync({
        userId: info?.userId as string,
        data: {
          userName: submitData.userName,
          email: submitData.email,
          phoneNumber: submitData.phoneNumber,
          mst: submitData.mst as string,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col px-[40px] py-[30px] font-open">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[22px] font-light select-none">
            Thông tin cá nhân
          </p>
          <p className="text-[12px] text-normal">
            Cập nhật thông tin cá nhân của bạn
          </p>
        </div>
        <div className="flex items-center gap-x-[20px]">
          {isSubmit && (
            <p className="text-[13px] text-normal">Đang cập nhật...</p>
          )}
          <button
            onClick={handleOnSubmit}
            className="flex disabled:bg-gray-500 disabled:cursor-not-allowed items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group"
          >
            <FiSave className="text-[16px] text-background" />
            <p className="text-[12px] text-background">Lưu thông tin</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-[40px] gap-y-[20px]">
        <NormalInput
          disabled
          defaultValue={submitData?.email}
          label="Địa chỉ email"
          placeholder="email123@gmail.com"
          icon={<IoMail size={20} />}
        />
        <NormalInput
          label="Tên của bạn"
          name="userName"
          onChange={handleOnChange}
          defaultValue={submitData?.userName}
          placeholder="Nguyễn Văn A"
          icon={<FaUserTie size={20} />}
        />
        <NormalInput
          label="Số điện thoại"
          name="phoneNumber"
          onChange={handleOnChange}
          defaultValue={submitData?.phoneNumber}
          placeholder="0776003669"
          icon={<MdLocalPhone size={20} />}
          max={10}
        />
        {info?.type === "business" && (
          <NormalInput
            label="Mã số thuế"
            name="mst"
            onChange={handleOnChange}
            defaultValue={submitData?.mst || ""}
            placeholder="2803148208"
            icon={<RiBuilding2Fill size={20} />}
          />
        )}
      </div>
    </div>
  );
}
