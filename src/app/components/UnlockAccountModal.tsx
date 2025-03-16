import dynamic from "next/dynamic";
import unlockAnimation from "@/app/static/loading/unlock.json";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { unlockAccountModalState } from "../store/modalAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { showToast } from "../utils/toast";
import { unlockAccountState } from "../store/accountAtoms";
import { unlockAccountService } from "../service/accountService";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function UnlockAccountModal() {
  const isToggleModal = useAtomValue(unlockAccountModalState);
  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[600px] bg-black flex flex-col transition-all duration-300 items-center justify-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <ConfirmUnlock />
      </div>
    </div>
  );
}

function ConfirmUnlock() {
  const userId = useAtomValue(unlockAccountState);
  const setModal = useSetAtom(unlockAccountModalState);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const unlockMutation = useMutation({
    mutationKey: ["unlock-user"],
    mutationFn: unlockAccountService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.message === "User has been reactivated") {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        showToast("Mở lại tài khoản thành công", "success");
        setModal(false);
        setIsLoading(false);
      }

      setIsLoading(false);
    },
  });

  const handleUnlockAccount = async () => {
    try {
      await unlockMutation.mutateAsync(userId);
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
          animationData={unlockAnimation}
          loop={false}
          autoPlay={true}
          className="w-[120px] h-[120px]"
        />
      </div>
      <p className="font-bold text-[24px] mb-[30px]">
        Xác nhận gỡ chặn người dùng #{userId}!
      </p>
      <div className="flex items-center border border-success border-opacity-40 gap-x-[20px] px-[20px] py-[10px] rounded-lg">
        <BsFillInfoCircleFill className="text-[30px] text-success" />
        <p className="text-success text-sm">
          Bạn sẽ gỡ chặn tài khoản này, hãy chắc chắn rằng bạn đã liên hệ với
          phía tài khoản để xác nhận.
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
          onPress={handleUnlockAccount}
        >
          <p className="font-semibold">Gỡ chặn!</p>
        </Button>
      </div>
    </div>
  );
}
