"use client";
import Image from "next/image";
import { formatPrice } from "../utils/format";
import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { qrImageState } from "../store/paymentAtoms";
import { cartState, totalCartValueAtoms } from "../store/cartAtoms";
import { useMutation } from "@tanstack/react-query";
import { checkTransactionService } from "../service/orderService";
import { useState } from "react";
import { checkoutResponseState } from "../store/checkoutAtoms";
import { Toaster } from "react-hot-toast";
import { showToast } from "../utils/toast";

export default function ScanQRPage() {
  const [progress, setProgress] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const orderId = useAtomValue(checkoutResponseState);
  const setCart = useSetAtom(cartState);
  const url = useAtomValue(qrImageState);
  const totalCartValue = useAtomValue(totalCartValueAtoms);

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
        setProgress(2);
        setIsLoading(false);
      }
      if (data.transactionStatus === "confirmed") {
        showToast("Bạn đã thanh toán đơn này, xin cảm ơn!", "success");
        if (typeof window !== "undefined") {
          window.location.href = "/payment-success";
        }
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }
        setIsLoading(false);
        setTimeout(() => {
          setCart({
            cartItems: [],
            gifts: [],
          });
        }, 500);
        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });

  const handleCheckPayment = async () => {
    try {
      await checkMutation.mutateAsync(orderId);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePaymentLater = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/payment-success";
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    setIsLoading(false);
    setTimeout(() => {
      setCart({
        cartItems: [],
        gifts: [],
      });
    }, 500);
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col p-[30px] w-screen h-screen justify-center items-center overflow-x-hidden bg-background font-open">
      <Toaster position="top-center" reverseOrder={false} />
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
          <span className="font-semibold text-foreground">{orderId}</span>
        </p>
        <p className="font-light text-normal text-sm">
          Ngân hàng thụ hưởng:{" "}
          <span className="font-semibold text-foreground">
            Ngân Hàng Quân Đội MB
          </span>
        </p>
        <p className="font-light text-normal text-sm">
          Tài khoản thụ hưởng:{" "}
          <span className="font-semibold text-foreground">
            TRUONG HOANG TRI
          </span>
        </p>
        <p className="font-light text-normal text-sm">
          Số tài khoản:{" "}
          <span className="font-semibold text-foreground">0921191360</span>
        </p>
        <p className="font-light text-normal text-[15px]">
          Số tiền cần chuyển:{" "}
          <span className="font-semibold text-primary">
            {formatPrice(totalCartValue as number)}
          </span>
        </p>
      </div>
      <p className="text-[13px] text-normal mt-[30px] max-w-[70%] text-center">
        Lưu ý: Quý khách vui lòng kiểm tra thông tin thanh toán trước khi thực
        hiện giao dịch. Sau khi chuyển khoản thành công, vui lòng bấm vào{" "}
        <span className="font-semibold text-primary">Kiểm tra giao dịch</span>{" "}
        để tiếp tục. Hệ thống sẽ kiểm tra giao dịch, nếu thành công bạn đơn hàng
        của bạn sẽ có trạng thái thanh toán là{" "}
        <span className="font-semibold text-primary">Đã thanh toán.</span>
      </p>
      {progress === 1 && (
        <div className="w-[30%] mt-[30px]">
          <Button
            className="w-full"
            variant="flat"
            isLoading={isLoading}
            isDisabled={isLoading}
            color="secondary"
            onPress={handleCheckPayment}
          >
            Kiểm tra giao dịch
          </Button>
        </div>
      )}
      {progress === 2 && (
        <div className="w-[30%] mt-[30px] flex gap-x-[20px]">
          <Button
            className="w-[50%]"
            variant="flat"
            color="default"
            onPress={handlePaymentLater}
          >
            Thanh toán sau
          </Button>
          <Button
            className="w-[50%]"
            variant="flat"
            isLoading={isLoading}
            isDisabled={isLoading}
            color="secondary"
            onPress={handleCheckPayment}
          >
            Kiểm tra giao dịch
          </Button>
        </div>
      )}
    </div>
  );
}
