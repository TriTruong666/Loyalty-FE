"use client";
import GiftDropdown from "@/app/components/GiftDropdown";
import { LoadingDashboard } from "@/app/components/loading";
import { useGetSalesCustomerByLimit } from "@/app/hooks/hook";
import {
  CartItem as CartItemProps,
  GiftItem as GiftItemProps,
} from "@/app/interfaces/Cart";
import { updateCustomPercent } from "@/app/service/accountService";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/app/service/cartService";
import { userInfoState } from "@/app/store/accountAtoms";
import {
  cartState,
  discountCustomState,
  discountPPState,
  discountUniqueState,
  subtotalCartValueAtom,
  totalCartValueAtoms,
} from "@/app/store/cartAtoms";
import { salesCustomerState } from "@/app/store/checkoutAtoms";
import { giftDropdownState } from "@/app/store/dropdownAtoms";
import { formatPrice } from "@/app/utils/format";
import { showToast } from "@/app/utils/toast";
import { Link, Button, Input, Select, SelectItem } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
export default function CartPage() {
  const [percentModal, setPercentModal] = useState(false);
  const setGiftDropdown = useSetAtom(giftDropdownState);
  const info = useAtomValue(userInfoState);
  const [submitData, setSubmitData] = useState<number>(0);
  const [cart, setCart] = useAtom(cartState);
  const subtotalCartValue = useAtomValue(subtotalCartValueAtom);
  const discountByTypeValue = useAtomValue(discountUniqueState);
  const discountByDistributionValue = useAtomValue(discountPPState);
  const discountCustomValue = useAtomValue(discountCustomState);
  const totalCartValue = useAtomValue(totalCartValueAtoms);
  const [salesCustomerId, setSalesCustomerId] = useAtom(salesCustomerState);
  const [isLoading, setIsLoading] = useState(false);
  const { data: accounts } = useGetSalesCustomerByLimit(1, 100);
  const router = useRouter();
  useEffect(() => {
    if (cart.cartItems.length > 0) return;

    setCart((prev) => {
      if (prev.cartItems.length === 0 && prev.gifts.length === 0) return prev;
      return { cartItems: [], gifts: [] };
    });
  }, [cart.cartItems, setCart]);

  const queryClient = useQueryClient();
  const updatePercentMutation = useMutation({
    mutationKey: ["update-percent"],
    mutationFn: async ({
      userId,
      discountCustom,
    }: {
      userId: string;
      discountCustom: number;
    }) => updateCustomPercent(userId, { discountCustom: discountCustom }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.message === "Updated Successfully") {
        showToast("Cập nhật chiết khấu thành công", "success");
        setIsLoading(false);
        setPercentModal(false);
        queryClient.invalidateQueries({ queryKey: ["user-info"] });
      }
    },
  });

  const filterCartUnique = cart.cartItems.filter(
    (item) => item.product.brand?.type === "docquyen"
  );
  const filterCartDistribution = cart.cartItems.filter(
    (item) => item.product.brand?.type === "phanphoi"
  );
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedValue = parseFloat(inputValue);
    const discount = parsedValue / 100;
    setSubmitData(discount);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitChangePercent();
    }
  };
  const handleSubmitChangePercent = async () => {
    if (submitData > 0.5) {
      showToast("Mức chiết khấu không được vượt quá 50%", "error");
      return;
    }
    if (submitData < 0) {
      showToast("Không thể đặt mức chiết khấu dưới 0%", "error");
      return;
    }
    try {
      await updatePercentMutation.mutateAsync({
        discountCustom: submitData,
        userId: info?.userId as string,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleChooseSalesCustomer = (customerId: string) => {
    setSalesCustomerId(customerId);
  };
  const toggleOpenDropdown = () => {
    setGiftDropdown(true);
  };
  const toggleOpenModal = () => {
    setPercentModal(true);
  };
  const toggleCloseModal = () => {
    setPercentModal(false);
    setGiftDropdown(false);
  };
  const handleGoToCheckoutSales = () => {
    if (salesCustomerId === "") {
      showToast("Vui lòng chọn khách hàng trước khi thanh toán", "error");
      return;
    }
    router.push(`/checkout`);
  };
  if (cart.cartItems.length === 0) {
    return (
      <div className="w-full h-[600px] flex flex-col justify-center items-center gap-y-[20px] font-open">
        <BsCartX className="text-[60px] text-normal" />
        <p className="text-normal">
          Giỏ hàng của bạn đang trống, vui lòng thêm sản phẩm vào giỏ.
        </p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <>
        <LoadingDashboard />
      </>
    );
  }
  return (
    <div
      className="flex flex-col font-open py-[20px] mb-[50px]"
      onClick={toggleCloseModal}
    >
      <div className="flex justify-between w-full items-center px-[40px] relative">
        {/* gift dropdown */}
        <GiftDropdown />
        {/* modal */}
        {percentModal && (
          <div
            onClick={(e) => e.stopPropagation()}
            className=" absolute 3xl:left-[80%] 2xl:left-[62%] top-[7px] w-[300px] p-[10px] bg-default-50 rounded-[15px] z-10 modal-content"
          >
            <Input
              type="number"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-normal text-small">%</span>
                </div>
              }
              placeholder="Chiết khấu"
              size="sm"
              variant="underlined"
            />
          </div>
        )}

        <div className="flex flex-col  gap-y-[5px] select-none">
          <p className="text-[28px] font-light ">Giỏ hàng của bạn</p>
          <p className="text-sm text-normal">
            Chọn những sản phẩm tốt nhất và bạn có thể xem chiết khấu{" "}
            <span className="font-bold text-white underline cursor-pointer">
              Tại đây
            </span>
          </p>
        </div>
        {info?.type === "sales" && (
          <div className="flex items-center gap-x-[15px]">
            <div className="w-[200px]">
              <Select
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  handleChooseSalesCustomer(selectedKey);
                }}
                label="Chọn khách hàng"
                variant="underlined"
                size="sm"
              >
                {(accounts ?? []).map((user) => (
                  <SelectItem
                    value={user.customerIDOfSales}
                    key={user.customerIDOfSales}
                  >
                    {user.userName}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Button variant="light" onPress={toggleOpenDropdown}>
              <p className="text-primary">Thêm quà tặng</p>
            </Button>
            <Button onPress={toggleOpenModal} variant="light" className="">
              <p className="text-primary">Nhập chiết khấu</p>
            </Button>
          </div>
        )}
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
          {cart.gifts.length !== 0 && (
            <div className="flex flex-col">
              <p className="text-sm font-semibold mb-[20px] text-primary">
                Quà tặng
              </p>
              <div className="flex flex-col gap-y-[40px]">
                {cart.gifts.map((item) => (
                  <GiftItem key={item.id} {...item} />
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
              <p className="font-bold">{formatPrice(subtotalCartValue)}</p>
            </div>
            {discountByTypeValue !== 0 && (
              <div className="flex justify-between">
                <p className="font-light text-normal">Chiết khấu độc quyền</p>
                <p className="font-bold">-{formatPrice(discountByTypeValue)}</p>
              </div>
            )}
            {discountByDistributionValue !== 0 && (
              <div className="flex justify-between">
                <p className="font-light text-normal">Chiết khấu phân phối</p>
                <p className="font-bold">
                  -{formatPrice(discountByDistributionValue)}
                </p>
              </div>
            )}
            {info?.type !== "sales" && (
              <div className="flex justify-between">
                <p className="font-light text-normal">Hạng Loyalty</p>
                <p className="font-bold">{info?.rank.rankName}</p>
              </div>
            )}
            {info?.type !== "sales" && (
              <div className="flex justify-between">
                <p className="font-light text-normal">Chiết khấu</p>
                {info?.type === "personal" && (
                  <p className="font-bold">
                    {(info?.rank.discountPersonal as number) * 100}%
                  </p>
                )}
                {info?.type === "business" && (
                  <p className="font-bold">
                    {(info?.rank.discountBusiness as number) * 100}%
                  </p>
                )}
              </div>
            )}
            {info?.type === "sales" && (
              <div className="flex justify-between">
                <p className="font-light text-normal">Giá trị chiết khấu</p>
                <p className="font-bold">{formatPrice(discountCustomValue)}</p>
              </div>
            )}
            {info?.type === "sales" && (
              <div className="flex justify-between">
                <p className="font-light text-normal">Chiết khẩu tuỳ chỉnh</p>
                <p className="font-bold">
                  {(info?.rank.discountCustom as number) * 100}%
                </p>
              </div>
            )}
            <div className="flex justify-between">
              <p className="font-semibold text-normal">Tổng</p>
              <p className="font-bold text-primary">
                {formatPrice(totalCartValue)}
              </p>
            </div>
          </div>
          <div className="mt-[30px] w-full">
            {info?.type === "sales" ? (
              <Button
                className="w-full"
                variant="flat"
                onPress={handleGoToCheckoutSales}
                color="secondary"
              >
                <p className="font-bold font-open">Thanh toán</p>
              </Button>
            ) : (
              <Button
                className="w-full"
                variant="flat"
                as={Link}
                color="secondary"
                href="/checkout"
              >
                <p className="font-bold font-open">Thanh toán</p>
              </Button>
            )}
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

const GiftItem = (props: GiftItemProps) => {
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
          {formatPrice(0)}
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
