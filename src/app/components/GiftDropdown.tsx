import { Button, Input } from "@heroui/react";
import { IoIosSearch, IoMdAdd } from "react-icons/io";
import { formatPrice } from "../utils/format";
import { AnimatePresence, motion } from "framer-motion";
import { Product as ProductProps } from "../interfaces/Product";
import { ChangeEvent, useState } from "react";
import { useSearchProductByKeyword } from "../hooks/hook";
import loadingAnimation1 from "@/app/static/loading/loading3.json";
import dynamic from "next/dynamic";
import { cartState } from "../store/cartAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { addGiftsToCart } from "../service/cartService";
import { showToast } from "../utils/toast";
import { giftDropdownState } from "../store/dropdownAtoms";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function GiftDropdown() {
  const isToggleDropdown = useAtomValue(giftDropdownState);
  const [keyword, setKeyword] = useState<string>("");
  const { data: products, isLoading } = useSearchProductByKeyword(keyword);

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
          className="fixed flex flex-col w-[300px] bg-background left-[60%] top-[105px] border border-gray-400-40 z-[20] font-open"
        >
          {/* search */}
          <div className="w-full">
            <Input
              isClearable
              onClear={() => setKeyword("")}
              onChange={handleOnChange}
              label="Tìm kiếm"
              placeholder="Nhập tên sản phẩm cần tìm..."
              radius="none"
              className="text-sm"
              startContent={<IoIosSearch className="text-[20px]" />}
            />
          </div>
          {/* list */}
          {keyword === "" ? (
            <div className="flex flex-col justify-center items-center h-[400px] bg-background">
              <p className="text-sm text-normal">
                Vui lòng tìm sản phẩm để tặng.
              </p>
            </div>
          ) : isLoading ? (
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
            <div className="flex flex-col max-h-[400px] overflow-auto">
              {products?.map((item) => (
                <GiftItem key={item.productId} {...item} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GiftItem(props: ProductProps) {
  const setCart = useSetAtom(cartState);
  const handleAddGift = () => {
    addGiftsToCart(props, 1, setCart);
    showToast("Đã thêm quà tặng", "success");
  };

  return (
    <div className="flex justify-between items-center px-[10px] py-[10px]">
      <div className="flex flex-col">
        <p className="text-[12px] line-clamp-2">{props.productName}</p>
        <p className="text-[12px] text-primary">
          {formatPrice(props.price as number)}
        </p>
      </div>
      <Button
        variant="flat"
        isIconOnly
        radius="full"
        size="sm"
        onPress={handleAddGift}
      >
        <IoMdAdd className="text-[16px]" />
      </Button>
    </div>
  );
}
