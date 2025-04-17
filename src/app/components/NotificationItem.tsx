import Link from "next/link";
import { Notification as NotificationProps } from "../interfaces/Notification";
import DOMPurify from "isomorphic-dompurify";
import { formatRelativeTime } from "../utils/format";

export default function NotificationItem(props: NotificationProps) {
  const safeHTML = DOMPurify.sanitize(props.content || "");
  return (
    <Link
      href={`/dashboard/notification/detail/${props.id}`}
      className="flex flex-col px-[40px] border-b border-gray-400-40 gap-y-[10px] py-[20px] cursor-pointer duration-200 transition-all hover:bg-gray-400 hover:bg-opacity-10"
    >
      <div className="flex justify-between">
        <p className="font-semibold text-[18px] text-primary line-clamp-2 max-w-[85%]">
          {props.title}
        </p>
        <p className="text-[13px] text-normal font-light">
          {formatRelativeTime(props.createdDate)}
        </p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: safeHTML }}
        className="text-sm text-normal line-clamp-2"
      ></div>
    </Link>
  );
}
