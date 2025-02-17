"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineNotification } from "react-icons/ai";
import { useAtom, useAtomValue } from "jotai";
import { notificationDropdownState } from "../store/dropdownAtoms";

export default function NotificationDropdown() {
  const isToggleDropdown = useAtomValue(notificationDropdownState);

  return (
    <AnimatePresence>
      {isToggleDropdown && (
        <motion.div
          initial={{ opacity: 0, translateX: 100 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, display: "none", translateX: 100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed flex flex-col w-[350px] 2xl:max-h-[800px] h-[600px] overflow-auto max-h-[600px] z-[50] border border-gray-400-40 bg-background top-[70px] left-[1050px] rounded-[15px] pb-[20px] font-open"
        >
          {/* Header */}
          <p className="font-semibold w-full px-[20px] py-[20px] sticky top-0 left-0 bg-background z-[60]">
            Thông báo của bạn
          </p>

          {/* List */}
          <div className="flex flex-col border-t border-gray-400-40">
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NotificationItem() {
  return (
    <div className="flex gap-x-[10px] border-b border-gray-400-40 px-[20px] py-[10px] duration-200 transition-all hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer">
      <AiOutlineNotification className="text-[22px]" />
      <div className="flex flex-col">
        <p className="line-clamp-2 font-semibold text-sm">
          Thông báo về việc bảo trì server
        </p>
        <p className="text-[12px] text-normal">2 phút trước</p>
      </div>
    </div>
  );
}
