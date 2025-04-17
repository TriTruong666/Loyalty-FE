"use client";

import Image from "next/image";
import Link from "next/link";
import { GrFormPreviousLink } from "react-icons/gr";

export default function PoliciesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cateList: CategoryPolicyLinkItemProps[] = [
    {
      href: "/policies",
      title: "Giới thiệu PicareVN Loyalty",
    },
    {
      href: "/policies/doi-tra",
      title: "Chính sách đổi trả",
    },
    {
      href: "/policies/bao-mat",
      title: "Chính sách bảo mật thông tin",
    },
    {
      href: "/policies/van-chuyen",
      title: "Chính sách vận chuyển",
    },
    {
      href: "/policies/thanh-toan",
      title: "Chính sách thanh toán",
    },
    {
      href: "/policies/mien-tru",
      title: "Miễn trừ trách nhiệm",
    },
  ];
  return (
    <div className="flex flex-col relative w-screen min-h-screen">
      {/* header */}
      <div className="flex items-center h-fit py-[15px] px-[24px] gap-x-[20px]">
        <div className="flex items-center">
          <Image
            src="/logo-dark2.png"
            alt="Logo"
            width={200}
            height={60}
            className="w-fit h-[60px] object-cover xl:h-[60px]"
          />
        </div>
        <Link href="/dashboard" className="flex items-center gap-x-2">
          <GrFormPreviousLink className="text-[20px] text-normal" />
          <p className="text-sm text-normal">Quay lại</p>
        </Link>
      </div>
      {/* main */}
      <div className="flex justify-between py-[30px] mt-[50px]">
        {/* main content */}
        <div className="px-[40px] w-[80%]">{children}</div>
        {/* category */}
        <div className="flex flex-col px-[40px] w-[20%]">
          <p className="font-bold text-sm">Tài liệu Loyalty</p>
          <div className="flex flex-col gap-y-[15px] mt-[20px]">
            {cateList.map((item, i) => (
              <CategoryPolicyLinkItem key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryPolicyLinkItemProps {
  title: string;
  href: string;
}

function CategoryPolicyLinkItem(props: CategoryPolicyLinkItemProps) {
  return (
    <Link
      href={props.href}
      className="text-sm text-normal underline font-light font-open"
    >
      {props.title}
    </Link>
  );
}
