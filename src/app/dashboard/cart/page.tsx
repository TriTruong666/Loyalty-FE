"use client";
import { Link, Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
export default function CartPage() {
  return (
    <div className="flex flex-col font-open py-[20px] mb-[50px]">
      <div className="flex flex-col px-[40px] gap-y-[5px]select-none">
        <p className="text-[28px] font-light ">Giỏ hàng của bạn</p>
        <p className="text-sm text-normal">
          Chọn những sản phẩm tốt nhất và bạn có thể xem chiết khấu{" "}
          <span className="font-bold text-white underline cursor-pointer">
            Tại đây
          </span>
        </p>
      </div>
      <div className="flex px-[40px] mt-[40px] justify-between">
        {/* cart */}
        <div className="flex flex-col w-[60%] gap-y-[40px]">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        {/* checkout */}
        <div className="flex flex-col w-[35%] border border-gray-400-40 p-[20px] rounded-[15px] h-fit">
          <p className="font-light text-[22px] mb-[20px]">Thanh toán</p>
          <div className="flex flex-col gap-y-[20px]">
            <div className="flex justify-between">
              <p className="font-light text-normal">Tạm tính</p>
              <p className="font-bold">113,300,000₫</p>
            </div>
            <div className="flex justify-between">
              <p className="font-light text-normal">Chiết khấu</p>
              <p className="font-bold">-11,330,000₫</p>
            </div>
            <div className="flex justify-between">
              <p className="font-light text-normal">Hạng Loyalty</p>
              <p className="font-bold">Gold</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-normal">Tổng</p>
              <p className="font-bold text-primary">101,970,000₫</p>
            </div>
          </div>
          <div className="mt-[30px] w-full">
            <Button
              className="w-full"
              variant="flat"
              as={Link}
              color="secondary"
              href="/checkout"
            >
              <p className="font-bold font-open">Thanh toán</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem() {
  return (
    <div className="flex pl-[20px] border-l-[2px]">
      <div className="flex flex-col justify-between w-[70%] gap-y-[10px]">
        <p className="text-sm max-w-[95%] line-clamp-2">
          Dưỡng chất dưỡng da giúp mờ thâm nám dưỡng sáng da La Roche Posay Mela
          B3 Serum 30ml
        </p>
        <div className="flex items-center gap-x-[20px]">
          <div className="flex items-center gap-x-[10px]">
            <Button isIconOnly variant="flat" size="sm">
              <p className="text-[20px]">+</p>
            </Button>
            <p>1</p>
            <Button isIconOnly variant="flat" size="sm">
              <p className="text-[20px]">-</p>
            </Button>
          </div>
          <p className="text-normal text-sm">
            Đơn vị tính:{" "}
            <span className="font-bold text-foreground">Thùng</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between w-[30%] items-end">
        <p className="text-[15px] text-primary font-bold w-fit">1,300,000₫</p>

        <div className="flex">
          <Button isIconOnly variant="light" size="md" color="danger">
            <FaTrash className="text-[16px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
