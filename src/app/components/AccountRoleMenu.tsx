"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useGetAllUser } from "../hooks/hook";
export function AccountRoleMenu() {
  const pathname = usePathname();
  const { data: allAccounts = [] } = useGetAllUser();
  const filteredAdmin = allAccounts
    ?.filter((account) => account.type === "admin")
    .filter((account) => account.status === "active");
  const filteredSales = allAccounts
    ?.filter((account) => account.type === "sales")
    .filter((account) => account.status === "active");
  const filteredStaff = allAccounts
    ?.filter((account) => account.type === "staff")
    .filter((account) => account.status === "active");
  const filteredInactive = allAccounts?.filter(
    (account) => account.status === "inactive"
  );
  const filteredBusiness = allAccounts
    ?.filter(
      (account) => account.type === "business" || account.type === "personal"
    )
    .filter((account) => account.status === "active");
  const roles = [
    {
      name: "Admin",
      path: "/dashboard/accounts",
      count: filteredAdmin?.length,
    },
    {
      name: "Doanh nghiệp",
      path: "/dashboard/accounts/company",
      count: filteredBusiness?.length,
    },
    {
      name: "Sales",
      path: "/dashboard/accounts/sales",
      count: filteredSales?.length,
    },
    {
      name: "Nhân viên",
      path: "/dashboard/accounts/staff",
      count: filteredStaff?.length,
    },
    {
      name: "Bị khoá",
      path: "/dashboard/accounts/inactive",
      count: filteredInactive?.length,
    },
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
