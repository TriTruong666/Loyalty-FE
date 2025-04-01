"use client";
import { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardLoadingLayout from "./loading";
import AddProductModal from "../components/AddProductModal";
import AddAccountModal from "../components/AddAccountModal";
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
import UpdateProductModal from "../components/UpdateProductModal";
import OrderDetailModal from "../components/OrderDetailModal";
import { detailOrderState } from "../store/orderAtomts";
import CancelOrderModal from "../components/CancelOrderModal";
import DeliveryOrderConfirmModal from "../components/DeliveryOrderConfirmModal";
import CheckTransactionModal from "../components/CheckTransactionModal";
import AddSalesAccountModal from "../components/AddSalesAccountModal";
import ConfirmCompleteModal from "../components/ConfirmCompleteModal";
import BlockAccountModal from "../components/BlockAccountModal";
import UnlockAccountModal from "../components/UnlockAccountModal";
import ConfirmOrderModal from "../components/ConfirmOrderModal";
import AttachmentModal from "../components/AttachmentModal";
import CreateQRModal from "../components/CreateQRModal";
import DashboardSearchModal from "../components/DashboardSearchModal";
import ProductDetailModal from "../components/ProductDetailModal";
import UpdateImageProduct from "../components/UpdateImageProduct";

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
  const { data: info } = useGetUserInfo();
  useEffect(() => {
    setInfo(info);
  }, [info]);
  // useEffect(() => {
  //   // Initialize EventSource
  //   const eventSource = new EventSource(
  //     `${process.env.NEXT_PUBLIC_API_URL}/acb/subscription/loyaltypicare`
  //   );

  //   eventSource.onopen = () => {
  //     console.log("✅ SSE Connection Opened");
  //   };

  //   eventSource.onmessage = (event) => {
  //     console.log("📩 New Message:", event.data);
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("❌ SSE Error:", error);
  //     eventSource.close();
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <UpdateImageProduct />
      <ProductDetailModal />
      <DashboardSearchModal />
      <CreateQRModal />
      <UnlockAccountModal />
      <BlockAccountModal />
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
      <AttachmentModal />
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
