"use client";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardLoadingLayout from "./loading";
import DashboardHeader from "../components/DashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      {/* <AddProductModal />
      <AddAccountModal /> */}
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
