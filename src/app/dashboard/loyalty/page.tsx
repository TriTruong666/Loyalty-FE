"use client";

import AuthComponent from "@/app/components/AuthComponent";
import { LoadingTable } from "@/app/components/loading";
import {
  useGetAnonymousRankingService,
  useGetLoyaltyInfo,
} from "@/app/hooks/hook";
import { Loyalty as LoyaltyProps } from "@/app/interfaces/Loyalty";
import { userInfoState } from "@/app/store/accountAtoms";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { PiRanking } from "react-icons/pi";

export default function LoyaltyPage() {
  return (
    <AuthComponent allowedRoles={["personal", "business", "sales"]}>
      <MemberLoyaltySection />
    </AuthComponent>
  );
}

function MemberLoyaltySection() {
  const info = useAtomValue(userInfoState);
  const [isHighest, setIsHighest] = useState(false);
  const { data: ranking } = useGetAnonymousRankingService(info?.type as string);
  const { data: loyalty = [], isLoading } = useGetLoyaltyInfo(
    info?.type as string
  );

  // Find the highest rank the user qualifies for
  const currentRank = loyalty.reduce((highest, rank) => {
    return (info?.currentPoint as number) >= rank?.pointRange ? rank : highest;
  }, loyalty[0]);

  const minRank = loyalty[0]; // Hạng thấp nhất (Member)
  const maxRank = loyalty[loyalty.length - 1]; // Hạng cao nhất (Diamond)

  // Tính % progress từ Member đến Diamond
  const progressPercentage = Math.min(
    100,
    ((Number(info?.currentPoint) - minRank?.pointRange) /
      (maxRank?.pointRange - minRank?.pointRange)) *
      100
  );

  const pointNeed = maxRank?.pointRange - Number(info?.currentPoint);
  const userRankIndex = ranking?.findIndex(
    (user) => user.userID === info?.userId
  );
  const isInTop5 = userRankIndex !== -1;
  const isTop3 = (userRankIndex ?? -1) >= 0 && (userRankIndex ?? -1) < 3;
  useEffect(() => {
    if (
      loyalty.length > 0 &&
      (info?.currentPoint as number) > maxRank?.pointRange
    ) {
      setIsHighest(true);
    } else {
      setIsHighest(false);
    }
  }, [info?.currentPoint, maxRank?.pointRange, loyalty]);

  if (isLoading) {
    return (
      <>
        <LoadingTable />
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col font-open py-[20px]">
        <div className="flex items-center justify-between px-[40px]">
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[28px] font-light select-none">Hạng Loyalty</p>
            <p className="text-sm text-normal">
              Xem điểm số và xếp hạng của bạn trong hệ thống.
            </p>
          </div>
        </div>
        <div className="flex flex-col mx-[40px] mt-[40px]">
          <div className="flex flex-col items-center gap-y-[10px] py-[20px] border-x border-t border-neutral-700 border-opacity-40">
            <p className="font-bold text-[22px]">
              Điểm Loyalty hiện tại của bạn
            </p>
            <p className="text-[24px] font-bold text-primary">
              {info?.currentPoint} điểm
            </p>
          </div>
          <div className="grid grid-cols-5">
            {loyalty?.map((item) => (
              <LoyaltyRankItem
                key={item.rankId}
                {...item}
                isCurrentRank={item.rankId === currentRank?.rankId}
                isPassed={(info?.currentPoint as number) >= item?.pointRange}
              />
            ))}
          </div>
          {/* Progress bar */}
          <div className="flex flex-col px-[30px] py-[20px] border-x border-b border-neutral-700 border-opacity-40">
            <div className="flex justify-between">
              <p className="text-normal font-light text-sm">
                {minRank?.pointRange} điểm
              </p>
              <p className="text-primary font-light text-sm">
                {maxRank?.pointRange} điểm
              </p>
            </div>
            <div className="relative w-full h-[15px] border border-gray-400-40 bg-neutral-700 bg-opacity-20 rounded-lg mt-[10px]">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 rounded-lg transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            {isHighest && (
              <div className="flex flex-col mt-[12px]">
                <p className="font-bold text-[20px] bg-gradient-to-l from-[#38bdf8] via-[#fb7185] to-[#84cc16] text-transparent bg-clip-text">
                  WOW! Bạn đã hoàn thành mức cao nhất của Loyalty{" "}
                  <span>❤️</span>
                </p>
              </div>
            )}
            {!isHighest && (
              <div className="flex flex-col mt-[12px]">
                <p className="font-bold text-[20px] ">
                  Bạn cần{" "}
                  <span className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#6366f1] via-[#a5b4fc] to-[#e0e7ff] text-transparent bg-clip-text">
                    {pointNeed} điểm
                  </span>{" "}
                  nữa để đạt mức cao nhất!
                </p>
              </div>
            )}
            {isInTop5 && (
              <div className="flex flex-col mt-[40px]">
                <p className="flex items-center text-[20px] font-light gap-x-[10px]">
                  <PiRanking className="text-[26px]" />
                  <span>Top 5 Bảng Xếp Hạng</span>
                </p>
                <div className="flex flex-col gap-y-[20px] mt-[20px]">
                  {ranking?.map((user, index) => (
                    <div
                      key={user.userID}
                      className="flex items-center gap-x-[7px]"
                    >
                      <p className="text-[24px] w-[40px]">
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : "🔥"}
                      </p>
                      <p
                        className={`w-full text-[${
                          index === 0 ? "20px" : "18px"
                        }] font-bold ${
                          index === 0
                            ? "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-800 via-purple-300 to-purple-300 bg-clip-text text-transparent"
                            : index === 1
                            ? "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-sky-800 via-slate-100 to-cyan-950 bg-clip-text text-transparent"
                            : index === 2
                            ? "bg-[conic-gradient(var(--tw-gradient-stops))] from-violet-200 via-rose-800 to-green-50 bg-clip-text text-transparent"
                            : "text-amber-700"
                        }`}
                      >
                        {user.userID === info?.userId || !isTop3
                          ? `Bạn (${info?.rank.rankName})`
                          : `???????? (${user.rank.rankName})`}{" "}
                        : {user.currentPoint} điểm
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function LoyaltyRankItem(
  props: LoyaltyProps & { isCurrentRank?: boolean; isPassed?: boolean }
) {
  const rankColors: Record<string, string> = {
    Member: "text-gray-400", // Default gray for Member (0 points)
    Silver: "text-gray-300",
    Gold: "text-yellow-400",
    Platinum: "text-blue-400",
    Diamond: "text-purple-400",
  };
  return (
    <div
      className={`relative flex flex-col py-[30px] border-t border-b border-l border-neutral-700 border-opacity-40 px-[15px] transition-all duration-300 first:border-l last:border-r
      ${
        props.isPassed && !props.isCurrentRank
          ? "bg-neutral-800 bg-opacity-50 grayscale"
          : ""
      } 
      ${
        props.isCurrentRank ? "!border-[3px] border-primary bg-transparent" : ""
      }

    `}
    >
      <p
        className={`text-center text-[22px] font-bold ${
          rankColors[props.rankName] || "text-white"
        }`}
      >
        {props.rankName}
      </p>
      {props.isPassed && (
        <div className="absolute right-[15px] top-[15px]">
          <IoCheckmarkCircleOutline className="text-success-400 text-[22px]" />
        </div>
      )}

      <div className="flex flex-col mt-[40px] gap-y-[15px]">
        <div className="flex items-center gap-x-[7px]">
          <IoIosInformationCircleOutline className="text-[18px] text-normal" />
          <p className="text-sm text-normal">
            Tối thiểu:{" "}
            <span className="text-primary font-bold">{props.pointRange}</span>{" "}
            điểm
          </p>
        </div>
        <div className="flex items-center gap-x-[7px]">
          <IoIosInformationCircleOutline className="text-[18px] text-normal" />
          <p className="text-sm text-normal">{props.note}</p>
        </div>
      </div>
      <div className="flex">
        <></>
      </div>
    </div>
  );
}
