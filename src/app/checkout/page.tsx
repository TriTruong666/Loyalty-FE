"use client";
import NormalInput from "../components/NormalInput";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Select, SelectItem } from "@heroui/select";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  MdOutlineCreditCard,
  MdOutlineLocalPhone,
  MdOutlineMailOutline,
} from "react-icons/md";
import { TbTruck } from "react-icons/tb";
import {
  useGetAllProvince,
  useGetDistrictByProvince,
  useGetUserInfo,
  useGetWardByDistrict,
} from "../hooks/hook";
import { CartItem as CartItemProps } from "../interfaces/Cart";
import {
  cartState,
  discountCustomState,
  discountPPState,
  discountUniqueState,
  estimatePointState,
  subtotalCartValueAtom,
  totalCartValueAtoms,
} from "../store/cartAtoms";
import { formatPrice } from "../utils/format";
import { getCartFromStorage } from "../service/cartService";
import {
  checkoutResponseState,
  checkoutState,
  noteCheckoutState,
  paymentMethodState,
  salesCustomerNameState,
  salesCustomerPhoneState,
  salesCustomerState,
  shippingAddressState,
  userInfoCheckoutState,
} from "../store/checkoutAtoms";
import { userInfoState } from "../store/accountAtoms";
import { useMutation } from "@tanstack/react-query";
import { createOrderService } from "../service/checkoutService";
import { showToast } from "../utils/toast";
import { LoadingDashboard } from "../components/loading";
import { useRouter } from "next/navigation";
import { GrMoney } from "react-icons/gr";
import { Toaster } from "react-hot-toast";
import { createPaymentQR } from "../service/paymentService";
import { qrImageState } from "../store/paymentAtoms";

export default function CheckoutPage() {
  const setInfo = useSetAtom(userInfoState);
  const router = useRouter();
  const cart = useAtomValue(cartState);
  const { data: info } = useGetUserInfo();
  useEffect(() => {
    setInfo(info);
  }, [info]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const salesCustomerId = useAtomValue(salesCustomerState);
  useEffect(() => {
    if (cart !== undefined) {
      setIsCartLoaded(true);
    }
  }, [cart]);
  useEffect(() => {
    if (isCartLoaded && cart.cartItems.length === 0) {
      router.push("/dashboard/cart");
    }
    if (info?.type === "sales" && salesCustomerId === "") {
      router.push("/dashboard/cart");
    }
  }, [cart, isCartLoaded, router, salesCustomerId, info]);

  return (
    <div className="flex flex-col min-h-screen p-[30px] w-screen overflow-hidden bg-background font-open">
      <Toaster position="top-center" reverseOrder={false} />
      <Link
        color="foreground"
        href="/dashboard/cart"
        className="flex items-center text-normal gap-x-[10px] w-fit"
      >
        <IoIosArrowRoundBack className="text-[20px]" />
        <p className="font-light">Quay lại giỏ hàng</p>
      </Link>
      <div className="flex mt-[20px] gap-x-[30px] justify-between overflow-hidden">
        {/* infomation */}
        <div className="flex flex-col w-[70%] gap-y-[30px] pr-[50px]">
          <InfomationForm />
          {info?.type === "sales" && <SalesLocationForm />}
          {info?.type !== "sales" && <LocationForm />}
          <PaymentMethod />
        </div>
        {/* summary */}
        <Summary />
      </div>
    </div>
  );
}

function SalesLocationForm() {
  const [submitLocationData, setSubmitLocationData] =
    useAtom(shippingAddressState);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const { data: provinces } = useGetAllProvince();
  const { data: districts } = useGetDistrictByProvince(
    selectedProvince as string
  );
  const { data: wards } = useGetWardByDistrict(selectedDistrict as string);

  useEffect(() => {
    setSubmitLocationData((prev) => ({
      provinceCode: prev.provinceCode || "79",
      districtCode: prev.districtCode || "",
      wardCode: prev.wardCode || "",
      street: prev.street || "",
    }));

    setSelectedProvince((prev) => prev ?? "79");
    setSelectedDistrict((prev) => prev ?? null);
    setSelectedWard((prev) => prev ?? null);
  }, []);

  const handleProvinceChange = (provinceCode: string) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSubmitLocationData((prev) => ({
      ...prev,
      provinceCode,
      districtCode: "",
      wardCode: "",
    }));
  };

  const handleDistrictChange = (districtCode: string) => {
    setSelectedDistrict(districtCode);
    setSelectedWard(null);
    setSubmitLocationData((prev) => ({
      ...prev,
      districtCode,
      wardCode: "",
    }));
  };

  const handleWardChange = (wardCode: string) => {
    setSelectedWard(wardCode);
    setSubmitLocationData((prev) => ({
      ...prev,
      wardCode,
    }));
  };

  const handleStreetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmitLocationData((prev) => ({
      ...prev,
      street: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-x-[20px] items-center justify-between">
        <p className="text-[22px] font-light select-none">Địa chỉ giao hàng</p>
      </div>
      <div className="flex flex-col mt-[30px] gap-y-[20px]">
        <div className="flex gap-x-[10px]">
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Tỉnh / Thành phố
            </label>
            <Select
              isVirtualized
              variant="underlined"
              placeholder="Tỉnh / Thành phố"
              aria-label="Tỉnh / Thành phố"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKeys={selectedProvince ? [selectedProvince] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                handleProvinceChange(selectedKey);
              }}
            >
              {(provinces ?? []).map((province) => (
                <SelectItem key={province.code}>{province.fullName}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Quận / Huyện
            </label>
            <Select
              isVirtualized
              variant="underlined"
              placeholder="Quận / Huyện"
              aria-label="Quận / Huyện"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKeys={selectedDistrict ? [selectedDistrict] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                handleDistrictChange(selectedKey);
              }}
            >
              {(districts ?? []).map((district) => (
                <SelectItem key={district.code}>{district.fullName}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Phường / Xã
            </label>
            <Select
              isVirtualized
              variant="underlined"
              placeholder="Phường / Xã"
              aria-label="Phường / Xã"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKeys={selectedWard ? [selectedWard] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                handleWardChange(selectedKey);
              }}
            >
              {(wards ?? []).map((ward) => (
                <SelectItem key={ward.code}>{ward.fullName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <NormalInput
          onChange={handleStreetChange}
          label="Địa chỉ giao hàng"
          placeholder="Nhập địa chỉ giao hàng"
          icon={<TbTruck className="text-[20px]" />}
        />
      </div>
    </div>
  );
}

function LocationForm() {
  const [submitLocationData, setSubmitLocationData] =
    useAtom(shippingAddressState);
  const info = useAtomValue(userInfoState);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const { data: provinces } = useGetAllProvince();
  const { data: districts } = useGetDistrictByProvince(
    selectedProvince as string
  );
  const { data: wards } = useGetWardByDistrict(selectedDistrict as string);

  useEffect(() => {
    if (info?.address) {
      setSubmitLocationData((prev) => ({
        provinceCode: prev.provinceCode || info.address.provinceCode,
        districtCode: prev.districtCode || info.address.districtCode,
        wardCode: prev.wardCode || info.address.wardCode,
        street: prev.street || info.address.street,
      }));

      setSelectedProvince((prev) => prev ?? info.address.provinceCode);
      setSelectedDistrict((prev) => prev ?? info.address.districtCode);
      setSelectedWard((prev) => prev ?? info.address.wardCode);
    }
  }, [info, setSubmitLocationData]);

  const handleProvinceChange = (provinceCode: string) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSubmitLocationData((prev) => ({
      ...prev,
      provinceCode,
      districtCode: "",
      wardCode: "",
    }));
  };

  const handleDistrictChange = (districtCode: string) => {
    setSelectedDistrict(districtCode);
    setSelectedWard(null);
    setSubmitLocationData((prev) => ({
      ...prev,
      districtCode,
      wardCode: "",
    }));
  };

  const handleWardChange = (wardCode: string) => {
    setSelectedWard(wardCode);
    setSubmitLocationData((prev) => ({
      ...prev,
      wardCode,
    }));
  };

  const handleStreetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmitLocationData((prev) => ({
      ...prev,
      street: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-x-[20px] items-center justify-between">
        <p className="text-[22px] font-light select-none">Địa chỉ giao hàng</p>
      </div>
      <div className="flex flex-col mt-[30px] gap-y-[20px]">
        <div className="flex gap-x-[10px]">
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Tỉnh / Thành phố
            </label>
            <Select
              isVirtualized
              variant="underlined"
              placeholder="Tỉnh / Thành phố"
              aria-label="Tỉnh / Thành phố"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKeys={selectedProvince ? [selectedProvince] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                handleProvinceChange(selectedKey);
              }}
            >
              {(provinces ?? []).map((province) => (
                <SelectItem key={province.code}>{province.fullName}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Quận / Huyện
            </label>
            <Select
              isVirtualized
              variant="underlined"
              placeholder="Quận / Huyện"
              aria-label="Quận / Huyện"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKeys={selectedDistrict ? [selectedDistrict] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                handleDistrictChange(selectedKey);
              }}
            >
              {(districts ?? []).map((district) => (
                <SelectItem key={district.code}>{district.fullName}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Phường / Xã
            </label>
            <Select
              isVirtualized
              variant="underlined"
              placeholder="Phường / Xã"
              aria-label="Phường / Xã"
              scrollShadowProps={{
                isEnabled: false,
              }}
              selectedKeys={selectedWard ? [selectedWard] : []}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                handleWardChange(selectedKey);
              }}
            >
              {(wards ?? []).map((ward) => (
                <SelectItem key={ward.code}>{ward.fullName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <NormalInput
          onChange={handleStreetChange}
          label="Địa chỉ giao hàng"
          placeholder="Nhập địa chỉ giao hàng"
          defaultValue={info?.address.street || ""}
          icon={<TbTruck className="text-[20px]" />}
        />
      </div>
    </div>
  );
}

function InfomationForm() {
  const info = useAtomValue(userInfoState);
  const [submitInfoData, setSubmitInfoData] = useAtom(userInfoCheckoutState);
  const salesCustomerName = useAtomValue(salesCustomerNameState);
  const salesCustomerPhone = useAtomValue(salesCustomerPhoneState);
  useEffect(() => {
    if (info && !submitInfoData.customerId) {
      setSubmitInfoData({
        customerName: info.type === "sales" ? salesCustomerName : info.userName,
        customerPhone:
          info.type === "sales" ? salesCustomerPhone : info.phoneNumber,
        customerId: info.userId,
      });
    }
  }, [
    info,
    setSubmitInfoData,
    submitInfoData.customerId,
    salesCustomerName,
    salesCustomerPhone,
  ]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubmitInfoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-x-[20px] items-center justify-between">
        <p className="text-[22px] font-light select-none">Thông tin mua hàng</p>
      </div>
      <div className="flex flex-col mt-[30px] gap-y-[20px]">
        <div className="w-full flex gap-x-[20px]">
          <NormalInput
            onChange={handleOnChange}
            name="customerName"
            label="Tên khách hàng"
            placeholder="Nhập tên của bạn"
            defaultValue={
              info?.type === "sales" ? salesCustomerName : info?.userName
            }
            icon={<FaRegUser className="text-[20px]" />}
          />
          <NormalInput
            max={10}
            onChange={handleOnChange}
            name="customerPhone"
            label="Số điện thoại"
            placeholder="Số điện thoại"
            defaultValue={
              info?.type === "sales" ? salesCustomerPhone : info?.phoneNumber
            }
            icon={<MdOutlineLocalPhone className="text-[20px]" />}
          />
        </div>
        <NormalInput
          label="Email"
          placeholder="Email"
          defaultValue={info?.email}
          icon={<MdOutlineMailOutline className="text-[20px]" />}
          disabled
        />
      </div>
    </div>
  );
}

function PaymentMethod() {
  const [selected, setSelected] = useAtom(paymentMethodState);
  return (
    <div className="flex flex-col">
      <div className="flex gap-x-[20px] items-center justify-between">
        <p className="text-[22px] font-light select-none">
          Phương thức thanh toán
        </p>
      </div>
      <div className="flex gap-x-[20px] mt-[30px]">
        <RadioButton
          icon={<FaRegMoneyBill1 className="text-[18px]" />}
          name="method"
          description="Bạn sẽ trả tiền mặt khi giao hàng thành công."
          value="cod"
          onChange={setSelected}
          selected={selected}
          title="COD"
        />
        <RadioButton
          icon={<MdOutlineCreditCard className="text-[18px]" />}
          name="method"
          description="Quét QR để chuyển khoản."
          value="bank_transfer"
          onChange={setSelected}
          selected={selected}
          title="Chuyển khoản"
        />
        <RadioButton
          icon={<GrMoney className="text-[18px]" />}
          name="method"
          description="Công nợ trong vòng 21 ngày."
          value="debt"
          onChange={setSelected}
          selected={selected}
          title="Công nợ"
        />
      </div>
    </div>
  );
}

function Summary() {
  const router = useRouter();
  const gateway = useAtomValue(paymentMethodState);
  const subtotalCartValue = useAtomValue(subtotalCartValueAtom);
  const setResponse = useSetAtom(checkoutResponseState);
  const setQRImage = useSetAtom(qrImageState);
  const estimatePoint = useAtomValue(estimatePointState);
  const discountByTypeValue = useAtomValue(discountUniqueState);
  const discountByDistributionValue = useAtomValue(discountPPState);
  const totalCartValue = useAtomValue(totalCartValueAtoms);
  const info = useAtomValue(userInfoState);
  const discountCustomValue = useAtomValue(discountCustomState);
  const [cart, setCart] = useAtom(cartState);
  const [note, setNote] = useAtom(noteCheckoutState);
  const submitData = useAtomValue(checkoutState);
  // const submitPaymentData = useAtomValue(paymentState);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const storedCart = getCartFromStorage();
    if (submitData || cart) {
      setIsMounted(true);
    }
    setCart(storedCart);
  }, [setCart]);
  const createOrderMutation = useMutation({
    mutationKey: ["create-order"],
    mutationFn: createOrderService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.message) {
        if (gateway === "bank_transfer") {
          setResponse(data.message);
          setIsLoading(false);
          paymentMutation.mutate({
            orderID: data.message,
            description: `PicareVN Loyalty ${data.message}`,
            amount: totalCartValue,
            userID: info?.userId as string,
          });
          router.push("/scan-qr");
          setIsLoading(false);
        }
        if (gateway !== "bank_transfer") {
          if (typeof window !== "undefined") {
            window.location.href = "/payment-success";
          }
          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
          }
          setIsLoading(false);
          setTimeout(() => {
            setCart({
              cartItems: [],
              gifts: [],
            });
          }, 500);
        }
      }
    },
  });
  const paymentMutation = useMutation({
    mutationKey: ["scan-qr"],
    mutationFn: createPaymentQR,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.code === "SOMETHING_WENT_WRONG") {
        showToast("Lỗi khi tạo mã QR, vui lòng thử lại", "error");
        setIsLoading(false);
      }
      if (data?.responseBody?.qrDataUrl) {
        setQRImage(data.responseBody.qrDataUrl);
        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });
  const handleSubmit = async () => {
    if (submitData === null) {
      showToast("Vui lòng kiểm tra lại thông tin còn thiếu.", "error");
      return;
    }
    if (gateway === "debt" && subtotalCartValue > 30000000) {
      showToast("Đơn công nợ không thể vượt quá 30 triệu", "error");
      return;
    }
    try {
      if (submitData) {
        await createOrderMutation.mutateAsync(submitData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleNoteOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };
  if (!isMounted) {
    <>
      <LoadingDashboard />
    </>;
  }
  return (
    <div className="flex flex-col w-[30%] ">
      <div className="flex flex-col gap-y-[5px]">
        <p className="text-[22px] font-light select-none">Chi tiết đơn hàng</p>
      </div>
      <div className="flex flex-col mt-[30px] gap-y-[10px]">
        {cart.cartItems.slice(0, 3).map((item) => (
          <CheckoutCartItem key={item.id} {...item} />
        ))}
        {cart.cartItems.length > 3 && (
          <p className="text-normal text-[13px]">
            +{cart.cartItems.length - 3} sản phẩm khác...
          </p>
        )}
        {cart.gifts.length !== 0 && (
          <p className="text-normal text-[13px]">
            Bạn đã chọn {cart.gifts.length} món quà.
          </p>
        )}
      </div>

      <div className="mt-[20px]">
        <textarea
          onChange={handleNoteOnChange}
          value={note}
          id=""
          className="appearance-none resize-none max-h-[100px] h-[100px] w-full p-[15px] placeholder:text-[14px] placeholder:text-normal outline-none rounded-md"
          placeholder="Ghi chú cho Loyalty"
        ></textarea>
      </div>
      <div className="flex flex-col mt-[10px]">
        <p className="text-[22px] font-light select-none">Thanh toán</p>
        <div className="flex flex-col gap-y-[20px] mt-[20px]">
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
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={handleSubmit}
            className="w-full"
            variant="flat"
            color="secondary"
          >
            <p className="font-bold font-open">
              Thanh toán {formatPrice(totalCartValue)}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}

function CheckoutCartItem(props: CartItemProps) {
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
    <div className="flex justify-between border-b border-gray-400-40 pb-[10px]">
      <div className="flex flex-col gap-y-[5px]">
        <p className="line-clamp-2 text-[13px] font-semibold max-w-[90%]">
          {props.product.productName}
        </p>
        <p className="text-normal text-[11px]">
          Số lượng:{" "}
          <span className="text-foreground font-bold">
            {props.quantity} {unitProduct(props.product.unit)}
          </span>
        </p>
      </div>
      <p className="font-bold text-primary text-sm">
        {formatPrice(props.product.price as number)}
      </p>
    </div>
  );
}

interface RadioButtonProps {
  icon: ReactNode;
  title: string;
  description: string;
  value: string;
  selected: string;
  onChange: (value: string) => void;
  name: string;
}

const RadioButton: FC<RadioButtonProps> = ({
  icon,
  title,
  description,
  value,
  selected,
  onChange,
  name,
}) => {
  return (
    <label
      onClick={() => onChange(value)}
      className={`flex flex-col justify-center items-center cursor-pointer w-full h-[150px] border transition-all duration-300 rounded-[15px] ${
        selected === value
          ? "border-gray-400 bg-gray-600 bg-opacity-10"
          : "border-gray-400-40"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <div className="mb-[10px]">{icon}</div>
      <p className="font-bold text-[13px] mb-[3px]">{title}</p>
      <p className="text-[11px] text-normal max-w-[80%] text-center">
        {description}
      </p>
    </label>
  );
};
