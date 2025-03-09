"use client";
import { useGetDetailNotification } from "@/app/hooks/hook";
import { formatDate, formatTime } from "@/app/utils/format";
import { useParams } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
export default function DetailNotificationPage() {
  const params = useParams();
  const id = params.id;
  const { data: detail, isLoading } = useGetDetailNotification(id as string);

  const safeHTML = DOMPurify.sanitize(detail?.content || "");
  return (
    <div className="flex flex-col px-[40px] py-[40px] items-center gap-y-[10px]">
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
    </div>
  );
}
