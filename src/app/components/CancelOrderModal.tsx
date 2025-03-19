import dynamic from "next/dynamic";
import cancelAnimation from "@/app/static/loading/cancel.json";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { cancelOrderState } from "../store/orderAtomts";
import {
  cancelOrderModalState,
  orderDetailModalState,
} from "../store/modalAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderService } from "../service/orderService";
import { useState } from "react";
import { showToast } from "../utils/toast";
import { useGetUserInfo } from "../hooks/hook";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function CancelOrderModal() {
  const isToggleModal = useAtomValue(cancelOrderModalState);
  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[600px] bg-black flex flex-col transition-all duration-300 items-center justify-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <ConfirmCancel />
      </div>
    </div>
  );
}

function ConfirmCancel() {
  const { data: info } = useGetUserInfo();

  const setDetailModal = useSetAtom(orderDetailModalState);
  const orderId = useAtomValue(cancelOrderState);
  const setModal = useSetAtom(cancelOrderModalState);
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
        showToast("Huỷ đơn hàng thành công", "success");
        setModal(false);
        setDetailModal(false);

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
          orderStatus: "cancelled",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleModalOff = () => {
    setModal(false);
  };
  const handleWarningContent = (role: string) => {
    switch (role) {
      case "admin":
        return `Hành động này không thể được hoàn tác, 
      vui lòng liên hệ với phía khách hàng để xác nhận huỷ đơn.`;
      case "ceo":
        return `Hành động này không thể được hoàn tác, 
      vui lòng liên hệ với phía khách hàng để xác nhận huỷ đơn.`;
      case "sales":
        return ` Hành động này không thể được hoàn tác, phía khách hàng sẽ được liên
            hệ để thông báo về việc huỷ đơn của bạn.`;
      case "business":
        return `Hành động này không thể được hoàn tác, vui lòng suy nghĩ kỹ trước khi huỷ đơn, phía hệ thống sẽ gọi cho bạn sớm nhất để xác nhận.`;
      case "personal":
        return `Hành động này không thể được hoàn tác, vui lòng suy nghĩ kỹ trước khi huỷ đơn, phía hệ thống sẽ gọi cho bạn sớm nhất để xác nhận.`;
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center mb-[15px]">
        <DynamicLottie
          animationData={cancelAnimation}
          loop={false}
          autoPlay={true}
          className="w-[80px] h-[80px]"
        />
      </div>
      <p className="font-bold text-[24px] mb-[30px]">
        Bạn sẽ huỷ đơn #{orderId}!
      </p>
      <div className="flex items-center border border-gray-400 border-opacity-40 gap-x-[20px] px-[20px] py-[10px] rounded-lg">
        <BsFillInfoCircleFill className="text-[30px] text-normal" />
        <p className="text-normal text-sm">
          {handleWarningContent(info?.type as string)}
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
          color="danger"
          size="md"
          onPress={handleCancelOrder}
        >
          <p className="font-semibold">Xác nhận huỷ!</p>
        </Button>
      </div>
    </div>
  );
}
