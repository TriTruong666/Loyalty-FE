"use client";
import { FaUserTag, FaBuilding } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { addAccountModalState } from "../store/modalAtoms";
import NormalInput from "./NormalInput";
import { FaUserTie } from "react-icons/fa";
import { DatePicker } from "@heroui/date-picker";
import { IoMail } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";
import { Select, SelectItem } from "@heroui/select";
import { IoIosPin } from "react-icons/io";
import { Button } from "@heroui/button";
import { GrUserWorker } from "react-icons/gr";
import { ReactNode } from "react";

const createAccountProgress = atom(1);
const selectedAccountType = atom("");

export default function AddAccountModal() {
  const isToggleAddAccountModal = useAtomValue(addAccountModalState);
  const accountModalProgress = useAtomValue(createAccountProgress);
  if (!isToggleAddAccountModal) {
    return <></>;
  }
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-[2px] bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
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
  const handleCloseModal = () => {
    setAddAccountModal(false);
  };
  const handleGoNext = () => {
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
          title="Tài khoản Sales"
          description="Tài khoản sales dành cho nhân viên bán hàng."
          value="sales"
          selected={selected}
          onChange={setSelected}
          name="accountType"
        />
        <RadioButton
          icon={<GrUserWorker size={24} />}
          title="Tài khoản nhân viên"
          description="Tài khoản nhân viên quản lý đơn hàng"
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
  const setAccountModalProgress = useSetAtom(createAccountProgress);
  const handleGoNext = () => {
    setAccountModalProgress(3);
  };
  const handleGoPrev = () => {
    setAccountModalProgress(1);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <p className="text-[28px] font-bold font-inter">Nhập thông tin đăng ký</p>
      <p className="text-[12px] text-normal">
        Vui lòng điền đủ thông tin vào các trường dưới đây để tạo tài khoản.
      </p>
      <div className="flex flex-col gap-3 w-full">
        <NormalInput
          label="Địa chỉ email"
          placeholder="email123@gmail.com"
          icon={<IoMail size={20} />}
        />
        <div className="flex items-center gap-x-3">
          <NormalInput
            label="Tên khách hàng"
            placeholder="Nguyễn Văn A"
            icon={<FaUserTie size={20} />}
          />
          <NormalInput
            label="Số điện thoại"
            placeholder="0776003669"
            icon={<MdLocalPhone size={20} />}
            max={10}
          />
        </div>
        {/* mst */}
        <NormalInput
          label="Mã số thuế"
          placeholder="2803148208"
          icon={<RiBuilding2Fill size={20} />}
        />
        {/* date picker */}
        <div className="flex flex-col w-full gap-y-2 font-inter">
          <label
            htmlFor="date"
            className="font-semibold text-sm 2xl:text-[12px] mb-1"
          >
            Ngày sinh
          </label>
          <DatePicker variant="underlined" />
        </div>
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
  const setAccountModalProgress = useSetAtom(createAccountProgress);
  const handleGoNext = () => {
    setAccountModalProgress(3);
  };
  const handleGoPrev = () => {
    setAccountModalProgress(2);
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
          isVirtualized
          variant="underlined"
          placeholder="Tỉnh / Thành phố"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
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
          isDisabled
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
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
          isDisabled
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
      </div>
      <NormalInput
        label="Địa chỉ giao hàng"
        placeholder="2/35 Chấn Hưng"
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
          onPress={handleGoNext}
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
