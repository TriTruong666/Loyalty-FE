"use client";
import NormalInput from "@/app/components/NormalInput";
import { FiSave } from "react-icons/fi";
import { TbLockPassword } from "react-icons/tb";
import { useState } from "react";

export default function SettingPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col px-[40px] py-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[22px] font-light select-none">
            Thông tin cá nhân
          </p>
          <p className="text-[12px] text-normal">
            Cập nhật thông tin cá nhân của bạn
          </p>
        </div>
        <div className="flex items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group">
          <FiSave className="text-[16px] text-background" />
          <p className="text-[12px] text-background">Lưu thông tin</p>
        </div>
      </div>
      <div className="flex flex-col mt-[40px] gap-y-[20px]">
        <div className="border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Mật khẩu:</p>
              <p className="flex">**********</p>
            </div>

            <div className="flex items-center gap-x-3">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-xs text-gray-400">Tốt</span>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Đổi Mật Khẩu
              </button>
            </div>
          </div>

          {isEditing ? (
            <div className="mt-4 space-y-4">
              <NormalInput
                label="Mật khẩu hiện tại"
                placeholder="Mật khẩu hiện tại"
                type="password"
                icon={<TbLockPassword size={20} />}
              />
              <NormalInput
                label="Nhập mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                type="password"
                icon={<TbLockPassword size={20} />}
              />
              <NormalInput
                label="Xác nhận mật khẩu mới"
                placeholder="Xác nhận mật khẩu mới"
                type="password"
                icon={<TbLockPassword size={20} />}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
