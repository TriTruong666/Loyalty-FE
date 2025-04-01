"use client";

import { useEffect, useState } from "react";

export default function ResponsiveWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobileOrTablet(width <= 1024); // Adjust breakpoint as needed (1024px for tablets)
    };

    checkScreenSize(); // Check on initial load
    window.addEventListener("resize", checkScreenSize); // Listen for resizes

    return () => window.removeEventListener("resize", checkScreenSize); // Cleanup event listener
  }, []);

  if (isMobileOrTablet) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-lg font-bold">
        Không hỗ trợ trên thiết bị di động !
      </div>
    );
  }

  return <>{children}</>;
}
