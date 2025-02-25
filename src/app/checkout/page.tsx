"use client";

import NormalInput from "../components/NormalInput";
import { paymentMethodState } from "../store/checkoutAtoms";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Select, SelectItem } from "@heroui/select";
import { useAtom } from "jotai";
import { FC, ReactNode, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  MdOutlineCreditCard,
  MdOutlineLocalPhone,
  MdOutlineMailOutline,
} from "react-icons/md";
import { TbCoins, TbTruck } from "react-icons/tb";
import {
  useGetAllProvince,
  useGetDistrictByProvince,
  useGetUserInfo,
  useGetWardByDistrict,
} from "../hooks/hook";
import { CartItem as CartItemProps } from "../interfaces/Cart";
import { cartState } from "../store/cartAtoms";
import { formatPrice } from "../utils/format";
import { getCartFromStorage } from "../service/cartService";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col p-[30px] w-screen overflow-hidden bg-background font-open">
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
          <LocationForm />
          <PaymentMethod />
        </div>
        {/* summary */}
        <Summary />
      </div>
    </div>
  );
}

function LocationForm() {
  const { data: info } = useGetUserInfo();
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const { data: provinces, isLoading } = useGetAllProvince();
  const { data: districts } = useGetDistrictByProvince(
    selectedProvince as string
  );
  const { data: wards } = useGetWardByDistrict(selectedDistrict as string);

  useEffect(() => {
    if (info?.address) {
      setSelectedProvince((prev) => prev ?? info.address.provinceCode);
      setSelectedDistrict((prev) => prev ?? info.address.districtCode);
      setSelectedWard((prev) => prev ?? info.address.wardCode);
    }
  }, [info]);
  useEffect(() => {
    if (info?.address && districts) {
      const district = districts.find(
        (district) => district.code === info.address.districtCode
      );
      if (district) {
        setSelectedDistrict(district.code);
      }
    }
  }, [info, districts]);

  useEffect(() => {
    if (info?.address && wards) {
      const ward = wards.find((ward) => ward.code === info.address.wardCode);
      if (ward) {
        setSelectedWard(ward.code);
      }
    }
  }, [info, wards]);

  const handleProvinceChange = (provinceCode: string) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };
  const handleDistrictChange = (districtCode: string) => {
    setSelectedDistrict(districtCode);
    setSelectedWard(null);
  };
  const handleWardChange = (wardCode: string) => {
    setSelectedWard(wardCode);
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
                <SelectItem value={province.code} key={province.code}>
                  {province.fullName}
                </SelectItem>
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
                <SelectItem value={district.code} key={district.code}>
                  {district.fullName}
                </SelectItem>
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
                <SelectItem value={ward.code} key={ward.code}>
                  {ward.fullName}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <NormalInput
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
  const { data: info } = useGetUserInfo();
  return (
    <div className="flex flex-col">
      <div className="flex gap-x-[20px] items-center justify-between">
        <p className="text-[22px] font-light select-none">Thông tin mua hàng</p>
      </div>
      <div className="flex flex-col mt-[30px] gap-y-[20px]">
        <div className="w-full flex gap-x-[20px]">
          <NormalInput
            label="Tên khách hàng"
            placeholder="Nhập tên của bạn"
            defaultValue={info?.userName}
            icon={<FaRegUser className="text-[20px]" />}
          />
          <NormalInput
            label="Số điện thoại"
            placeholder="Số điện thoại"
            defaultValue={info?.phoneNumber}
            icon={<MdOutlineLocalPhone className="text-[20px]" />}
          />
        </div>
        <NormalInput
          label="Email"
          placeholder="Email"
          defaultValue={info?.email}
          icon={<MdOutlineMailOutline className="text-[20px]" />}
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
          value="cash"
          onChange={setSelected}
          selected={selected}
          title="Tiền mặt"
        />
        <RadioButton
          icon={<MdOutlineCreditCard className="text-[18px]" />}
          name="method"
          description="Quét QR để chuyển khoản."
          value="bank"
          onChange={setSelected}
          selected={selected}
          title="Chuyển khoản"
        />
        <RadioButton
          icon={<TbCoins className="text-[18px]" />}
          name="method"
          description="Bạn sẽ được công nợ trong vòng 7 ngày."
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
  const [cart, setCart] = useAtom(cartState);
  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
  }, [setCart]);
  return (
    <div className="flex flex-col w-[30%] ">
      <div className="flex flex-col gap-y-[5px]">
        <p className="text-[22px] font-light select-none">Chi tiết đơn hàng</p>
      </div>
      <div className="flex flex-col mt-[30px] gap-y-[10px]">
        {cart.slice(0, 3).map((item) => (
          <CheckoutCartItem key={item.id} {...item} />
        ))}
        {cart.length > 3 && (
          <p className="text-normal text-[13px]">
            +{cart.length - 3} sản phẩm khác...
          </p>
        )}
      </div>

      <div className="mt-[20px]">
        <textarea
          name=""
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
            <p className="font-bold">113,300,000₫</p>
          </div>
          <div className="flex justify-between">
            <p className="font-light text-normal">Chiết khấu</p>
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
            href="/scan-qr"
          >
            <p className="font-bold font-open">Thanh toán 101,970,000₫</p>
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
