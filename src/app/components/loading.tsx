"use client";

import loadingAnimation1 from "@/app/static/loading/loading2.json";

import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });

export const LoadingDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] bg-black">
      <DynamicLottie
        animationData={loadingAnimation1}
        loop={true}
        className="w-[200px] h-[200px]"
      />
    </div>
  );
};

export const LoadingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[550px] bg-black">
      <DynamicLottie
        animationData={loadingAnimation1}
        loop={true}
        className="w-[150px] h-[150px]"
      />
    </div>
  );
};
