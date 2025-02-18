"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { cartDropdownState } from "../store/dropdownAtoms";
import Image from "next/image";
import { formatPrice } from "../utils/format";
import { Button, Link } from "@heroui/react";

export default function CartDropdown() {
  const isToggleDropdown = useAtomValue(cartDropdownState);

  return (
    <AnimatePresence>
      {isToggleDropdown && (
        <motion.div
          initial={{ opacity: 0, translateX: 100 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, display: "none", translateX: 100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed flex flex-col w-[350px] 3xl:w-[400px] max-h-[600px] z-[50] border border-gray-400-40 bg-background top-[70px] left-[1120px] 3xl:left-[1450px] rounded-[15px] pb-[10px] font-open"
        >
          <p className="font-open font-light w-full px-[20px] py-[20px] sticky top-0 left-0 z-[60]">
            Giỏ hàng của bạn
          </p>

          <div className="flex-1 overflow-auto border-t border-gray-400-40">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>

          <div className="sticky bottom-0 left-0 w-full bg-background border-t border-gray-400-40 px-[20px] py-[10px]">
            <div className="flex justify-between mb-[10px]">
              <p className="text-sm text-normal">Tạm tính</p>
              <p className="text-sm text-primary font-semibold">
                {formatPrice(26000000)}
              </p>
            </div>
            <Button
              as={Link}
              href="/dashboard/cart"
              className="w-full"
              variant="flat"
              color="secondary"
            >
              <p>Đi tới giỏ hàng</p>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartItem() {
  return (
    <div className="flex gap-x-[10px] border-b border-gray-400-40 px-[20px] py-[20px] duration-200 transition-all hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer">
      <Image
        alt=""
        src="/product.webp"
        width={60}
        height={60}
        className="object-cover rounded-[7px]"
      />
      <div className="flex flex-col justify-between">
        <div className="flex justify-between gap-x-[10px]">
          <p className="text-[11px] line-clamp-2">
            Dưỡng chất dưỡng da giúp mờ thâm nám dưỡng sáng da La Roche Posay
            Mela B3 Serum 30ml
          </p>
          <p className="text-[11px] text-normal font-light">x3</p>
        </div>
        <p className="font-semibold text-[13px]">{formatPrice(1300000)}</p>
      </div>
    </div>
  );
}
