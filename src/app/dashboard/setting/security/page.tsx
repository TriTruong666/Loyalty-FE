"use client";
import NormalInput from "@/app/components/NormalInput";
import { ChangePasswordService } from "@/app/service/accountService";
import { userInfoState } from "@/app/store/accountAtoms";
import { showToast } from "@/app/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { ChangeEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { IoLockClosed } from "react-icons/io5";

export default function SettingPage() {
  const [isLocked, setIsLocked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const info = useAtomValue(userInfoState);
  const [submitData, setSubmitData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const changeMutation = useMutation({
    mutationKey: ["change-password"],
    mutationFn: ChangePasswordService,
    onMutate() {
      setIsSubmit(true);
    },
    onSuccess(data) {
      if (data.code === "INVALID_PASSWORD") {
        showToast("Mật khẩu cũ của bạn nhập không đúng", "error");
        setIsSubmit(false);
      }
      if (data.message === "Password changed successfully") {
        showToast("Thay đổi mật khẩu thành công", "success");
        setIsSubmit(false);
        setIsLocked(true);
        setSubmitData({
          newPassword: "",
          oldPassword: "",
          confirmPassword: "",
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
    if (
      submitData.oldPassword === "" ||
      submitData.newPassword === "" ||
      submitData.confirmPassword === ""
    ) {
      showToast("Vui lòng nhập đủ thông tin", "error");
      return;
    }
    if (submitData.newPassword !== submitData.confirmPassword) {
      showToast("Mật khẩu mới và mật khẩu xác nhận không trùng khớp", "error");
      return;
    }
    try {
      await changeMutation.mutateAsync({
        email: info?.email as string,
        newPassword: submitData.newPassword,
        oldPassword: submitData.oldPassword,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLock = () => {
    setIsLocked(true);
    setSubmitData({
      newPassword: "",
      oldPassword: "",
      confirmPassword: "",
    });
    showToast("Đã khoá", "success");
  };
  const handleUnlock = () => {
    setIsLocked(false);
    showToast("Bạn có thể đổi mật khẩu!", "success");
  };
  return (
    <div className="flex flex-col px-[40px] py-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[22px] font-light select-none">Bảo mật cá nhân</p>
          <p className="text-[12px] text-normal">Cập nhật mật khẩu của bạn</p>
        </div>
        <div className="flex items-center gap-x-[20px]">
          {isSubmit && (
            <p className="text-[13px] text-normal">Đang cập nhật...</p>
          )}
          <button
            disabled={isLocked}
            onClick={handleOnSubmit}
            className="flex disabled:cursor-not-allowed items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group"
          >
            <FiSave className="text-[16px] text-background" />
            <p className="text-[12px] text-background">Lưu thông tin</p>
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-[20px] gap-y-[10px]">
        {isLocked && (
          <div
            onClick={handleUnlock}
            className="flex justify-end w-fit self-end"
          >
            <p className="text-[13px] cursor-pointer text-danger-500 hover:underline">
              Tôi muốn đổi mật khẩu
            </p>
          </div>
        )}
        {!isLocked && (
          <div onClick={handleLock} className="flex justify-end w-fit self-end">
            <p className="text-[13px] cursor-pointer text-primary-500 hover:underline">
              Tôi không muốn đổi nữa!
            </p>
          </div>
        )}
        <NormalInput
          type="password"
          name="oldPassword"
          disabled={isLocked}
          onChange={handleOnChange}
          label="Nhập mật khẩu cũ"
          placeholder="***********"
          icon={<IoLockClosed size={20} />}
        />{" "}
        <div className="flex flex-col gap-y-2 font-inter">
          <label
            htmlFor="password"
            className="font-semibold text-sm 2xl:text-[12px] mb-1"
          >
            Mật khẩu mới
          </label>
          <div className="relative group flex items-center w-full py-3 px-3 border space-x-4 border-gray-400-40 rounded-md transition-all duration-300 hover:border-gray-400 hover:border-opacity-40 focus-within:border-gray-400 focus-within:border-opacity-40 hover:shadow-md focus-within:shadow-md">
            <FaKey size={20} className="text-gray-700" />
            <input
              disabled={isLocked}
              onChange={handleOnChange}
              name="newPassword"
              type={showPassword ? "text" : "password"} // Toggle Password Visibility
              placeholder="matkhaumoi234"
              className="placeholder:!text-normal placeholder:text-opacity-10 outline-none bg-transparent border-none w-full text-sm 2xl:text-[13px] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-500 hover:text-white transition"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 font-inter">
          <label
            htmlFor="confirm-pass"
            className="font-semibold text-sm 2xl:text-[12px] mb-1"
          >
            Nhập lại mật khẩu
          </label>
          <div className="relative group flex items-center w-full py-3 px-3 border space-x-4 border-gray-400-40 rounded-md transition-all duration-300 hover:border-gray-400 hover:border-opacity-40 focus-within:border-gray-400 focus-within:border-opacity-40 hover:shadow-md focus-within:shadow-md">
            <FaKey size={20} className="text-gray-700" />
            <input
              disabled={isLocked}
              onChange={handleOnChange}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"} // Toggle Password Visibility
              placeholder="nhaplaimatkhau123"
              className="placeholder:!text-normal placeholder:text-opacity-10 outline-none bg-transparent border-none w-full text-sm 2xl:text-[13px] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-gray-500 hover:text-white transition"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
