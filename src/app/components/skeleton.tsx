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

export const ProductDetailSkeleton: FC<SkeletonProps> = ({ className }) => {
  return (
    <div className="flex flex-col p-[40px]">
      <div className="flex justify-between">
        <div className="w-[45%]">
          <div className="w-[533px] h-[533px] rounded-[20px] bg-[#262626] animate-pulse"></div>
        </div>
        <div className="w-[50%] flex flex-col">
          <div className="w-[200px] h-[25px] bg-[#262626] animate-pulse mb-[15px]"></div>
          <div className="w-full h-[100px] bg-[#262626] animate-pulse mb-[30px]"></div>
          <div className="flex justify-between items-center mb-[25px]">
            <div className="w-[200px] h-[50px] bg-[#262626] animate-pulse mb-[15px]"></div>
            <div className="w-[150px] h-[15px] bg-[#262626] animate-pulse mb-[15px]"></div>
          </div>
          <div className="w-full h-[50px] bg-[#262626] animate-pulse rounded-[20px]"></div>
        </div>
      </div>
      <div className="flex flex-col mt-[50px] gap-y-[25px]">
        {[...Array(10)].map((item, i) => (
          <div
            key={i + 1}
            className="w-full h-[15px] bg-[#262626] animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};
