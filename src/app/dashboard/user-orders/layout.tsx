"use client";

export default function UserOrderDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col font-open py-[20px]">
      <div className="flex items-center justify-between px-[40px]">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[28px] font-light select-none">Đơn Hàng</p>
          <p className="text-sm text-normal">
            Xem các đơn hàng của bạn, có thể in hoặc xem chi tiết.
          </p>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
