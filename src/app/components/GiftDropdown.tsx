import { Button, Input } from "@heroui/react";
import { IoIosSearch, IoMdAdd } from "react-icons/io";
import { formatPrice } from "../utils/format";
import { AnimatePresence, motion } from "framer-motion";
import { CartItem as CartItemProps } from "../interfaces/Cart";
export default function GiftDropdown() {
  return (
    <AnimatePresence>
      <motion.div
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
            label="Tìm kiếm"
            placeholder="Nhập tên sản phẩm cần tìm..."
            radius="none"
            className="text-sm"
            startContent={<IoIosSearch className="text-[20px]" />}
          />
        </div>
        {/* list */}
        {/* <div className="flex flex-col justify-center items-center h-[400px] bg-background">
        <p className="text-sm text-normal">Vui lòng tìm sản phẩm để tặng.</p>
      </div> */}
        <div className="flex flex-col max-h-[400px] overflow-auto">
          {/* <GiftItem /> */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// function GiftItem(props: CartItemProps) {
//   return (
//     <div className="flex justify-between items-center px-[10px] py-[10px]">
//       <div className="flex flex-col">
//         <p className="text-[12px] line-clamp-2">{props.gifts?.productName}</p>
//         <p className="text-[12px] text-primary">
//           {formatPrice(props.gifts?.price as number)}
//         </p>
//       </div>
//       <Button variant="flat" isIconOnly radius="full" size="sm">
//         <IoMdAdd className="text-[16px]" />
//       </Button>
//     </div>
//   );
// }
