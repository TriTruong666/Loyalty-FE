"use client";
import { useState } from "react";
import NormalInput from "@/app/components/NormalInput";
import { Select, SelectItem } from "@heroui/react";
import { FiSave } from "react-icons/fi";
import { useAtom } from "jotai";
import { dataCreateAccountState } from "@/app/store/accountAtoms";
import {
  useGetAllProvince,
  useGetDistrictByProvince,
  useGetWardByDistrict,
} from "@/app/hooks/hook";

import { IoIosPin } from "react-icons/io";

export default function SettingPage() {
  return (
    <div className="flex flex-col px-[40px] py-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[22px] font-light select-none">
            Địa chỉ khách hàng
          </p>
          <p className="text-[12px] text-normal">
            Cập nhật thông tin cá nhân của bạn
          </p>
        </div>
        <div className="flex items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group">
          <FiSave className="text-[16px] text-background" />
          <p className="text-[12px] text-background">Lưu thông tin</p>
        </div>
      </div>
      <LocationForm />
    </div>
  );
}

function LocationForm() {
  const [submitData, setSubmitData] = useAtom(dataCreateAccountState);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const { data: provinces, isLoading } = useGetAllProvince();
  const { data: districts } = useGetDistrictByProvince(
    selectedProvince as string
  );
  const { data: wards } = useGetWardByDistrict(selectedDistrict as string);

  const handleProvinceChange = (provinceCode: string) => {
    setSubmitData({
      ...submitData,
      address: {
        ...submitData.address,
        provinceCode: provinceCode,
      },
    });
    setSelectedProvince(provinceCode);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };
  const handleDistrictChange = (districtCode: string) => {
    setSubmitData({
      ...submitData,
      address: {
        ...submitData.address,
        districtCode: districtCode,
      },
    });
    setSelectedDistrict(districtCode);
    setSelectedWard(null);
  };
  const handleWardChange = (wardCode: string) => {
    setSubmitData({
      ...submitData,
      address: {
        ...submitData.address,
        wardCode: wardCode,
      },
    });
    setSelectedWard(wardCode);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <div className="flex flex-col w-full gap-y-2 font-inter mt-[20px]">
        <label
          htmlFor="date"
          className="font-semibold text-sm 2xl:text-[12px] mb-1"
        >
          Tỉnh / Thành phố
        </label>
        <Select
          aria-label="province"
          isVirtualized
          variant="underlined"
          placeholder="Tỉnh / Thành phố"
          isLoading={isLoading}
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
          aria-label="district"
          isVirtualized
          variant="underlined"
          placeholder="Quận / Huyện"
          isDisabled={!selectedProvince}
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
          aria-label="ward"
          isVirtualized
          variant="underlined"
          placeholder="Phường / Xã"
          isDisabled={!selectedDistrict}
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
      <NormalInput
        onChange={(e) =>
          setSubmitData({
            ...submitData,
            address: {
              ...submitData.address,
              street: e.target.value,
            },
          })
        }
        label="Địa chỉ giao hàng"
        placeholder="Vinhomes Grand Central Park"
        icon={<IoIosPin size={20} />}
      />
    </div>
  );
}
