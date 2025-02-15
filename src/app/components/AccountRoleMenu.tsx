"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
export function AccountRoleMenu() {
  const pathname = usePathname();

  const roles = [
    { name: "Admin", path: "/dashboard/accounts", count: 10 },
    { name: "Doanh nghiệp", path: "/dashboard/accounts/company", count: 10 },
    { name: "Sales", path: "/dashboard/accounts/sales", count: 10 },
    { name: "Nhân viên", path: "/dashboard/accounts/staff", count: 1 },
  ];

  return (
    <div className="flex items-center font-open pb-[2px] border-b border-gray-400-40 mt-[30px]">
      {roles.map((role) => {
        const isActive =
          role.path === "/dashboard/accounts"
            ? pathname === role.path
            : pathname.startsWith(role.path);
        return (
          <Link
            key={role.name}
            href={role.path}
            className="relative flex-1 flex items-center gap-x-2 justify-center px-4 py-2"
          >
            <p
              className={`text-sm ${
                isActive ? "text-primary font-semibold" : "text-normal"
              }`}
            >
              {role.name}
            </p>
            <span
              className={`text-xs text-[9px] px-[6px] py-[1px] bg-normal rounded-full text-background font-semibold ${
                isActive && "!bg-primary !text-background"
              }`}
            >
              {role.count}
            </span>
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
