"use client";
import Image from "next/image";
import { formatPrice } from "../utils/format";
import { Button } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { createPaymentQR } from "../service/paymentService";
import { useAtomValue } from "jotai";
import loadingAnimation1 from "@/app/static/loading/loading3.json";
import { paymentState } from "../store/paymentAtoms";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function ScanQRPage() {
  const router = useRouter();
  const submitData = useAtomValue(paymentState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [url, setUrl] = useState("");
  const paymentMutation = useMutation({
    mutationKey: ["scan-qr"],
    mutationFn: createPaymentQR,
    onMutate() {
      setIsSubmit(true);
    },
    onSuccess(data) {
      if (data?.responseBody?.qrDataUrl) {
        setUrl(data.responseBody.qrDataUrl);
      } else {
        setUrl("");
      }
      setIsSubmit(false);
    },
  });
  useEffect(() => {
    if (submitData === null) {
      router.push("/checkout");
    }
  }, [submitData]);
  useEffect(() => {
    if (submitData) paymentMutation.mutate(submitData);
  }, [submitData]);

  if (isSubmit || !submitData) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <DynamicLottie
          animationData={loadingAnimation1}
          loop={true}
          className="w-[200px] h-[200px]"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col p-[30px] w-screen h-screen justify-center items-center overflow-x-hidden bg-background font-open">
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
        <p className="font-light text-normal text-sm">
          Số tiền cần chuyển:{" "}
          <span className="font-semibold text-primary">
            {formatPrice(submitData?.amount as number)}
          </span>
        </p>
      </div>
      <p className="text-[13px] text-normal mt-[30px] max-w-[70%] text-center">
        Lưu ý: Sau khi chuyển khoản thành công, vui lòng bấm vào{" "}
        <span className="font-semibold text-primary">Kiểm tra giao dịch</span>{" "}
        để tiếp tục. Hệ thống sẽ kiểm tra giao dịch, nếu thành công bạn đơn hàng
        của bạn sẽ có trạng thái thanh toán là{" "}
        <span className="font-semibold text-primary">Đã thanh toán.</span>
      </p>
      <div className="w-[30%] mt-[30px]">
        <Button className="w-full" variant="flat" color="secondary">
          Kiểm tra giao dịch
        </Button>
      </div>
    </div>
  );
}
