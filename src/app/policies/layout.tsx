"use client";

import Image from "next/image";

export default function PoliciesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col relative overflow-hidden w-screen h-screen">
      {/* header */}
      <div className="flex items-center h-fit py-[15px] px-[24px]">
        <div className="flex items-center">
          <Image
            src="/logo-dark2.png"
            alt="Logo"
            width={200}
            height={60}
            className="w-fit h-[60px] object-cover xl:h-[60px]"
          />
          <div className="ml-[24px] text-[24px] font-bold text-white"></div>
        </div>
      </div>
      {/* main */}
      <div className="flex justify-between">
        {/* main content */}
        <div className="">{children}</div>
        {/* category */}
      </div>
    </div>
  );
}
