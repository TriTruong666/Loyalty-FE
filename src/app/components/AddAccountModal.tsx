"use client";
import { FaUserTag, FaBuilding } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { addAccountModalState } from "../store/modalAtoms";
import NormalInput from "./NormalInput";
import { FaUserTie } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";
import { Select, SelectItem } from "@heroui/select";
import { IoIosPin } from "react-icons/io";
import { Button } from "@heroui/button";
import { ChangeEvent, ReactNode, useState } from "react";
import { dataCreateAccountState } from "../store/accountAtoms";
import { showToast } from "../utils/toast";
import {
  useGetAllProvince,
  useGetDistrictByProvince,
  useGetWardByDistrict,
} from "../hooks/hook";
import { useMutation } from "@tanstack/react-query";
import { createAccountService } from "../service/accountService";
import { GrUserWorker } from "react-icons/gr";

const createAccountProgress = atom(1);
const selectedAccountType = atom("");

export default function AddAccountModal() {
  const isToggleAddAccountModal = useAtomValue(addAccountModalState);
  const accountModalProgress = useAtomValue(createAccountProgress);
  if (!isToggleAddAccountModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[700px] bg-black flex flex-col transition-all duration-300 items-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        {accountModalProgress === 1 && <ChooseAccountType />}
        {accountModalProgress === 2 && <RegistrationForm />}
        {accountModalProgress === 3 && <LocationForm />}
      </div>
    </div>
  );
}

function ChooseAccountType() {
  const [selected, setSelected] = useAtom(selectedAccountType);
  const setAddAccountModal = useSetAtom(addAccountModalState);
  const setAccountModalProgress = useSetAtom(createAccountProgress);
  const [submitData, setSubmitData] = useAtom(dataCreateAccountState);

  const handleCloseModal = () => {
    setAddAccountModal(false);
  };
  const handleGoNext = () => {
    if (selected === "") {
      showToast("Vui lòng chọn loại tài khoản bạn muốn tạo", "error");
      return;
    }
    setSubmitData({
      ...submitData,
      type: selected,
    });
    setAccountModalProgress(2);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <p className="text-[28px] font-bold font-inter">
        Hãy chọn loại tài khoản
      </p>
      <p className="text-[12px] text-normal">
        Chọn loại tài khoản mà bạn muốn tạo
      </p>
      <div className="flex flex-col items-center w-full gap-y-4 mt-4">
        <RadioButton
          icon={<FaUserTag size={24} />}
          title="Tài khoản Sales Team"
          description="Tài khoản sales dành cho các Sales Team"
          value="sales"
          selected={selected}
          onChange={setSelected}
          name="accountType"
        />
        <RadioButton
          icon={<GrUserWorker size={24} />}
          title="Tài khoản nhân viên"
          description="Tài khoản dành cho kế toán hoặc nhân viên giao hàng"
          value="staff"
          selected={selected}
          onChange={setSelected}
          name="accountType"
        />
        <RadioButton
          icon={<FaUserCheck size={24} />}
          title="Tài khoản cá nhân"
          description="Tài khoản cá nhân dành cho khách hàng nhưng chưa đến mức độ doanh nghiệp"
          value="personal"
          selected={selected}
          onChange={setSelected}
          name="accountType"
        />
        <RadioButton
          icon={<FaBuilding size={24} />}
          title="Tài khoản doanh nghiệp"
          description="Tài khoản doanh nghiệp dành cho các doanh nghiệp."
          value="business"
          selected={selected}
          onChange={setSelected}
          name="accountType"
        />
      </div>
      <div className="flex items-center w-full mt-[20px] gap-x-4">
        <Button
          className="w-full"
          variant="flat"
          color="default"
          size="lg"
          onPress={handleCloseModal}
        >
          <p className="font-bold">Quay lại</p>
        </Button>
        <Button
          className="w-full"
          variant="flat"
          color="secondary"
          size="lg"
          onPress={handleGoNext}
        >
          <p className="text-secondary font-bold">Tiếp tục</p>
        </Button>
      </div>
    </div>
  );
}

function RegistrationForm() {
  // const [value, setValue] = useState(parseDate("2024-04-04"));
  const [submitData, setSubmitData] = useAtom(dataCreateAccountState);
  const setAccountModalProgress = useSetAtom(createAccountProgress);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const vietnamPhoneRegex =
    /^(?:\+84|0)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])\d{7}$/;
  const handleGoNext = () => {
    setSubmitData({
      ...submitData,
    });
    if (
      submitData.email === "" ||
      submitData.userName === "" ||
      submitData.phoneNumber === ""
    ) {
      showToast("Vui lòng nhập đủ thông tin", "error");
      return;
    }
    if (!emailPattern.test(submitData.email)) {
      showToast("Email không hợp lệ. Vui lòng nhập đúng định dạng.", "error");
      return;
    }
    if (!vietnamPhoneRegex.test(submitData.phoneNumber)) {
      showToast("Vui lòng nhập số điện thoại hợp lệ.", "error");
      return;
    }
    setAccountModalProgress(3);
  };
  const handleGoPrev = () => {
    setSubmitData({
      ...submitData,
      type: "",
      mst: "",
    });
    setAccountModalProgress(1);
  };
  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <p className="text-[28px] font-bold font-inter">Nhập thông tin đăng ký</p>
      <p className="text-[12px] text-normal">
        Vui lòng điền đủ thông tin vào các trường dưới đây để tạo tài khoản.
      </p>
      <div className="flex flex-col gap-3 w-full">
        <NormalInput
          onChange={handleOnChange}
          name="email"
          defaultValue={submitData.email}
          label="Địa chỉ email"
          placeholder="email123@gmail.com"
          icon={<IoMail size={20} />}
        />
        <div className="flex items-center gap-x-3">
          <NormalInput
            onChange={handleOnChange}
            defaultValue={submitData.userName}
            name="userName"
            label="Tên người dùng"
            placeholder="Nguyễn Văn A"
            icon={<FaUserTie size={20} />}
          />
          <NormalInput
            onChange={handleOnChange}
            name="phoneNumber"
            defaultValue={submitData.phoneNumber}
            label="Số điện thoại"
            placeholder="0921191360"
            icon={<MdLocalPhone size={20} />}
            max={10}
          />
        </div>
        {/* mst */}
        {submitData.type === "business" && (
          <NormalInput
            onChange={handleOnChange}
            defaultValue={submitData.mst}
            name="mst"
            label="Mã số thuế"
            placeholder="1801783273"
            max={10}
            icon={<RiBuilding2Fill size={20} />}
          />
        )}
        {submitData.type === "sales" && (
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="team"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              Team Sales
            </label>
            <Select
              isVirtualized
              variant="underlined"
              placeholder="Thuộc team sales"
            >
              {animals.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
        )}
        {/* date picker */}
        {/* {(submitData.type === "business" || submitData.type === "personal") && (
          <div className="flex flex-col w-full gap-y-2 font-inter">
            <label
              htmlFor="date"
              className="font-semibold text-sm 2xl:text-[12px] mb-1"
            >
              {submitData.type === "business" ? "Sinh nhật" : "Ngày sinh"}
            </label>
            <DateInput
              label="Sinh nhật"
              value={value as any}
              onChange={setValue as any}
            />
          </div>
        )} */}
      </div>
      <div className="flex items-center w-full mt-[20px] gap-x-4">
        <Button
          className="w-full"
          variant="flat"
          color="default"
          size="lg"
          onPress={handleGoPrev}
        >
          <p className="font-bold">Quay lại</p>
        </Button>
        <Button
          className="w-full"
          variant="flat"
          color="secondary"
          size="lg"
          onPress={handleGoNext}
        >
          <p className="text-secondary font-bold">Tiếp tục</p>
        </Button>
      </div>
    </div>
  );
}

function LocationForm() {
  const setModal = useSetAtom(addAccountModalState);
  const setAccountModalProgress = useSetAtom(createAccountProgress);
  const [submitData, setSubmitData] = useAtom(dataCreateAccountState);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
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
  const createAccountMutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: createAccountService,
    onMutate() {
      setIsLoadingSubmit(true);
    },
    onSuccess(data) {
      if (data.code === "THE_EMAIL_IS_ALREADY_BOUND_TO_AN_ACCOUNT") {
        showToast(
          "Email này đã tồn tại trong hệ thống vui lòng thử lại.",
          "error"
        );
        setIsLoadingSubmit(false);
        return;
      }
      if (data.code === "THE_PHONE_NUMBER_IS_ALREADY_BOUND_TO_AN_ACCOUNT") {
        showToast("Số điện thoại này đã tồn tại trong hệ thống.", "error");
        setIsLoadingSubmit(false);
        return;
      }
      if (data.message === "Ok") {
        setModal(false);
        setAccountModalProgress(1);
        setSubmitData({
          userName: "",
          email: "",
          phoneNumber: "",

          address: {
            provinceCode: "",
            districtCode: "",
            wardCode: "",
            street: "",
          },
          mst: "",
          type: "",
        });
        showToast("Tạo tài khoản thành công, trạng thái: CHỜ DUYỆT", "success");
        setIsLoadingSubmit(false);
      }
    },
  });

  const handleSubmit = async () => {
    if (submitData.address.street === "") {
      showToast("Vui lòng nhập địa chỉ số nhà", "error");
      return;
    }

    try {
      await createAccountMutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleGoPrev = () => {
    setAccountModalProgress(2);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <p className="text-[28px] font-bold font-inter">Địa chỉ khách hàng</p>
      <p className="text-[12px] text-normal">
        Vui lòng nhập địa chỉ khách hàng để giao hàng
      </p>
      <div className="flex flex-col w-full gap-y-2 font-inter">
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
            <SelectItem key={ward.code}>{ward.fullName}</SelectItem>
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
      <div className="flex items-center w-full mt-[20px] gap-x-4">
        <Button
          className="w-full"
          variant="flat"
          color="default"
          size="lg"
          onPress={handleGoPrev}
        >
          <p className="font-bold">Quay lại</p>
        </Button>
        <Button
          className="w-full"
          variant="flat"
          color="secondary"
          size="lg"
          isDisabled={isLoadingSubmit}
          isLoading={isLoadingSubmit}
          onPress={handleSubmit}
        >
          <p className="text-secondary font-bold">Tạo tài khoản</p>
        </Button>
      </div>
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

const RadioButton: React.FC<RadioButtonProps> = ({
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
      className={`flex items-center w-full p-4 border rounded-lg cursor-pointer transition-all ${
        selected === value
          ? "border-white bg-gray-600 bg-opacity-10"
          : "border-gray-400-40"
      }`}
      onClick={() => onChange(value)}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <div className="mr-4 text-primary">{icon}</div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </label>
  );
};
