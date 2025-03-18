"use client";
import NormalInput from "@/app/components/NormalInput";
import {
  useGetAllProvince,
  useGetDistrictByProvince,
  useGetWardByDistrict,
} from "@/app/hooks/hook";
import { UpdateUser, updateUserService } from "@/app/service/accountService";
import { userInfoState } from "@/app/store/accountAtoms";
import { showToast } from "@/app/utils/toast";
import { Select, SelectItem } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { TbTruck } from "react-icons/tb";

export default function SettingPage() {
  const [submitLocationData, setSubmitLocationData] = useState({
    provinceCode: "",
    districtCode: "",
    wardCode: "",
    street: "",
  });
  const info = useAtomValue(userInfoState);
  const [isSubmit, setIsSubmit] = useState(false);
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

  const queryClient = useQueryClient();
  const locationMutation = useMutation({
    mutationKey: ["change-location"],
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateUser;
    }) => updateUserService(userId, data),
    onMutate() {
      setIsSubmit(true);
    },
    onSuccess(data) {
      if (data.message === "Updated Successfully") {
        setIsSubmit(false);
        showToast("Cập nhật địa chỉ thành công", "success");
        queryClient.invalidateQueries({
          queryKey: ["user-info"],
        });
      }
      setIsSubmit(false);
    },
  });

  const handleOnSubmit = async () => {
    if (
      submitLocationData.districtCode === "" ||
      submitLocationData.wardCode === "" ||
      submitLocationData.street === "" ||
      submitLocationData.provinceCode === ""
    ) {
      showToast("Vui lòng chọn địa chỉ", "error");
      return;
    }
    try {
      await locationMutation.mutateAsync({
        userId: info?.userId as string,
        data: {
          address: submitLocationData,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

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
    console.log(submitLocationData);
    setSubmitLocationData((prev) => ({
      ...prev,
      street: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col px-[40px] py-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[22px] font-light select-none">Địa chỉ cá nhân</p>
          <p className="text-[12px] text-normal">
            Bạn có thể chỉnh sửa địa chỉ để thuận tiện cho việc giao hàng
          </p>
        </div>
        <div className="flex items-center gap-x-[20px]">
          {isSubmit && (
            <p className="text-[13px] text-normal">Đang cập nhật...</p>
          )}
          <button
            onClick={handleOnSubmit}
            className="flex disabled:cursor-not-allowed items-center bg-foreground border border-foreground px-4 py-[6px] rounded-md cursor-pointer gap-x-2 transition-all duration-200 hover:bg-foreground hover:border-transparent group"
          >
            <FiSave className="text-[16px] text-background" />
            <p className="text-[12px] text-background">Lưu thông tin</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-[40px] gap-y-[20px]">
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
