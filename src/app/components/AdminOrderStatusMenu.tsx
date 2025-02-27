"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useGetAllOrders } from "../hooks/hook";
export function AdminOrderStatusMenu() {
  const pathname = usePathname();
  const { data: allOrders } = useGetAllOrders();
  const pendingOrders = allOrders?.filter(
    (order) => order.orderStatus === "pending"
  );
  const confirmedOrders = allOrders?.filter(
    (order) => order.orderStatus === "confirmed"
  );
  // const pendingOrders = allOrders?.filter(
  //   (order) => order.orderStatus === "pending"
  // );
  const status = [
    {
      name: "Chờ Xác Nhận",
      path: "/dashboard/admin-orders",
      count: pendingOrders?.length,
    },
    {
      name: "Đã Xác Nhận",
      path: "/dashboard/admin-orders/confirm",
      count: confirmedOrders?.length,
    },
    {
      name: "Đang Giao",
      path: "/dashboard/admin-orders/delivering",
      count: 60,
    },
    {
      name: "Hoàn Thành",
      path: "/dashboard/admin-orders/complete",
      count: 5,
    },
    { name: "Đơn Hủy", path: "/dashboard/admin-orders/cancelled", count: 10 },
  ];

  return (
    <div className="flex items-center font-open pb-[2px] border-b border-gray-400-40 mt-[30px]">
      {status.map((status) => {
        const isActive =
          status.path === "/dashboard/admin-orders"
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
            <span
              className={`text-xs text-[9px] px-[6px] py-[1px] bg-normal rounded-full text-background font-semibold ${
                isActive && "!bg-primary !text-background"
              }`}
            >
              {status.count}
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
