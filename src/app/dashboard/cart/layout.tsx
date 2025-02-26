"use client";
import { Suspense } from "react";
import CartLoadingLayout from "./loading";

export default function CartLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Suspense fallback={<CartLoadingLayout />}>{children}</Suspense>;
}
