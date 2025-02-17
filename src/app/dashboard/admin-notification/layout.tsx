"use client";
import NotificationItem from "@/app/components/NotificationItem";
import { HiPlusSmall } from "react-icons/hi2";

export default function NotificationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex font-open">
      {/* list */}
      <div className="flex flex-col w-[50%] border-r border-gray-400-40 min-h-[calc(100vh-80px)]">
        <div className="flex items-center justify-between px-[40px] py-[20px]">
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[28px] font-light select-none">Thông báo</p>
            <p className="text-sm text-normal">
              Xem các thông báo về đơn hàng sắp tới, tạo thông báo cho toàn hệ
              thống.
            </p>
          </div>
        </div>
        <div className="flex px-[40px] mt-[20px]">
          <div className="flex items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group">
            <HiPlusSmall className="text-[16px] text-background" />
            <p className="text-[12px] text-background">Tạo thông báo</p>
          </div>
        </div>
        <div className="flex flex-col mt-[40px] border-t border-gray-400-40">
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </div>
      </div>
      <div className="w-[50%]">{children}</div>
    </div>
  );
}
