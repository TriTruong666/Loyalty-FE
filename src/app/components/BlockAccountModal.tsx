import dynamic from "next/dynamic";
import blockAnimation from "@/app/static/loading/blockAccount.json";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { blockAccountModalState } from "../store/modalAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { showToast } from "../utils/toast";
import { blockAccountState } from "../store/accountAtoms";
import { blockAccountService } from "../service/accountService";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function BlockAccountModal() {
  const isToggleModal = useAtomValue(blockAccountModalState);
  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[600px] bg-black flex flex-col transition-all duration-300 items-center justify-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <ConfirmBlock />
      </div>
    </div>
  );
}

function ConfirmBlock() {
  const userId = useAtomValue(blockAccountState);
  const setModal = useSetAtom(blockAccountModalState);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const blockMutation = useMutation({
    mutationKey: ["block-user"],
    mutationFn: blockAccountService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.message === "User has been banned successfully.") {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        showToast("Khoá tài khoản thành công!", "success");
        setModal(false);
        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });

  const handleBlockAccount = async () => {
    try {
      await blockMutation.mutateAsync(userId);
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
          animationData={blockAnimation}
          loop={false}
          autoPlay={true}
          className="w-[120px] h-[120px]"
        />
      </div>
      <p className="font-bold text-[24px] mb-[30px]">
        Xác nhận chặn người dùng #{userId}!
      </p>
      <div className="flex items-center border border-danger-400 border-opacity-40 gap-x-[20px] px-[20px] py-[10px] rounded-lg">
        <BsFillInfoCircleFill className="text-[30px] text-danger-400" />
        <p className="text-danger-400 text-sm">
          Bạn có thể gỡ chặn, vui lòng xem xét kỹ các vi phạm của tài khoản
          trước khi chặn.
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
          onPress={handleBlockAccount}
        >
          <p className="font-semibold">Chặn tài khoản!</p>
        </Button>
      </div>
    </div>
  );
}
