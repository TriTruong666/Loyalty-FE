import dynamic from "next/dynamic";
import confirmOrder from "@/app/static/loading/confirm-order.json";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  confirmOrderModalState,
  orderDetailModalState,
} from "../store/modalAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderService } from "../service/orderService";
import { useState } from "react";
import { showToast } from "../utils/toast";
import { confirmOrderState } from "../store/orderAtomts";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function ConfirmOrderModal() {
  const isToggleModal = useAtomValue(confirmOrderModalState);
  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[600px] bg-black flex flex-col transition-all duration-300 items-center justify-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <ConfirmOrder />
      </div>
    </div>
  );
}

function ConfirmOrder() {
  const setDetailModal = useSetAtom(orderDetailModalState);
  const orderId = useAtomValue(confirmOrderState);
  const setModal = useSetAtom(confirmOrderModalState);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const updateOrderMutation = useMutation({
    mutationKey: ["update-order"],
    mutationFn: updateOrderService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.message === "Ok") {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        setIsLoading(false);
        showToast("Xác nhận đơn thành công", "success");
        setDetailModal(false);
        setModal(false);
      }
    },
  });
  const handleConfirmOrder = async () => {
    try {
      if (orderId) {
        await updateOrderMutation.mutateAsync({
          orderStatus: "confirmed",
          orderID: orderId,
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
          animationData={confirmOrder}
          loop={false}
          autoPlay={true}
          className="w-[120px] h-[120px]"
        />
      </div>
      <p className="font-bold text-[24px] mb-[30px]">
        Xác nhận đơn hàng #{orderId}!
      </p>
      <div className="flex items-center border border-gray-400 border-opacity-40 gap-x-[20px] px-[20px] py-[10px] rounded-lg">
        <BsFillInfoCircleFill className="text-[30px] text-normal" />
        <p className="text-normal text-sm">
          Hành động này không thể được hoàn tác, hãy đảm bảo rằng bạn đã liên hệ
          với khách hàng để xác nhận đơn hàng này.
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
          color="secondary"
          size="md"
          onPress={handleConfirmOrder}
        >
          <p className="font-semibold">Xác nhận đơn hàng</p>
        </Button>
      </div>
    </div>
  );
}
