"use client";

export default function MediaDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col font-open py-[20px]">
      <div className="flex items-center justify-between px-[40px]">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[28px] font-light select-none">Thư viện ảnh</p>
          <p className="text-sm text-normal">
            Xem hoặc xoá những ảnh bạn đã upload lên hệ thống.
          </p>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
