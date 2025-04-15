"use client";

import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { IoIosArrowRoundBack, IoMdSend } from "react-icons/io";
import { Accordion, AccordionItem } from "@heroui/accordion";
export default function SupportPage() {
  const accordionList: AccordionProps[] = [
    {
      title: "Tại sao",
      content: "",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen p-[30px] w-screen overflow-hidden bg-background font-open">
      <Toaster position="top-center" reverseOrder={false} />
      <Link
        color="foreground"
        href="/dashboard"
        className="flex items-center text-normal gap-x-[10px] w-fit"
      >
        <IoIosArrowRoundBack className="text-[20px]" />
        <p className="font-light">Quay lại</p>
      </Link>
      {/* FAQ */}
      <div className="flex px-[40px] py-[60px]">
        <div className="flex flex-col gap-y-[15px]">
          <p className="font-semibold text-[26px]">Tổng quan FAQs</p>
          <p className="font-light text-[13px] max-w-[53%]">
            Đây là những thắc mắc mà quý khách có thể gặp phải trong quá trình
            sử dụng website Loyalty. Nếu bạn có bất kỳ câu hỏi nào có thể gửi
            ticket cho chùng tôi hoặc liên hệ:{" "}
          </p>
        </div>
      </div>
      {/* Mail Support */}
      <div className="w-full flex flex-col items-center gap-y-[10px]">
        <p className="font-semibold text-[32px]">Gửi yêu cầu hỗ trợ</p>
        <p className="font-light text-normal text-sm max-w-[45%] text-center">
          Yêu cầu hỗ trợ của bạn sẽ được xử lý trong vòng 1-2 ngày, bạn sẽ nhận
          được mail phản hồi trong thời gian đó, trong quá trình hỗ trợ có thể
          website sẽ bị gián đoạn nếu gặp trường hợp đặc biệt, mong quý khách
          thông cảm.
        </p>
        <div className="flex items-center gap-[20px] w-full max-w-2xl mt-[20px]">
          {/* input */}
          <input
            type="text"
            placeholder="Nhập miêu tả yêu cầu..."
            className="flex-1 h-12 rounded-md px-[20px] outline-none bg-transparent border border-neutral-800 border-opacity-45 hover:border-white/20 focus:border-white/20 duration-300 transition-all"
          />

          {/* button */}
          <button className="h-12 w-[130px] group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-neutral-800 border-opacity-45 hover:border-white/20 ">
            <span className="text-lg">
              <IoMdSend className="text-[22px]" />
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  title: string;
  content: string;
}
