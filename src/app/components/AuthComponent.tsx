"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userInfoState } from "../store/accountAtoms";

interface WithAuthProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function AuthComponent({
  allowedRoles,
  children,
}: WithAuthProps) {
  const router = useRouter();
  const userInfo = useAtomValue(userInfoState);

  useEffect(() => {
    if (!userInfo || !allowedRoles.includes(userInfo.type)) {
      router.replace("/unauthorized");
    }
  }, [userInfo, allowedRoles, router]);

  if (!userInfo || !allowedRoles.includes(userInfo.type)) {
    return null;
  }

  return <>{children}</>;
}
