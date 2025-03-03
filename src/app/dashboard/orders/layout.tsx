"use client";

import { AdminOrderStatusMenu } from "@/app/components/OrderStatusMenu";
import { Suspense } from "react";
import AdminOrderLoadingTableLayout from "./loading";

export default function OrderDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col font-open py-[20px]">
      <div className="flex items-center justify-between px-[40px]">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[28px] font-light select-none">Đơn Hàng</p>
          <p className="text-sm text-normal">
            Quản lý đơn hàng của Loyalty, theo dõi và cập nhật trạng thái.
          </p>
        </div>
      </div>

      <AdminOrderStatusMenu />
      <Suspense fallback={<AdminOrderLoadingTableLayout />}>
        <div className="">{children}</div>
      </Suspense>
    </div>
  );
}
