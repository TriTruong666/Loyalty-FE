"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineNotification } from "react-icons/ai";
import { useAtomValue } from "jotai";
import { notificationDropdownState } from "../store/dropdownAtoms";
import { useGetListNotification } from "../hooks/hook";
import { Notification as NotificationProps } from "../interfaces/Notification";
import { formatRelativeTime } from "../utils/format";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
export default function NotificationDropdown() {
  const isToggleDropdown = useAtomValue(notificationDropdownState);
  const { data: notifications } = useGetListNotification();

  return (
    <AnimatePresence>
      {isToggleDropdown && (
        <motion.div
          initial={{ opacity: 0, translateX: 100 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, display: "none", translateX: 100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed flex flex-col w-[350px] 3xl:w-[400px] h-[600px] 3xl:h-[800px] overflow-auto max-h-[600px] z-[50] border border-gray-400-40 bg-background top-[70px] left-[1050px] 3xl:left-[1400px] rounded-[15px] pb-[20px] font-open"
        >
          {/* Header */}
          <p className="font-open font-light w-full px-[20px] py-[20px] sticky top-0 left-0 bg-background z-[60]">
            Thông báo
          </p>
          {notifications?.length === 0 ? (
            <>
              <div className="h-[500px] w-full flex flex-col justify-center items-center gap-y-[20px]">
                <IoMdNotificationsOutline className="text-normal text-[30px]" />
                <p className="text-normal text-sm font-light">
                  Hiện tại không có thông báo nào
                </p>
              </div>
            </>
          ) : (
            <>
              {/* List */}
              <div className="flex flex-col border-t border-gray-400-40">
                {notifications?.map((item) => (
                  <NotificationItem key={item.id} {...item} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NotificationItem(props: NotificationProps) {
  return (
    <Link
      href={`/dashboard/notification/detail/${props.id}`}
      className="flex gap-x-[10px] border-b border-gray-400-40 px-[20px] py-[10px] duration-200 transition-all hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer"
    >
      <AiOutlineNotification className="text-[22px]" />
      <div className="flex flex-col">
        <p className="line-clamp-2 font-semibold text-sm">{props.title}</p>
        <p className="text-[12px] text-normal">
          {formatRelativeTime(props.createdDate)}
        </p>
      </div>
    </Link>
  );
}
