"use client";

import { FaPencilAlt } from "react-icons/fa";
import NormalInput from "./NormalInput";
import TiptapEditor from "./TiptapEditor";
import { Button } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { createNotificationState } from "../store/modalAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createNotificationService } from "../service/notificationService";
import { showToast } from "../utils/toast";

export default function CreateNotificationModal() {
  const isToggleModal = useAtomValue(createNotificationState);

  if (!isToggleModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[700px] bg-black flex flex-col transition-all duration-300 items-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <NotificationForm />
      </div>
    </div>
  );
}

function NotificationForm() {
  const setModal = useSetAtom(createNotificationState);
  const [submitData, setSubmitData] = useState({
    title: "",
    content: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const queryClient = useQueryClient();
  const createNotiMutation = useMutation({
    mutationKey: ["create-noti"],
    mutationFn: createNotificationService,
    onMutate() {
      setIsSubmit(true);
    },
    onSuccess(data) {
      if (data.message === "Notification created successfully") {
        showToast("Tạo thông báo thành công", "success");
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        setSubmitData({
          content: "",
          title: "",
        });
        setIsSubmit(false);
        setModal(false);
      }
      setIsSubmit(false);
    },
  });
  const handleSubmit = async () => {
    if (submitData.title === "" || submitData.content === "") {
      showToast("Vui lòng nhập đầy đủ tiêu đề và nội dung thông báo", "error");
      return;
    }
    try {
      await createNotiMutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleModalOff = () => {
    setModal(false);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <p className="text-[28px] font-bold font-inter">Tạo thông báo</p>
      <div className="flex flex-col gap-2 w-full">
        <NormalInput
          onChange={(e) =>
            setSubmitData({ ...submitData, title: e.target.value })
          }
          label="Tiêu đề thông báo"
          placeholder="Nhập tiêu đề thông báo"
          icon={<FaPencilAlt size={20} />}
        />
        <div className="flex flex-col w-full font-inter">
          <label
            htmlFor="description"
            className="font-semibold text-sm 2xl:text-[12px] mb-2"
          >
            Nội dung thông báo
          </label>
          <TiptapEditor
            onChange={(value) =>
              setSubmitData({ ...submitData, content: value })
            }
            content="<p>Viết nội dung thông báo tại đây...</p>"
            attributes={{
              class:
                "p-4 h-[300px] min-h-[300px] max-h-[400px] overflow-auto bg-gray-700 bg-opacity-20 text-normal text-sm border border-gray-600 border-opacity-10 rounded-lg focus:outline-none",
            }}
          />
        </div>
      </div>
      <div className="flex items-center w-full gap-x-[30px] mt-[20px]">
        <Button
          className="w-full"
          variant="flat"
          color="default"
          size="lg"
          onPress={handleToggleModalOff}
        >
          <p className="font-bold">Quay lại</p>
        </Button>
        <Button
          className="w-full"
          variant="flat"
          color="secondary"
          size="lg"
          isDisabled={isSubmit}
          isLoading={isSubmit}
          onPress={handleSubmit}
        >
          <p className="text-secondary font-bold">Tạo thông báo</p>
        </Button>
      </div>
    </div>
  );
}
