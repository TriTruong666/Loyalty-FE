"use client";
import AuthComponent from "@/app/components/AuthComponent";
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
    <AuthComponent allowedRoles={["business", "personal", "sales"]}>
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
    </AuthComponent>
  );
}

function BrandSection() {
  const { data: brands = [] } = useGetAllBrand();
  const priorityBrandIds = [
    "EASYDE",
    "SEBAME",
    "DRCICA",
    "ECLATD",
    "PAXMOL",
    "ELABAN",
    "JUVEHE",
  ];
  const sortedBrands = [...brands].sort((a, b) => {
    const aIndex = priorityBrandIds.indexOf(a.brandId);
    const bIndex = priorityBrandIds.indexOf(b.brandId);

    // Brand trong danh sách ưu tiên thì đẩy lên đầu
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    } else if (aIndex !== -1) {
      return -1;
    } else if (bIndex !== -1) {
      return 1;
    } else {
      return 0;
    }
  });

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
      case "PAXMOL":
        return "/brand6.png";
      case "DERMA":
        return "/brand7.png";
      case "ELABAN":
        return "/brand8.png";
      case "OPV":
        return "/brand9.png";
      case "TAMDUC":
        return "/brand10.png";
      default:
        return "";
    }
  };

  const totalItems = 16;
  const filledBrands = [
    ...sortedBrands,
    ...new Array(Math.max(totalItems - sortedBrands.length, 0)).fill(null),
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
