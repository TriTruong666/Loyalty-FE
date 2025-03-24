"use client";

import unauthorizeAnimation from "@/app/static/loading/unauthorize.json";
import { Button, Link } from "@heroui/react";
import dynamic from "next/dynamic";
import Image from "next/image";

const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function UnauthorizedPage() {
  return (
    <div className="w-screen h-screen overflow-hidden font-open flex flex-col py-[15px]">
      <div className="flex w-full justify-center">
        <Image
          src="/logo-dark2.png"
          alt="Logo"
          width={250}
          height={70}
          className="w-fit h-[60px] object-cover xl:h-[60px]"
        />
      </div>
      <div className="flex flex-col items-center px-[100px] justify-between mt-[40px]">
        <div className="flex">
          <DynamicLottie
            animationData={unauthorizeAnimation}
            loop={false}
            className="w-[400px] h-[400px]"
          />
        </div>
        <div className="flex flex-col items-center gap-y-[15px]">
          <p className="text-[30px] font-bold">Không thể truy cập</p>
          <p className="text-normal font-light">
            Trang mà bạn đang cố gắng truy cập đã được bảo vệ, bạn không có đủ
            quyền để vào!
          </p>
          <Button
            variant="flat"
            className="w-[300px] mt-[30px]"
            as={Link}
            href="/"
          >
            Trở về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
