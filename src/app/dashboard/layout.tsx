"use client";
import { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardLoadingLayout from "./loading";
import AddProductModal from "../components/AddProductModal";
import AddAccountModal from "../components/AddAccountModal";
import ConfirmOrderModal from "../components/ConfirmOrderModal";
import CreateNotificationModal from "../components/CreateNotificationModal";
import NotificationDropdown from "../components/NotificationDropdown";
import CartDropdown from "../components/CartDropdown";
import ProfileSettingDropdown from "../components/ProfileSettingDropdown";
import { useAtomValue, useSetAtom } from "jotai";
import {
  cartDropdownState,
  notificationDropdownState,
  profileSettingDropdownState,
} from "../store/dropdownAtoms";
import { useGetUserInfo } from "../hooks/hook";
import { userInfoState } from "../store/accountAtoms";
import { useRouter } from "next/navigation";
import UpdateProductModal from "../components/UpdateProductModal";
import OrderDetailModal from "../components/OrderDetailModal";
import { detailOrderState } from "../store/orderAtomts";
import CancelOrderModal from "../components/CancelOrderModal";
import DeliveryOrderConfirmModal from "../components/DeliveryOrderConfirmModal";
import CheckTransactionModal from "../components/CheckTransactionModal";
import AddSalesAccountModal from "../components/AddSalesAccountModal";
import ConfirmCompleteModal from "../components/ConfirmCompleteModal";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setNotiDropdown = useSetAtom(notificationDropdownState);
  const setInfo = useSetAtom(userInfoState);
  const setCartDropdown = useSetAtom(cartDropdownState);
  const setProfileDropdown = useSetAtom(profileSettingDropdownState);
  const orderId = useAtomValue(detailOrderState);
  const handleToggleOffDropdown = () => {
    setProfileDropdown(false);
    setNotiDropdown(false);
    setCartDropdown(false);
  };
  const router = useRouter();
  const { data: info } = useGetUserInfo();
  useEffect(() => {
    setInfo(info);
    if (info?.code === "UNKNOWN_ERROR") {
      router.replace("/");
    }
  }, [info]);

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <AddSalesAccountModal />
      <CheckTransactionModal />
      <ConfirmCompleteModal />
      <DeliveryOrderConfirmModal />
      <CancelOrderModal />
      {orderId && <OrderDetailModal />}
      <UpdateProductModal />
      <ProfileSettingDropdown />
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
          <div
            className="flex-1 overflow-auto"
            onClick={handleToggleOffDropdown}
          >
            {children}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
