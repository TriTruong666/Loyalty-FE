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
import { useAtomValue, useSetAtom } from "jotai";
import { cartState } from "@/app/store/cartAtoms";
import { userInfoState } from "@/app/store/accountAtoms";
import { MdReportGmailerrorred } from "react-icons/md";
import AuthComponent from "@/app/components/AuthComponent";

export default function ProductDetailPage() {
  const info = useAtomValue(userInfoState);
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
  if (isLoading) {
    return (
      <div className="">
        <ProductDetailSkeleton />
      </div>
    );
  }
  return (
    <AuthComponent allowedRoles={["business", "personal", "sales"]}>
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
            {detail?.status === "hethang" && (
              <Button
                size="lg"
                className="w-full"
                isDisabled
                variant="flat"
                color="danger"
              >
                <p className="font-bold font-open">Sản phẩm đang hết hàng!</p>
              </Button>
            )}
            {detail?.status === "hetban" && (
              <Button
                size="lg"
                className="w-full"
                isDisabled
                variant="flat"
                color="danger"
              >
                <p className="font-bold font-open">Sản phẩm đang hết hàng!</p>
              </Button>
            )}
            {detail?.status === "dangban" && (
              <Button
                size="lg"
                className="w-full"
                onPress={handleAddProductToCart}
                variant="flat"
                color="secondary"
              >
                <p className="font-bold font-open">Thêm vào giỏ hàng</p>
              </Button>
            )}
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
    </AuthComponent>
  );
}
