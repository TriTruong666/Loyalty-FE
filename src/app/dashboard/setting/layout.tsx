"use client";

import SettingMenu from "@/app/components/SettingMenu";
import { Suspense } from "react";
import SettingLoadingTableLayout from "./loading";

export default function SettingDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col font-open py-[20px]">
      <div className="flex items-center justify-between px-[40px]">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[28px] font-light select-none">Cài đặt</p>
          <p className="text-sm text-normal">
            Quản lý thông tin cá nhân của bạn, thiết lập bảo mật và hạng của
            bạn.
          </p>
        </div>
      </div>
      <SettingMenu />
      <Suspense fallback={<SettingLoadingTableLayout />}>
        <div className="">{children}</div>
      </Suspense>
    </div>
  );
}
