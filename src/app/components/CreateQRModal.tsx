"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { qrImageState, responsePaymentState } from "../store/paymentAtoms";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "../utils/format";
import { Button } from "@heroui/react";
import { checkTransactionService } from "../service/orderService";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/toast";
import { createQRModalState } from "../store/modalAtoms";

export default function CreateQRModal() {
  const isToggleModal = useAtomValue(createQRModalState);
  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[1000px] bg-black flex flex-col transition-all duration-300 items-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <QRScan />
      </div>
    </div>
  );
}

function QRScan() {
  const [url, setUrl] = useAtom(qrImageState);
  const [isLoading, setIsLoading] = useState(false);
  const responseData = useAtomValue(responsePaymentState);
  const setModal = useSetAtom(createQRModalState);
  const checkMutation = useMutation({
    mutationKey: ["check-payment"],
    mutationFn: checkTransactionService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.transactionStatus === "pending") {
        showToast(
          "Giao dịch chưa được thanh toán, vui lòng kiểm tra lại!",
          "error"
        );
        setIsLoading(false);
      }
      if (data.transactionStatus === "confirmed") {
        showToast("Bạn đã thanh toán đơn này, xin cảm ơn!", "success");
        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });
  const handleCheckPayment = async () => {
    try {
      await checkMutation.mutateAsync(responseData.orderID);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModal = () => {
    setUrl("");
    setModal(false);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <p className="text-[22px] font-bold font-inter">
        Quét QR này để chuyển khoản
      </p>
      {url && (
        <Image
          src={url}
          alt="QR Code"
          width={300}
          height={300}
          className="object-cover rounded-[20px]"
        />
      )}
      <div className="flex flex-col mt-[20px] items-center gap-y-[10px]">
        <p className="font-light text-normal text-sm">
          Mã đơn hàng:{" "}
          <span className="font-semibold text-foreground">
            {responseData.orderID}
          </span>
        </p>
        <p className="font-light text-normal text-sm">
          Ngân hàng thụ hưởng:{" "}
          <span className="font-semibold text-foreground">Ngân Hàng ACB</span>
        </p>
        <p className="font-light text-normal text-sm">
          Tài khoản thụ hưởng:{" "}
          <span className="font-semibold text-foreground">
            CTY TNHH PICARE VIET NAM
          </span>
        </p>
        <p className="font-light text-normal text-sm">
          Số tài khoản:{" "}
          <span className="font-semibold text-foreground">
            PICMS{responseData.orderID}
          </span>
        </p>
        <p className="font-light text-normal text-[15px]">
          Số tiền cần chuyển:{" "}
          <span className="font-semibold text-primary">
            {formatPrice(Number(responseData.amount))}
          </span>
        </p>
      </div>
      <div className="flex items-center w-full mt-[20px] gap-x-4">
        <Button
          className="w-full"
          variant="flat"
          color="default"
          size="lg"
          onPress={handleCloseModal}
        >
          <p className="font-bold">Quay lại</p>
        </Button>
        <Button
          className="w-full"
          variant="flat"
          color="secondary"
          size="lg"
          isDisabled={isLoading}
          isLoading={isLoading}
          onPress={handleCheckPayment}
        >
          <p className="text-secondary font-bold">Kiểm tra giao dịch</p>
        </Button>
      </div>
    </div>
  );
}
