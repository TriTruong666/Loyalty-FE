"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function SettingMenu() {
  const pathname = usePathname();

  const status = [
    { name: "Thông tin", path: "/dashboard/setting" },
    {
      name: "Bảo mật",
      path: "/dashboard/setting/security",
    },
    {
      name: "Địa chỉ",
      path: "/dashboard/setting/location",
    },
    {
      name: "Điểm Loyalty",
      path: "/dashboard/setting/ranking",
    },
    {
      name: "Giao diện",
      path: "/dashboard/setting/theme",
    },
  ];

  return (
    <div className="flex items-center font-open pb-[2px] border-b border-gray-400-40 mt-[30px]">
      {status.map((status) => {
        const isActive =
          status.path === "/dashboard/setting"
            ? pathname === status.path
            : pathname.startsWith(status.path);
        return (
          <Link
            key={status.name}
            href={status.path}
            className="relative flex-1 flex items-center gap-x-2 justify-center px-4 py-2"
          >
            <p
              className={`text-sm ${
                isActive ? "text-primary font-semibold" : "text-normal"
              }`}
            >
              {status.name}
            </p>
            {/* <span
              className={`text-xs text-[9px] px-[6px] py-[1px] bg-normal rounded-full text-background font-semibold ${
                isActive && "!bg-primary !text-background"
              }`}
            >
              {status.count}
            </span> */}
            {isActive && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
