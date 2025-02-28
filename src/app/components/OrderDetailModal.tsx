import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { LuPen } from "react-icons/lu";
import { formatPrice } from "../utils/format";
import { RiFileCloseLine } from "react-icons/ri";
import { MdCheck } from "react-icons/md";
import { useAtom } from "jotai";
import { orderDetailModalState } from "../store/modalAtoms";

export default function OrderDetailModal() {
  const [detailModal, setDetailModal] = useAtom(orderDetailModalState);

  const handleModalOff = () => {
    setDetailModal(false); // Close the modal
  };

  return (
    <AnimatePresence>
      {detailModal && (
        <motion.div
          className="fixed w-screen h-screen flex justify-end bg-black bg-opacity-70 z-[1000] font-open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="w-[450px] h-full max-h-full overflow-auto bg-[#111111] shadow-md absolute right-0 flex flex-col"
          >
            {/* header */}
            <div className="flex justify-between bg-[#090909] w-full px-[15px] py-[20px] sticky top-0 left-0 z-10">
              <div className="flex flex-col gap-y-[5px]">
                <p className="text-[18px]">#GH25000003</p>
                <p className="text-[12px] text-normal">Chi tiết hoá đơn</p>
              </div>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={handleModalOff}
              >
                <IoCloseSharp className="text-[20px] text-normal" />
              </Button>
            </div>

            {/* Order Details Section */}
            <div className="flex px-[15px] py-[25px] gap-x-[25px] border-b border-gray-400-40">
              <div className="flex flex-col gap-y-[10px]">
                <p className="text-[11px] text-normal">Ngày tạo</p>
                <p className="text-[13px]">28/02/2025 lúc 9:48pm</p>
              </div>
              <div className="flex flex-col gap-y-[10px]">
                <p className="text-[11px] text-normal">Trạng thái thanh toán</p>
                <p className="text-[10px] py-[2px] px-[10px] rounded-lg bg-success-200 w-fit">
                  Đã thanh toán
                </p>
              </div>
              <div className="flex flex-col gap-y-[10px]">
                <p className="text-[11px] text-normal">Trạng thái</p>
                <p className="text-[10px] py-[2px] px-[10px] w-fit text-warning-600 border border-warning-600 rounded-lg">
                  Chờ duyệt
                </p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
              <div className="flex justify-between">
                <p className="text-[11px] text-normal">Thông tin khách hàng</p>
                <Button variant="light" size="sm" isIconOnly>
                  <LuPen className="text-normal" />
                </Button>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[13px]">Trương Hoàng Trí</p>
                <p className="text-[13px] text-[#467AB9]">
                  tritruonghoang3@gmail.com
                </p>
                <p className="text-[13px]">0776003669</p>
                <p className="text-[13px]">
                  203 Nam Chau, P11, Tan Binh, TP.HCM
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="flex flex-col px-[15px] py-[25px] border-b border-gray-400-40">
              <p className="text-[11px] text-normal mb-[15px]">Sản phẩm</p>
              <div className="flex flex-col gap-y-[15px] mb-[15px]">
                <LineItem />
                <LineItem />
                <LineItem />
              </div>
              <p className="text-[11px] text-normal">+3 sản phẩm khác</p>
            </div>

            {/* Invoice Summary */}
            <div className="flex flex-col px-[15px] py-[25px]">
              <p className="text-[11px] text-normal mb-[15px]">Hoá đơn</p>
              <div className="flex flex-col gap-y-[10px]">
                <div className="flex justify-between">
                  <p className="text-[13px] font-light text-normal">Tạm tính</p>
                  <p className="text-[13px]">{formatPrice(10000000)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[13px] font-light text-normal">
                    Chiết khấu độc quyền
                  </p>
                  <p className="text-[13px]">{formatPrice(10000000)}</p>
                </div>
                <div className="flex justify-between mt-[10px]">
                  <p className="text-[13px] font-semibold">Tổng</p>
                  <p className="text-[13px] font-semibold">
                    {formatPrice(5000000000)}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="sticky left-0 bottom-0 flex justify-between px-[15px] gap-x-[15px] py-[25px] bg-[#111111] border-t border-gray-400-40">
              <Button
                size="sm"
                variant="flat"
                className="flex w-full"
                color="danger"
              >
                <RiFileCloseLine />
                <p>Huỷ đơn hàng</p>
              </Button>
              <Button
                size="sm"
                variant="flat"
                color="success"
                className="flex w-full"
              >
                <MdCheck />
                <p>Xác nhận đơn</p>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Line Item Component
const LineItem = () => {
  return (
    <div className="flex justify-between font-open gap-x-[15px]">
      <div className="flex items-center gap-x-[10px] max-w-[60%]">
        <Image
          src="/product.webp"
          alt=""
          width={45}
          height={45}
          className="object-cover rounded-lg"
        />
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[12px] line-clamp-2">Item name</p>
          <p className="text-[10px] text-normal">brand</p>
        </div>
      </div>
      <div className="flex items-center gap-x-[15px]">
        <p className="text-[12px] font-light">1 thùng</p>
        <p className="text-[12px] font-light text-foreground">
          {formatPrice(400000)}
        </p>
      </div>
    </div>
  );
};
