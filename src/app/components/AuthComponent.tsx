"use client";

import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setLoading(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (!loading && !allowedRoles.includes(userInfo?.type as string)) {
      router.replace("/unauthorized");
    }
  }, [userInfo, allowedRoles, router, loading]);

  if (loading || !userInfo || !allowedRoles.includes(userInfo.type)) {
    return null;
  }

  return <>{children}</>;
}
