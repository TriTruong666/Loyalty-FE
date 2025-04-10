"use client";

import { Button, Input } from "@heroui/react";
import { IoIosSearch, IoMdAdd } from "react-icons/io";

import { AnimatePresence, motion } from "framer-motion";
import { SalesCustomer as SalesCustomerProps } from "../interfaces/SalesCustomer";
import { ChangeEvent, useState } from "react";
import { useSearchSalesCustomerService } from "../hooks/hook";
import loadingAnimation1 from "@/app/static/loading/loading3.json";
import dynamic from "next/dynamic";
import { useAtomValue, useSetAtom } from "jotai";
import { showToast } from "../utils/toast";
import { userInfoState } from "../store/accountAtoms";
import { salesCustomerState } from "../store/checkoutAtoms";
import { searchSalesCustomerDropdownState } from "../store/dropdownAtoms";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function SearchSalesCustomerDropdown() {
  const info = useAtomValue(userInfoState);
  const isToggleDropdown = useAtomValue(searchSalesCustomerDropdownState);
  const [keyword, setKeyword] = useState<string>("");
  const { data: accounts, isLoading } = useSearchSalesCustomerService(
    keyword,
    info?.teamID as string
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  return (
    <AnimatePresence>
      {isToggleDropdown && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, translateX: 100 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, display: "none", translateX: 100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed flex flex-col w-[300px] bg-background left-[48%] top-[105px] border border-gray-400-40 z-[20] font-open"
        >
          {/* search */}
          <div className="w-full">
            <Input
              isClearable
              onClear={() => setKeyword("")}
              onChange={handleOnChange}
              label="Tìm kiếm"
              placeholder="Nhập tên khách bạn muốn tìm..."
              radius="none"
              className="text-sm"
              startContent={<IoIosSearch className="text-[20px]" />}
            />
          </div>
          {/* list */}
          {isLoading ? (
            <>
              <div className="h-[400px] flex justify-center items-center">
                <DynamicLottie
                  animationData={loadingAnimation1}
                  loop={true}
                  className="w-[150px] h-[150px]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col max-h-[400px] overflow-auto">
                {accounts?.map((item) => (
                  <AccountItem
                    key={item.customerIDOfSales}
                    {...item}
                    isDebt={item.status === true}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface AccountItemProps extends SalesCustomerProps {
  isDebt?: boolean;
}

function AccountItem({ isDebt = false, ...props }: AccountItemProps) {
  const setSubmitData = useSetAtom(salesCustomerState);
  const handleAddCustomer = (customerId: string) => {
    setSubmitData(customerId);
    showToast(`Bạn đã chọn khách ${props.userName}`, "success");
  };

  return (
    <div className="flex justify-between items-center px-[10px] py-[10px]">
      <div className="flex flex-col">
        <p className="text-[12px] line-clamp-3">
          {props.userName} {isDebt && "(Đang nợ)"}
        </p>
        <p className="text-[12px] text-primary">{props.phoneNumber}</p>
      </div>
      {!isDebt && (
        <Button
          variant="flat"
          isIconOnly
          radius="full"
          size="sm"
          onPress={() => handleAddCustomer(props.customerIDOfSales)}
        >
          <IoMdAdd className="text-[16px]" />
        </Button>
      )}
    </div>
  );
}
