import Link from "next/link";

export default function NotificationItem() {
  return (
    <Link
      href="/dashboard/admin-notification/detail"
      className="flex flex-col px-[40px] border-b border-gray-400-40 gap-y-[10px] py-[20px] cursor-pointer duration-200 transition-all hover:bg-gray-400 hover:bg-opacity-10"
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-[18px] text-primary">
          Thông báo về việc bảo trì hệ thống.
        </p>
        <p className="text-[13px] text-normal font-light">2 phút trước</p>
      </div>
      <p className="text-sm text-normal line-clamp-2">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of Good and
        Evil) by Cicero, written in 45 BC. This book is a treatise on the theory
        of ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a line in
        section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s
        is reproduced below for those interested. Sections 1.10.32 and 1.10.33
        from &quot;de Finibus Bonorum et Malorum&quot; by Cicero are also
        reproduced in their exact original form, accompanied by English versions
        from the 1914 translation by H. Rackham.
      </p>
    </Link>
  );
}
