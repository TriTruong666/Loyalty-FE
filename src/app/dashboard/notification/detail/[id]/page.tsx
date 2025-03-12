"use client";
import { useGetDetailNotification } from "@/app/hooks/hook";
import { formatDate, formatTime } from "@/app/utils/format";
import { useParams, useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotificationService } from "@/app/service/notificationService";
import { Button } from "@heroui/react";
import { useState } from "react";
import { showToast } from "@/app/utils/toast";
import { useAtomValue } from "jotai";
import { userInfoState } from "@/app/store/accountAtoms";
export default function DetailNotificationPage() {
  const info = useAtomValue(userInfoState);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { data: detail, isLoading } = useGetDetailNotification(id as string);
  const [isSubmit, setIsSubmit] = useState(false);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["delete-notification"],
    mutationFn: deleteNotificationService,
    onMutate() {
      setIsSubmit(true);
    },
    onSuccess(data) {
      if (data.message === "Notification deleted successfully") {
        router.push(`/dashboard/notification`);
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        });
        showToast("Xoá thông báo thành công", "success");
        setIsSubmit(false);
      }
    },
  });

  const handleDeleteNotification = async () => {
    try {
      await deleteMutation.mutateAsync(id as string);
    } catch (error) {
      console.error(error);
    }
  };

  const safeHTML = DOMPurify.sanitize(detail?.content || "");
  return (
    <div className="flex flex-col px-[40px] py-[40px] items-center gap-y-[10px] relative min-h-[calc(100vh-80px)]">
      <p className="text-center text-[30px] font-semibold max-w-[90%]">
        {detail?.title}
      </p>
      <p className="text-center text-normal text-[12px]">
        Thông báo vào {formatTime(detail?.createdDate as string)} ngày{" "}
        {formatDate(detail?.createdDate as string)}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: safeHTML }}
        className="mt-[40px] text-sm leading-8"
      ></div>
      {info?.type === "admin" ||
        (info?.type === "ceo" && (
          <div className="w-full sticky bottom-0 left-0 px-[40px] py-[40px] bg-background">
            <Button
              onPress={handleDeleteNotification}
              className="w-full"
              isLoading={isSubmit}
              isDisabled={isSubmit}
              variant="flat"
              color="danger"
            >
              Xoá thông báo
            </Button>
          </div>
        ))}
    </div>
  );
}
