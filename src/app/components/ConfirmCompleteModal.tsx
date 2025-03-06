import dynamic from "next/dynamic";
import confirmComplete from "@/app/static/loading/confirm-success.json";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { confirmCompleteOrderState } from "../store/orderAtomts";
import {
  confirmCompleteModalState,
  orderDetailModalState,
} from "../store/modalAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderService } from "../service/orderService";
import { useState } from "react";
import { showToast } from "../utils/toast";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function ConfirmCompleteModal() {
  const isToggleModal = useAtomValue(confirmCompleteModalState);
  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[600px] bg-black flex flex-col transition-all duration-300 items-center justify-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <ConfirmComplete />
      </div>
    </div>
  );
}

function ConfirmComplete() {
  const setDetailModal = useSetAtom(orderDetailModalState);
  const orderId = useAtomValue(confirmCompleteOrderState);
  const setModal = useSetAtom(confirmCompleteModalState);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const confirmCompleteMutation = useMutation({
    mutationKey: ["confirm-complete-order"],
    mutationFn: updateOrderService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.message === "Ok") {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        showToast("Xác nhận đã giao thành công", "success");
        setModal(false);
        setDetailModal(false);

        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });
  const handleConfirmComplete = async () => {
    try {
      if (orderId) {
        await confirmCompleteMutation.mutateAsync({
          orderID: orderId,
          orderStatus: "complete",
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center mb-[15px]">
        <DynamicLottie
          animationData={confirmComplete}
          loop={false}
          autoPlay={true}
          className="w-[80px] h-[80px]"
        />
      </div>
      <p className="font-bold text-[24px] mb-[30px] text-center">
        Xác nhận đã giao thành công đơn #{orderId}!
      </p>
      <div className="flex items-center border border-gray-400 border-opacity-40 gap-x-[20px] px-[20px] py-[10px] rounded-lg">
        <BsFillInfoCircleFill className="text-[30px] text-normal" />
        <p className="text-normal text-sm">
          Hành động này không thể được hoàn tác, vui lòng xác nhận với khách
          hàng và bên vận chuyển để xác nhận đơn hàng đã được giao thàng công.
        </p>
      </div>
      <div className="flex self-end gap-x-[20px] mt-[20px]">
        <Button variant="flat" size="md" onPress={handleToggleModalOff}>
          <p className="font-semibold">Thoát</p>
        </Button>
        <Button
          variant="flat"
          isLoading={isLoading}
          isDisabled={isLoading}
          color="success"
          size="md"
          onPress={handleConfirmComplete}
        >
          <p className="font-semibold">Xác nhận thành công!</p>
        </Button>
      </div>
    </div>
  );
}
