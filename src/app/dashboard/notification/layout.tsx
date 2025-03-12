"use client";
import NotificationItem from "@/app/components/NotificationItem";
import { useGetListNotification } from "@/app/hooks/hook";
import { userInfoState } from "@/app/store/accountAtoms";
import { createNotificationState } from "@/app/store/modalAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { HiPlusSmall } from "react-icons/hi2";

export default function NotificationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setModal = useSetAtom(createNotificationState);
  const info = useAtomValue(userInfoState);
  const handleToggleModalOn = () => {
    setModal(true);
  };
  const { data: notifications, isLoading } = useGetListNotification();

  return (
    <div className="flex font-open">
      {/* list */}
      {isLoading ? (
        <>
          <div className="flex flex-col w-[50%] border-r border-gray-400-40 min-h-[calc(100vh-80px)]"></div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-[50%] border-r border-gray-400-40 min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex items-center justify-between px-[40px] py-[20px]">
              <div className="flex flex-col gap-y-[5px]">
                <p className="text-[28px] font-light select-none">Thông báo</p>
                {info?.type === "ceo" && (
                  <p className="text-sm text-normal">
                    Xem các thông báo về đơn hàng sắp tới, tạo thông báo cho
                    toàn hệ thống.
                  </p>
                )}
                {info?.type === "admin" && (
                  <p className="text-sm text-normal">
                    Xem các thông báo về đơn hàng sắp tới, tạo thông báo cho
                    toàn hệ thống.
                  </p>
                )}
                {info?.type === "business" && (
                  <p className="text-sm text-normal">
                    Theo dõi thông báo đến tự hệ thống của PicareVN Loyalty, các
                    khuyến hoặc sự kiện sắp tới.
                  </p>
                )}
                {info?.type === "sales" && (
                  <p className="text-sm text-normal">
                    Theo dõi thông báo đến tự hệ thống của PicareVN Loyalty, các
                    khuyến hoặc sự kiện sắp tới.
                  </p>
                )}
                {info?.type === "personal" && (
                  <p className="text-sm text-normal">
                    Theo dõi thông báo đến tự hệ thống của PicareVN Loyalty, các
                    khuyến hoặc sự kiện sắp tới.
                  </p>
                )}
              </div>
            </div>
            {info?.type === "admin" && (
              <div className="flex px-[40px] mt-[20px]">
                <div
                  onClick={handleToggleModalOn}
                  className="flex items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group"
                >
                  <HiPlusSmall className="text-[16px] text-background" />
                  <p className="text-[12px] text-background">Tạo thông báo</p>
                </div>
              </div>
            )}
            {info?.type === "ceo" && (
              <div className="flex px-[40px] mt-[20px]">
                <div
                  onClick={handleToggleModalOn}
                  className="flex items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group"
                >
                  <HiPlusSmall className="text-[16px] text-background" />
                  <p className="text-[12px] text-background">Tạo thông báo</p>
                </div>
              </div>
            )}
            <div className="flex flex-col mt-[40px] border-t border-gray-400-40">
              {notifications?.map((item) => (
                <NotificationItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="w-[50%] min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
