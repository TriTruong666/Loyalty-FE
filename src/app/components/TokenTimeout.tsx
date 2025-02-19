"use client";

import { Button } from "@heroui/react";
import { IoWarningOutline } from "react-icons/io5";
import { logoutService } from "../service/authenticateService";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { tokenTimeoutState } from "../store/modalAtoms";

export default function TokenTimeout() {
  const setModal = useSetAtom(tokenTimeoutState);
  const router = useRouter();
  const handleLogout = () => {
    setModal(false);
    logoutService();
    router.push("/");
  };
  return (
    <div className="fixed w-screen h-screen z-[9999] bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-[10px] bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 flex justify-center items-center font-open">
      <div className="flex flex-col bg-gray-700 bg-opacity-30 items-center py-[30px] px-[60px] rounded-[15px]">
        <IoWarningOutline className="text-[50px] text-danger mb-[10px]" />
        <p className="font-semibold mb-[20px]">
          Phiên đăng nhập của bạn đã hết hạn
        </p>
        <Button
          variant="flat"
          color="danger"
          className="w-full"
          onPress={handleLogout}
        >
          <p>Đăng nhập lại</p>
        </Button>
      </div>
    </div>
  );
}
