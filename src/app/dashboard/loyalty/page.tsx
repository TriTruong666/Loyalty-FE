"use client";

import { useGetLoyaltyInfo } from "@/app/hooks/hook";
import { Loyalty as LoyaltyProps } from "@/app/interfaces/Loyalty";
import { userInfoState } from "@/app/store/accountAtoms";
import { useAtomValue } from "jotai";

export default function LoyaltyPage() {
  const info = useAtomValue(userInfoState);

  const { data: loyalty } = useGetLoyaltyInfo(info?.type as string);

  return (
    <div className="flex flex-col font-open py-[20px]">
      <div className="flex items-center justify-between px-[40px]">
        <div className="flex flex-col gap-y-[5px]">
          <p className="text-[28px] font-light select-none">Hạng Loyalty</p>
          <p className="text-sm text-normal">
            Xem điểm số và xếp hạng của bạn trong hệ thống.
          </p>
        </div>
      </div>
      <div className="flex flex-col mx-[40px] mt-[40px] border border-neutral-700 border-opacity-40 rounded-xl">
        <div className="flex flex-col items-center gap-y-[10px] py-[20px]">
          <p className="font-bold text-[22px]">Điểm Loyalty hiện tại của bạn</p>
          <p className="text-[24px] font-bold text-primary">3203 điểm</p>
        </div>
        <div className="grid grid-cols-5 border-t border-neutral-700 border-opacity-40">
          {loyalty?.map((item) => (
            <LoyaltyRankItem key={item.rankId} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LoyaltyRankItem(props: LoyaltyProps) {
  return (
    <div className="flex flex-col py-[15px] border-r border-neutral-700 border-opacity-40">
      <p className="text-center">{props.rankName}</p>
    </div>
  );
}
