"use client";

import Lottie from "lottie-react";
import loadingAnimation1 from "@/app/static/loading/loading2.json";
import loadingAnimation2 from "@/app/static/loading/loading3.json";

export const DashboardLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] bg-black">
      <Lottie
        animationData={loadingAnimation1}
        loop={true}
        className="w-[150px] h-[150px]"
      />
    </div>
  );
};

export const LoadingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[550px] bg-black">
      <Lottie
        animationData={loadingAnimation2}
        loop={true}
        className="w-[150px] h-[150px]"
      />
    </div>
  );
};
