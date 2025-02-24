import { FC } from "react";

interface SkeletonProps {
  className?: string;
}

export const ItemSkeleton: FC<SkeletonProps> = ({ className }) => {
  return (
    <div className="flex flex-col gap-y-[10px]">
      <div
        className={`w-[259px] h-[259px] rounded-[20px] bg-[#262626] animate-pulse ${className}`}
      ></div>
      <div className="w-[60px] h-[10px] bg-[#262626] animate-pulse"></div>
      <div className="w-full h-[10px] bg-[#262626] animate-pulse"></div>
      <div className="w-full h-[10px] bg-[#262626] animate-pulse"></div>
      <div className="w-[120px] h-[20px] bg-[#262626] animate-pulse mt-[5px]"></div>
    </div>
  );
};
