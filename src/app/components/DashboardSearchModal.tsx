"use client";

import { IoIosSearch } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { dashboardSearchModalState } from "../store/modalAtoms";
import { useEffect } from "react";
export default function DashboardSearchModal() {
  const [isToggleModal, setIsToggleModal] = useAtom(dashboardSearchModalState);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsToggleModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsToggleModal]);

  return (
    <AnimatePresence>
      {isToggleModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-90"
        >
          <div className="w-[700px] bg-black flex flex-col transition-all duration-300 relative rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)] border border-neutral-700 border-opacity-50">
            <UserSearch />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function UserSearch() {
  return (
    <div className="flex flex-col font-open">
      {/* Search */}
      <div className="flex items-center justify-between px-[20px] py-[15px]">
        <div className="flex justify-between items-center gap-x-[10px] w-full pr-[10px]">
          <IoIosSearch className="text-[24px]" />
          <input
            type="text"
            className="outline-none bg-transparent border-none w-full text-[16px] font-light"
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
        {/* badge */}
        <span className="px-[8px] py-[4px] rounded-[7px] bg-neutral-700 text-[10px]">
          ESC
        </span>
      </div>
      {/* Brand & Product */}
      <div className="flex border-t border-neutral-700 border-opacity-50">
        {/* Brand */}
        <div className="flex flex-col w-[30%] border-r border-neutral-700 border-opacity-50 px-[20px]  py-[15px]">
          <p className="text-[12px]">Nhãn hàng độc quyền</p>
          <div className="flex flex-col mt-[15px] gap-y-[10px]">
            <BrandItem brandName="Easydew" />
            <BrandItem brandName="Easydew" />
            <BrandItem brandName="Easydew" />
            <BrandItem brandName="Easydew" />
            <BrandItem brandName="Easydew" />
          </div>
        </div>
        {/* Products */}
      </div>
    </div>
  );
}

interface BrandProps {
  brandName: string;
}

function BrandItem(props: BrandProps) {
  return (
    <div className="flex py-[12px] px-[15px] bg-neutral-700 bg-opacity-30 rounded-xl cursor-pointer group hover:bg-neutral-700 hover:bg-opacity-70 transition-all duration-300">
      <p className="text-sm text-normal group-hover:text-foreground transition-all duration-300">
        {props.brandName}
      </p>
    </div>
  );
}
