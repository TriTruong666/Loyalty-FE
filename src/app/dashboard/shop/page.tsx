"use client";
import { useGetAllBrand } from "@/app/hooks/hook";
import { userInfoState } from "@/app/store/accountAtoms";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { MdReportGmailerrorred } from "react-icons/md";

export default function ShopPage() {
  const info = useAtomValue(userInfoState);
  if (info?.inDebt === true) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center font-open gap-y-[10px]">
        <MdReportGmailerrorred className="text-danger-300 text-[60px]" />
        <p className="text-danger-300">
          Hiện tại bạn đang có đơn công nợ và chưa được thanh toán, bạn sẽ không
          thể mua ngay lúc này !
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col font-open py-[20px]">
      <div className="px-[40px] flex flex-col gap-y-1">
        <p className="text-[28px] font-light select-none">Mua sắm</p>
        <p className="text-sm text-normal">
          Các sản phẩm được hiển thị theo các nhãn hàng.
        </p>
      </div>
      <div className="mt-[40px]">
        <BrandSection />
      </div>
    </div>
  );
}

function BrandSection() {
  const { data: brands = [] } = useGetAllBrand();

  const brandImage = (brandId: string) => {
    switch (brandId) {
      case "DRCICA":
        return "/brand-dr-ci.png";
      case "EASYDE":
        return "/brand2.png";
      case "ECLATD":
        return "/brand3.png";
      case "JUVEHE":
        return "/brand4.png";
      case "SEBAME":
        return "/brand5.png";
      default:
        return "";
    }
  };

  const totalItems = 16;
  const filledBrands = [
    ...brands,
    ...new Array(Math.max(totalItems - brands.length, 0)).fill(null),
  ];

  return (
    <div className="grid grid-cols-4 px-[40px] gap-[15px]">
      {filledBrands.map((brandItem, index) =>
        brandItem ? (
          <Link
            href={`/dashboard/shop/brand/${brandItem.handle}`}
            key={index}
            className="w-full h-[120px] bg-foreground bg-opacity-40 rounded-[15px] flex items-center justify-center backdrop-blur-sm"
          >
            <Image
              alt={brandItem.brandName}
              src={brandImage(brandItem.brandId)}
              width={150}
              height={60}
              className="w-[150px] h-[60px] object-cover"
            />
          </Link>
        ) : (
          <div
            key={index}
            className="w-full h-[120px] bg-foreground bg-opacity-40 rounded-[15px] flex items-center justify-center"
          />
        )
      )}
    </div>
  );
}
