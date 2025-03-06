"use client";
import { formatPrice } from "@/app/utils/format";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useGetProductDetailByHandle } from "@/app/hooks/hook";
import { useParams } from "next/navigation";
import { ProductDetailSkeleton } from "@/app/components/skeleton";
import { addToCart } from "@/app/service/cartService";
import { showToast } from "@/app/utils/toast";
import { useSetAtom } from "jotai";
import { cartState } from "@/app/store/cartAtoms";

export default function ProductDetailPage() {
  const params = useParams();
  const handle = params.handle;
  const setCart = useSetAtom(cartState);

  const { data: detail, isLoading } = useGetProductDetailByHandle(
    handle as string
  );
  const handleAddProductToCart = () => {
    if (!detail) {
      showToast("Sản phẩm không tồn tại.", "error");
      return;
    }

    addToCart(detail, 1, setCart);
    showToast("Đã thêm vào giỏ hàng.", "success");
  };

  const safeHTML = DOMPurify.sanitize(detail?.description || "");
  const brandTitle = (brandId: string) => {
    switch (brandId) {
      case "EASYDE":
        return "Easydew";
      case "DRCICA":
        return "DR Ciccarelli";
      case "ECLATD":
        return "Eclat Du Teint";
      case "JUVEHE":
        return "Juve Head";
      case "SEBAME":
        return "Sebamed";
      default:
        return "";
    }
  };
  const unitProduct = (unit: string) => {
    switch (unit) {
      case "1":
        return "Tuýp";
      case "2":
        return "Hộp";
      case "3":
        return "Chai";
      case "4":
        return "Ống";
      case "5":
        return "Gói";
      case "6":
        return "Thỏi";
      case "7":
        return "Hũ";
      case "8":
        return "Miếng";
    }
  };
  if (isLoading) {
    return (
      <div className="">
        <ProductDetailSkeleton />
      </div>
    );
  }
  return (
    <div className="flex flex-col p-[40px] font-open">
      {/* main */}
      <div className="flex justify-between">
        <div className="w-[45%]">
          <Image
            loading="lazy"
            alt=""
            src={detail?.imageUrl || ""}
            width={533}
            height={533}
            className="object-cover rounded-[20px]"
          />
        </div>
        <div className="w-[50%] flex flex-col">
          <p className="text-normal font-light mb-[10px]">
            {brandTitle(detail?.brandId || "NULL")}
          </p>
          <p className="font-bold text-[22px] text-foreground mb-[20px]">
            {detail?.productName}
          </p>
          <div className="flex justify-between items-center mb-[30px]">
            <p className="text-[26px] font-semibold text-primary">
              {formatPrice(detail?.price || 0)}
            </p>
            <p className="text-normal">
              Đơn vị: {unitProduct(detail?.unit as string)}
            </p>
          </div>
          <Button
            size="lg"
            className="w-full"
            onPress={handleAddProductToCart}
            variant="flat"
            color="secondary"
          >
            <p className="font-bold font-open">Thêm vào giỏ hàng</p>
          </Button>
        </div>
      </div>

      {/* description */}
      <div className="flex flex-col mt-[40px]">
        <p className="text-[24px] font-light">Chi tiết sản phẩm</p>
        <div
          className="text-medium/loose mt-[20px]"
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        />
      </div>
    </div>
  );
}
