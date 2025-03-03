import dynamic from "next/dynamic";
import deliveryAnimation from "@/app/static/loading/delivery.json";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { deliveryOrderState } from "../store/orderAtomts";
import { deliveryOrderModalState } from "../store/modalAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderService } from "../service/orderService";
import { useState } from "react";
import { showToast } from "../utils/toast";
import { GrMoney } from "react-icons/gr";
import { useGetDetailOrder } from "../hooks/hook";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function DeliveryOrderConfirmModal() {
  const isToggleModal = useAtomValue(deliveryOrderModalState);
  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[600px] bg-black flex flex-col transition-all duration-300 items-center justify-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <ConfirmDelivery />
      </div>
    </div>
  );
}

function ConfirmDelivery() {
  const orderId = useAtomValue(deliveryOrderState);
  const setModal = useSetAtom(deliveryOrderModalState);
  const { data: detail } = useGetDetailOrder(orderId);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const cancelMutation = useMutation({
    mutationKey: ["cancel-order"],
    mutationFn: updateOrderService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.message === "Ok") {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        showToast("Đã xác nhận giao hàng", "success");
        setModal(false);
        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });
  const handleCancelOrder = async () => {
    try {
      if (orderId) {
        await cancelMutation.mutateAsync({
          orderID: orderId,
          orderStatus: "exported",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleModalOff = () => {
    setModal(false);
  };
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="flex justify-center mb-[15px] ">
        <DynamicLottie
          animationData={deliveryAnimation}
          autoPlay={true}
          loop={false}
          className="w-[150px] h-[150px]"
        />
      </div>
      <p className="font-bold text-[24px] mb-[30px]">
        Xác nhận giao đơn #{orderId}!
      </p>
      <div className="flex items-center border border-gray-400 border-opacity-40 gap-x-[20px] px-[20px] py-[10px] rounded-lg mb-[10px]">
        <BsFillInfoCircleFill className="text-[30px] text-normal" />
        <p className="text-normal text-sm">
          Hành động này không thể được hoàn tác, vui lòng kiểm tra hàng hoá
          trước khi giao.
        </p>
      </div>
      {detail?.transaction.transactionStatus === "pending" && (
        <div className="flex items-center border border-warning border-opacity-40 gap-x-[20px] px-[20px] py-[10px] rounded-lg">
          <GrMoney className="text-[30px] text-warning" />
          <p className="text-sm text-warning">
            Hệ thống ghi nhận tình trạng thanh toán là{" "}
            <span className="font-semibold">CHƯA THANH TOÁN</span>. Vui lòng
            kiểm tra lại!
          </p>
        </div>
      )}

      <div className="flex self-end gap-x-[20px] mt-[20px]">
        <Button variant="flat" size="md" onPress={handleToggleModalOff}>
          <p className="font-semibold">Thoát</p>
        </Button>
        <Button
          variant="flat"
          isLoading={isLoading}
          isDisabled={
            isLoading || detail?.transaction.transactionStatus === "pending"
          }
          color="secondary"
          size="md"
          onPress={handleCancelOrder}
        >
          <p className="font-semibold">Xác nhận giao!</p>
        </Button>
      </div>
    </div>
  );
}
