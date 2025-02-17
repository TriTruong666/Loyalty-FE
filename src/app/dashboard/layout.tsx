"use client";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardLoadingLayout from "./loading";
import AddProductModal from "../components/AddProductModal";
import AddAccountModal from "../components/AddAccountModal";
import ConfirmOrderModal from "../components/ConfirmOrderModal";
import CreateNotificationModal from "../components/CreateNotificationModal";
import NotificationDropdown from "../components/NotificationDropdown";
import CartDropdown from "../components/CartDropdown";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <CartDropdown />
      <NotificationDropdown />
      <CreateNotificationModal />
      <ConfirmOrderModal />
      <AddProductModal />
      <AddAccountModal />
      <DashboardSidebar />
      <div className="flex flex-col w-[calc(100vw-270px)] h-screen">
        <DashboardHeader />
        <Suspense fallback={<DashboardLoadingLayout />}>
          <div className="flex-1 overflow-auto">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
