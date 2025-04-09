import { FaUserTie } from "react-icons/fa";
import NormalInput from "./NormalInput";
import { MdLocalPhone } from "react-icons/md";
import { useAtom } from "jotai";
import { addSalesAccountModalState } from "../store/modalAtoms";
import { Button, Select, SelectItem } from "@heroui/react";
import { useGetAllUser } from "../hooks/hook";
import { dataCreateSalesAccountState } from "../store/accountAtoms";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSalesCustomer } from "../service/accountService";
import { showToast } from "../utils/toast";
import { RiBuilding2Fill } from "react-icons/ri";

export default function AddSalesAccountModal() {
  const [submitData, setSubmitData] = useAtom(dataCreateSalesAccountState);
  const [isSubmit, setIsSubmit] = useState(false);
  const { data: allSales } = useGetAllUser();
  const filteredAccounts =
    allSales?.filter((user) => user.type === "sales") ?? [];
  const [isToggleModal, setIsToggleModal] = useAtom(addSalesAccountModalState);
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["create-sales-customer"],
    mutationFn: createSalesCustomer,
    onMutate() {
      setIsSubmit(true);
    },
    onSuccess(data) {
      if (data.message === "Ok") {
        queryClient.invalidateQueries({
          queryKey: ["sales-customers"],
        });
        setIsToggleModal(false);
        setSubmitData({
          phoneNumber: "",
          salePersonID: "",
          mst: "",
          userName: "",
        });
        setIsSubmit(false);
        showToast("Tạo tài khoản thành công", "success");
      }
      setIsSubmit(false);
    },
  });
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleOnSelect = (saleId: string) => {
    setSubmitData({
      ...submitData,
      salePersonID: saleId,
    });
  };
  const vietnamPhoneRegex =
    /^(?:\+84|0)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])\d{7}$/;
  const handleOnSubmit = async () => {
    if (
      submitData.phoneNumber === "" ||
      submitData.salePersonID === "" ||
      submitData.userName === "" ||
      submitData.mst === ""
    ) {
      showToast("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }
    if (!vietnamPhoneRegex.test(submitData.phoneNumber)) {
      showToast("Số điện thoại không hợp lệ", "error");
      return;
    }
    try {
      await createMutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleModalOff = () => {
    setIsToggleModal(false);
  };
  if (!isToggleModal) {
    return <></>;
  }
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
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[700px] bg-black flex flex-col transition-all duration-300 items-center relative py-[40px] px-[40px] rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)]">
        <div className="flex flex-col justify-center items-center gap-y-3 w-full">
          <p className="text-[28px] font-bold font-inter">
            Nhập thông tin đăng ký
          </p>
          <p className="text-[12px] text-normal">
            Vui lòng điền đủ thông tin vào các trường dưới đây để tạo tài khoản.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <NormalInput
              name="userName"
              label="Tên khách hàng"
              placeholder="Nguyễn Văn A"
              onChange={handleOnChange}
              icon={<FaUserTie size={20} />}
            />
            <NormalInput
              name="phoneNumber"
              label="Số điện thoại"
              placeholder="0921191360"
              onChange={handleOnChange}
              icon={<MdLocalPhone size={20} />}
              max={10}
            />
            <NormalInput
              onChange={handleOnChange}
              name="mst"
              label="Mã số thuế"
              placeholder="1801783273"
              max={10}
              icon={<RiBuilding2Fill size={20} />}
            />
          </div>

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
          <div className="flex items-center w-full mt-[20px] gap-x-4">
            <Button
              className="w-full"
              variant="flat"
              color="default"
              size="lg"
              onPress={handleToggleModalOff}
            >
              <p className="font-bold">Thoát</p>
            </Button>
            <Button
              onPress={handleOnSubmit}
              isLoading={isSubmit}
              isDisabled={isSubmit}
              className="w-full"
              variant="flat"
              color="secondary"
              size="lg"
            >
              <p className="text-secondary font-bold">Tạo tài khoản</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
