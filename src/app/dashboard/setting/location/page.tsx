"use client";
import { useState } from "react";
import NormalInput from "@/app/components/NormalInput";
import Select from "@/app/components/Select";
import { FaAddressCard, FaCity } from "react-icons/fa";
import { FiSave } from "react-icons/fi";

// Add these types near the top of the file
type ProvinceKey = "HN" | "HCM" | "DN";
type DistrictKey =
  | "BTL"
  | "NTL"
  | "CG"
  | "HK"
  | "Q1"
  | "Q3"
  | "Q5"
  | "TB"
  | "HC"
  | "TK"
  | "LC";

const PROVINCES = [
  { value: "HN", label: "Hà Nội" },
  { value: "HCM", label: "Hồ Chí Minh" },
  { value: "DN", label: "Đà Nẵng" },
];

const DISTRICTS: Record<ProvinceKey, { value: string; label: string }[]> = {
  HN: [
    { value: "BTL", label: "Bắc Từ Liêm" },
    { value: "NTL", label: "Nam Từ Liêm" },
    { value: "CG", label: "Cầu Giấy" },
    { value: "HK", label: "Hoàn Kiếm" },
  ],
  HCM: [
    { value: "Q1", label: "Quận 1" },
    { value: "Q3", label: "Quận 3" },
    { value: "Q5", label: "Quận 5" },
    { value: "TB", label: "Tân Bình" },
  ],
  DN: [
    { value: "HC", label: "Hải Châu" },
    { value: "TK", label: "Thanh Khê" },
    { value: "LC", label: "Liên Chiểu" },
  ],
};

const WARDS: Record<DistrictKey, { value: string; label: string }[]> = {
  BTL: [
    { value: "XD", label: "Xuân Đỉnh" },
    { value: "TP", label: "Thụy Phương" },
    { value: "CD", label: "Cổ Nhuế" },
  ],
  NTL: [
    { value: "MP", label: "Mỹ Đình" },
    { value: "TD", label: "Tây Mỗ" },
    { value: "PD", label: "Phú Đô" },
  ],
  CG: [{ value: "DG", label: "Dịch Vọng" }],
  HK: [{ value: "HL", label: "Hàng Lược" }],
  Q1: [{ value: "BN", label: "Bến Nghé" }],
  Q3: [{ value: "1", label: "Phường 1" }],
  Q5: [{ value: "2", label: "Phường 2" }],
  TB: [{ value: "3", label: "Phường 3" }],
  HC: [{ value: "TT", label: "Thanh Thuận" }],
  TK: [{ value: "XH", label: "Xuân Hà" }],
  LC: [{ value: "HM", label: "Hòa Minh" }],
};

export default function SettingPage() {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceKey | "">(
    ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictKey | "">(
    ""
  );
  const [selectedWard, setSelectedWard] = useState("");
  const [address, setAddress] = useState("");

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value as ProvinceKey);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value as DistrictKey);
    setSelectedWard("");
  };

  return (
    <div className="flex flex-col px-[40px] py-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[22px] font-light select-none">
            Thông tin cá nhân
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
      <div className="flex flex-col mt-[40px] gap-y-[20px]">
        <NormalInput
          label="Địa chỉ"
          placeholder="123 nguyễn tri phương"
          icon={<FaAddressCard size={20} />}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Select
          label="Thành phố"
          placeholder="Chọn thành phố"
          icon={<FaCity size={20} />}
          options={PROVINCES}
          value={selectedProvince}
          onChange={handleProvinceChange}
        />
        <Select
          label="Quận"
          placeholder="Chọn quận"
          icon={<FaAddressCard size={20} />}
          options={selectedProvince ? DISTRICTS[selectedProvince] : []}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedProvince}
        />
        <Select
          label="Phường"
          placeholder="Chọn phường"
          icon={<FaAddressCard size={20} />}
          options={selectedDistrict ? WARDS[selectedDistrict] : []}
          value={selectedWard}
          onChange={(value) => setSelectedWard(value)}
          disabled={!selectedDistrict}
        />
      </div>
    </div>
  );
}
