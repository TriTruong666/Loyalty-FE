"use client";
import AuthComponent from "@/app/components/AuthComponent";
import GiftDropdown from "@/app/components/GiftDropdown";
import SearchSalesCustomerDropdown from "@/app/components/SearchSalesCustomerDropdown";
import {
  CartItem as CartItemProps,
  GiftItem as GiftItemProps,
} from "@/app/interfaces/Cart";
import {
  removeFromCart,
  updateCartItemDiscount,
  updateCartItemQuantity,
} from "@/app/service/cartService";
import { userInfoState } from "@/app/store/accountAtoms";
import {
  cartState,
  discountCustomState,
  discountPPState,
  discountUniqueState,
  estimatePointState,
  subtotalCartValueAtom,
  totalCartValueAtoms,
} from "@/app/store/cartAtoms";
import {
  salesCustomerNameState,
  salesCustomerPhoneState,
  salesCustomerState,
} from "@/app/store/checkoutAtoms";
import {
  giftDropdownState,
  searchSalesCustomerDropdownState,
} from "@/app/store/dropdownAtoms";
import { formatPrice } from "@/app/utils/format";
import { showToast } from "@/app/utils/toast";
import { Link, Button, Input, NumberInput } from "@heroui/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { FaPercent, FaTrash } from "react-icons/fa";
export default function CartPage() {
  const setGiftDropdown = useSetAtom(giftDropdownState);
  const setSearchSalesCustomerDropdown = useSetAtom(
    searchSalesCustomerDropdownState
  );
  const info = useAtomValue(userInfoState);
  const [cart, setCart] = useAtom(cartState);
  const subtotalCartValue = useAtomValue(subtotalCartValueAtom);
  const estimatePoint = useAtomValue(estimatePointState);
  const discountByTypeValue = useAtomValue(discountUniqueState);
  const discountByDistributionValue = useAtomValue(discountPPState);
  const discountCustomValue = useAtomValue(discountCustomState);
  const totalCartValue = useAtomValue(totalCartValueAtoms);
  const salesCustomerId = useAtomValue(salesCustomerState);
  const salesCustomerName = useAtomValue(salesCustomerNameState);
  const salesCustomerPhone = useAtomValue(salesCustomerPhoneState);
  const router = useRouter();
  useEffect(() => {
    if (cart.cartItems.length > 0) return;

    setCart((prev) => {
      if (prev.cartItems.length === 0 && prev.gifts.length === 0) return prev;
      return { cartItems: [], gifts: [] };
    });
  }, [cart.cartItems, setCart]);

  // const updatePercentMutation = useMutation({
  //   mutationKey: ["update-percent"],
  //   mutationFn: async ({
  //     userId,
  //     discountCustom,
  //   }: {
  //     userId: string;
  //     discountCustom: number;
  //   }) => updateCustomPercent(userId, { discountCustom: discountCustom }),
  //   onMutate() {
  //     setIsLoading(true);
  //   },
  //   onSuccess(data) {
  //     if (data.message === "Updated Successfully") {
  //       showToast("Cập nhật chiết khấu thành công", "success");
  //       setIsLoading(false);
  //       setPercentModal(false);
  //       queryClient.invalidateQueries({ queryKey: ["user-info"] });
  //     }
  //   },
  // });

  const filterCartUnique = cart.cartItems.filter(
    (item) => item.product.brand?.type === "docquyen"
  );
  const filterCartDistribution = cart.cartItems.filter(
    (item) => item.product.brand?.type === "phanphoi"
  );
  const toggleSearchCustomerDropdown = () => {
    setSearchSalesCustomerDropdown(true);
    setGiftDropdown(false);
  };
  const toggleOpenDropdown = () => {
    setGiftDropdown(true);
    setSearchSalesCustomerDropdown(false);
  };
  const toggleCloseModal = () => {
    setGiftDropdown(false);
    setSearchSalesCustomerDropdown(false);
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
  return (
    <AuthComponent allowedRoles={["business", "personal", "sales"]}>
      <div
        className="flex flex-col min-h-[calc(100vh-140px)] font-open py-[20px] mb-[50px]"
        onClick={toggleCloseModal}
      >
        <div className="flex justify-between w-full items-center px-[40px] relative">
          {/* gift dropdown */}
          <GiftDropdown />
          <SearchSalesCustomerDropdown />
          {/* modal */}
          {/* <div
            onClick={(e) => e.stopPropagation()}
            className=" absolute 3xl:left-[80%] z-[1000] 2xl:left-[62%] top-[7px] w-[300px] p-[10px] bg-default-50 rounded-[15px]  modal-content"
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
          </div> */}

          <div className="flex flex-col  gap-y-[5px] select-none">
            <p className="text-[28px] font-light ">Giỏ hàng của bạn</p>
            {info?.type === "sales" ? (
              <>
                <p className="text-sm text-normal">
                  Chọn những sản phẩm tốt nhất và bạn có thể nhập chiết khấu cho
                  từng sản phẩm{" "}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-normal">
                  Chọn những sản phẩm tốt nhất và bạn có thể xem chiết khấu{" "}
                  <a
                    href="/14.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white underline cursor-pointer"
                  >
                    Tại đây
                  </a>
                </p>
              </>
            )}
          </div>
          {info?.type === "sales" && (
            <div className="flex items-center gap-x-[15px]">
              {salesCustomerId !== "" ? (
                <>
                  <Button
                    variant="light"
                    onPress={toggleSearchCustomerDropdown}
                  >
                    <p className="text-primary">Chọn khách khác</p>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="light"
                    onPress={toggleSearchCustomerDropdown}
                  >
                    <p className="text-primary">Chọn khách hàng</p>
                  </Button>
                </>
              )}

              <Button variant="light" onPress={toggleOpenDropdown}>
                <p className="text-primary">Thêm quà tặng</p>
              </Button>
              {/* <Button onPress={toggleOpenModal} variant="light" className="">
                <p className="text-primary">Nhập chiết khấu</p>
              </Button> */}
            </div>
          )}
        </div>
        <div className="flex px-[40px] mt-[40px] justify-between">
          {/* cart */}
          <div className="flex flex-col w-[60%]">
            {filterCartUnique.length !== 0 && (
              <div className="flex flex-col mb-[50px]">
                <p className="text-sm font-semibold mb-[20px]">
                  Hàng độc quyền
                </p>
                <div className="flex flex-col gap-y-[40px]">
                  {filterCartUnique.map((item) => (
                    <CartItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
            )}

            {filterCartDistribution.length !== 0 && (
              <div className="flex flex-col">
                <p className="text-sm font-semibold mb-[20px]">
                  Hàng phân phối
                </p>
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
              {info?.type === "sales" && (
                <div className="flex justify-between">
                  <p className="font-light text-normal">Khách</p>
                  <p className="font-bold text-end line-clamp-2">
                    {salesCustomerName || "Chưa chọn khách"}
                  </p>
                </div>
              )}
              {info?.type === "sales" && (
                <div className="flex justify-between">
                  <p className="font-light text-normal">SĐT</p>
                  <p className="font-bold text-end line-clamp-2">
                    {salesCustomerPhone || "Chưa chọn khách"}
                  </p>
                </div>
              )}
              <div className="flex justify-between">
                <p className="font-light text-normal">Tạm tính</p>
                <p className="font-bold">{formatPrice(subtotalCartValue)}</p>
              </div>
              {discountByTypeValue !== 0 && (
                <div className="flex justify-between">
                  <p className="font-light text-normal">Chiết khấu độc quyền</p>
                  <p className="font-bold">
                    -{formatPrice(discountByTypeValue)}
                  </p>
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
                  <p className="font-bold">
                    {formatPrice(discountCustomValue)}
                  </p>
                </div>
              )}
              {info?.type !== "sales" && (
                <div className="flex justify-between">
                  <p className="font-light text-normal">Điểm tích luỹ được</p>
                  <p className="font-bold">{estimatePoint} điểm</p>
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
    </AuthComponent>
  );
}

const CartItem = (props: CartItemProps) => {
  const [toggleDiscountInput, setToggleDiscountInput] = useState(false);
  const [discount, setDiscount] = useState<number>(0); // decimal 0 - 1
  const [discountInput, setDiscountInput] = useState<string>(""); // text input

  const info = useAtomValue(userInfoState);
  const [quantity, setQuantity] = useState<number | string>(props.quantity);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity("");
      return;
    }

    const newQuantity = Number(value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
      updateCartItemQuantity(props.id, newQuantity, setCart);
    }
  };
  useEffect(() => {
    setDiscount(props.discount ?? 0);
    setDiscountInput(String((props.discount ?? 0) * 100));
  }, [props.discount]);

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
  const handleDiscountUpdate = () => {
    const value = parseFloat(discountInput);
    const decimalDiscount = Math.min(Math.max(value / 100, 0), 1);

    if (isNaN(value)) {
      showToast("Vui lòng nhập số hợp lệ", "error");
      return;
    }

    if (decimalDiscount > 0.5) {
      showToast("Mức chiết khấu tối đa cho từng sản phẩm là 50%", "error");
      return;
    }

    setDiscount(decimalDiscount);
    updateCartItemDiscount(props.id, decimalDiscount, setCart);
    showToast("Đã cập nhật chiết khấu", "success");
    setToggleDiscountInput(false);
  };

  return (
    <div className="flex pl-[20px] border-l-[2px] relative">
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
              onPress={() => handleQuantityChange(Number(quantity) + 1)} // Ép kiểu về number
            >
              <p className="text-[20px]">+</p>
            </Button>
            <Input
              onChange={handleInputChange}
              className="max-w-[100px]"
              value={`${quantity}`}
              type="number"
            />
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              onPress={() => handleQuantityChange(Number(quantity) - 1)} // Ép kiểu về number
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
        {info?.type !== "sales" && (
          <p className="text-[15px] text-primary font-bold w-fit">
            {formatPrice(props.product.price as number)}
          </p>
        )}
        {info?.type === "sales" && (
          <p className="text-[15px] text-primary font-bold w-fit">
            {formatPrice(props.product.price as number)} (-
            {(discount * 100).toFixed(1)}%)
          </p>
        )}

        <div className="flex items-center gap-x-[10px]">
          {!toggleDiscountInput && (
            <>
              {info?.type === "sales" && (
                <Button
                  isIconOnly
                  variant="light"
                  size="md"
                  color="secondary"
                  onPress={() => setToggleDiscountInput(true)}
                >
                  <FaPercent className="text-[16px]" />
                </Button>
              )}
            </>
          )}

          {toggleDiscountInput && (
            <Input
              variant="underlined"
              size="sm"
              className="max-w-[250px]"
              placeholder="Nhập chiết khấu (%)"
              type="text"
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setDiscountInput(value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleDiscountUpdate();
                }
              }}
            />
          )}

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
