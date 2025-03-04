import dynamic from "next/dynamic";
import transactionAnimation from "@/app/static/loading/check-transaction.json";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  checkTransactionModalState,
  orderDetailModalState,
} from "../store/modalAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransactionService } from "../service/orderService";
import { useState } from "react";
import { showToast } from "../utils/toast";
import { checkTransactionOrderState } from "../store/orderAtomts";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function CheckTransactionModal() {
  const isToggleModal = useAtomValue(checkTransactionModalState);
  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[600px] bg-black flex flex-col transition-all duration-300 items-center justify-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <ConfirmTransaction />
      </div>
    </div>
  );
}

function ConfirmTransaction() {
  const setDetailModal = useSetAtom(orderDetailModalState);
  const transactionId = useAtomValue(checkTransactionOrderState);
  const setModal = useSetAtom(checkTransactionModalState);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const checkTransactionMutation = useMutation({
    mutationKey: ["update-transaction-status"],
    mutationFn: updateTransactionService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.message === "Ok") {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        showToast("Xác nhận thanh toán thành công", "success");
        setModal(false);
        setDetailModal(false);

        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });
  const handleCancelOrder = async () => {
    try {
      if (transactionId) {
        await checkTransactionMutation.mutateAsync({
          id: transactionId,
          transactionStatus: "confirmed",
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
          animationData={transactionAnimation}
          loop={false}
          autoPlay={true}
          className="w-[120px] h-[120px]"
        />
      </div>
      <p className="font-bold text-[24px] mb-[30px]">
        Xác nhận mã thanh toán #{transactionId}!
      </p>
      <div className="flex items-center border border-gray-400 border-opacity-40 gap-x-[20px] px-[20px] py-[10px] rounded-lg">
        <BsFillInfoCircleFill className="text-[30px] text-normal" />
        <p className="text-normal text-sm">
          Hành động này không thể được hoàn tác, đối với hình thức thanh toán là
          công nợ hãy kiểm tra kỹ giao dịch trước khi xác nhận thanh toán.
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
          onPress={handleCancelOrder}
        >
          <p className="font-semibold">Xác nhận thanh toán!</p>
        </Button>
      </div>
    </div>
  );
}
