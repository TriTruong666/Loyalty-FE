"use client";

import { IoNotificationsOutline } from "react-icons/io5";

export default function NotificationPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-y-[20px]">
      <IoNotificationsOutline className="text-[40px] text-normal" />
      <p className="text-normal font-light">
        Vui lòng chọn thông báo để biết thêm chi tiết
      </p>
    </div>
  );
}
