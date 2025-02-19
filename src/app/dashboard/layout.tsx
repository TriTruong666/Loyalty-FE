"use client";
import { Toaster } from "react-hot-toast";
import { Suspense, useEffect, useState } from "react";
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
import { useAtom, useSetAtom } from "jotai";
import {
  cartDropdownState,
  notificationDropdownState,
  profileSettingDropdownState,
} from "../store/dropdownAtoms";
import { useRouter } from "next/navigation";
import TokenTimeout from "../components/TokenTimeout";
import { tokenTimeoutState } from "../store/modalAtoms";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setNotiDropdown = useSetAtom(notificationDropdownState);
  const setCartDropdown = useSetAtom(cartDropdownState);
  const setProfileDropdown = useSetAtom(profileSettingDropdownState);
  const [tokenTimeoutModal, setTokenTimeoutModal] = useAtom(tokenTimeoutState);
  const handleToggleOffDropdown = () => {
    setProfileDropdown(false);
    setNotiDropdown(false);
    setCartDropdown(false);
  };
  const router = useRouter();
  useEffect(() => {
    const userInfo = localStorage.getItem("account");
    const token = localStorage.getItem("token");
    if (!userInfo || !token) {
      setTokenTimeoutModal(true);
    } else {
      setTokenTimeoutModal(false);
    }
  }, [router]);
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      {tokenTimeoutModal && <TokenTimeout />}
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
