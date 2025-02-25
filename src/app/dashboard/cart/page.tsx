"use client";
import { LoadingDashboard } from "@/app/components/loading";
import { CartItem as CartItemProps } from "@/app/interfaces/Cart";
import {
  getCartFromStorage,
  removeFromCart,
  updateCartItemQuantity,
} from "@/app/service/cartService";
import { cartState, totalCartValueAtom } from "@/app/store/cartAtoms";
import { formatPrice } from "@/app/utils/format";
import { showToast } from "@/app/utils/toast";
import { Link, Button } from "@heroui/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
export default function CartPage() {
  const [cart, setCart] = useAtom(cartState);
  const totalCartValue = useAtomValue(totalCartValueAtom);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
    setIsMounted(true);
  }, [setCart]);

  // Avoid hydration errors by preventing rendering on the server
  const filterCartUnique = cart.filter(
    (item) => item.product.brand?.type === "docquyen"
  );
  const filterCartDistribution = cart.filter(
    (item) => item.product.brand?.type === "phanphoi"
  );
  if (cart.length === 0) {
    return (
      <div className="w-full h-[600px] flex flex-col justify-center items-center gap-y-[20px] font-open">
        <BsCartX className="text-[60px] text-normal" />
        <p className="text-normal">
          Giỏ hàng của bạn đang trống, vui lòng thêm sản phẩm vào giỏ.
        </p>
      </div>
    );
  }
  if (!isMounted) {
    return (
      <>
        <LoadingDashboard />
      </>
    );
  }
  return (
    <div className="flex flex-col font-open py-[20px] mb-[50px]">
      <div className="flex flex-col px-[40px] gap-y-[5px]select-none">
        <p className="text-[28px] font-light ">Giỏ hàng của bạn</p>
        <p className="text-sm text-normal">
          Chọn những sản phẩm tốt nhất và bạn có thể xem chiết khấu{" "}
          <span className="font-bold text-white underline cursor-pointer">
            Tại đây
          </span>
        </p>
      </div>
      <div className="flex px-[40px] mt-[40px] justify-between">
        {/* cart */}
        <div className="flex flex-col w-[60%]">
          {filterCartUnique.length !== 0 && (
            <div className="flex flex-col mb-[50px]">
              <p className="text-sm font-semibold mb-[20px]">Hàng độc quyền</p>
              <div className="flex flex-col gap-y-[40px]">
                {filterCartUnique.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
            </div>
          )}

          {filterCartDistribution.length !== 0 && (
            <div className="flex flex-col">
              <p className="text-sm font-semibold mb-[20px]">Hàng phân phối</p>
              <div className="flex flex-col gap-y-[40px]">
                {filterCartDistribution.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
            </div>
          )}
        </div>
        {/* checkout */}
        <div className="flex flex-col w-[35%] border border-gray-400-40 p-[20px] rounded-[15px] h-fit">
          <p className="font-light text-[22px] mb-[20px]">Thanh toán</p>
          <div className="flex flex-col gap-y-[20px]">
            <div className="flex justify-between">
              <p className="font-light text-normal">Tạm tính</p>
              <p className="font-bold">{formatPrice(totalCartValue)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-light text-normal">Chiết khấu độc quyền</p>
              <p className="font-bold">-11,330,000₫</p>
            </div>
            <div className="flex justify-between">
              <p className="font-light text-normal">Chiết khấu phân phối</p>
              <p className="font-bold">-11,330,000₫</p>
            </div>
            <div className="flex justify-between">
              <p className="font-light text-normal">Hạng Loyalty</p>
              <p className="font-bold">Gold</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-normal">Tổng</p>
              <p className="font-bold text-primary">101,970,000₫</p>
            </div>
          </div>
          <div className="mt-[30px] w-full">
            <Button
              className="w-full"
              variant="flat"
              as={Link}
              color="secondary"
              href="/checkout"
            >
              <p className="font-bold font-open">Thanh toán</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CartItem = (props: CartItemProps) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const setCart = useSetAtom(cartState);

  const handleRemove = () => {
    removeFromCart(props.id, setCart);
    showToast("Đã xoá khỏi giỏ hàng.", "success");
  };
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }
    setQuantity(newQuantity);
    updateCartItemQuantity(props.id, newQuantity, setCart);
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
  return (
    <div className="flex pl-[20px] border-l-[2px]">
      <div className="flex flex-col justify-between w-[70%] gap-y-[10px]">
        <p className="text-sm max-w-[95%] line-clamp-2">
          {props.product.productName}
        </p>
        <div className="flex items-center gap-x-[20px]">
          <div className="flex items-center gap-x-[10px]">
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              onPress={() => handleQuantityChange(quantity + 1)}
            >
              <p className="text-[20px]">+</p>
            </Button>
            <p>{quantity}</p>
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              onPress={() => handleQuantityChange(quantity - 1)}
            >
              <p className="text-[20px]">-</p>
            </Button>
          </div>
          <p className="text-normal text-sm">
            Đơn vị tính:{" "}
            <span className="font-bold text-foreground">
              {unitProduct(props.product.unit)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between w-[30%] items-end">
        <p className="text-[15px] text-primary font-bold w-fit">
          {formatPrice(props.product.price as number)}
        </p>

        <div className="flex">
          <Button
            isIconOnly
            variant="light"
            size="md"
            color="danger"
            onPress={handleRemove}
          >
            <FaTrash className="text-[16px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};
