"use client";
import successAnimation2 from "@/app/static/loading/buy-success2.json";
import { Button, Link } from "@heroui/react";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col p-[30px] w-screen h-screen justify-center items-center overflow-x-hidden bg-background font-open">
      <DynamicLottie
        animationData={successAnimation2}
        loop={false}
        autoPlay={true}
        className="w-[200px] h-[200px]"
      />
      <div className="flex flex-col items-center gap-y-[10px]">
        <p className="text-[34px] font-semibold">Bạn đã đặt hàng thành công</p>
        <p className="text-normal font-light">
          Loyalty sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng. Xin
          cảm ơn
        </p>
      </div>
      <div className="flex items-center w-[40%] justify-center mt-[30px] gap-x-[30px]">
        <Button
          as={Link}
          href="/dashboard"
          className="font-bold w-full"
          radius="full"
          variant="flat"
          color="default"
          size="lg"
        >
          <p>Trang chủ</p>
        </Button>
        <Button
          as={Link}
          href="/dashboard/user-orders"
          className="font-bold w-full"
          variant="flat"
          radius="full"
          color="secondary"
          size="lg"
        >
          <p>Xem đơn hàng</p>
        </Button>
      </div>
    </div>
  );
}
