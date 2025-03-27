"use client";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Pagination } from "@heroui/pagination";
import { FaInbox, FaPowerOff } from "react-icons/fa";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { showToast } from "@/app/utils/toast";
import { useAllProduct, useGetProductByLimit } from "@/app/hooks/hook";
import { formatPrice } from "@/app/utils/format";
import { useEffect, useState } from "react";
import { LoadingTable } from "@/app/components/loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductService } from "@/app/service/productService";
import { LuPackageX } from "react-icons/lu";
import { Select, SelectItem } from "@heroui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { Product } from "@/app/interfaces/Product";
import { userInfoState } from "@/app/store/accountAtoms";
import { productDetailModalState } from "@/app/store/modalAtoms";
import { productDetailState } from "@/app/store/productAtoms";

export default function ProductPage() {
  return (
    <div className="flex flex-col pb-[40px]">
      <ProductTable />
    </div>
  );
}

function ProductTable() {
  const userInfo = useAtomValue(userInfoState);
  const setDetailModal = useSetAtom(productDetailModalState);
  const setDetailModalHandle = useSetAtom(productDetailState);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sortBy, setSortBy] = useState("name-asc");

  const limit = 8;
  const { data: products, isLoading } = useGetProductByLimit(
    page,
    "hetban",
    sortBy
  );
  const { data: allProduct } = useAllProduct();
  const filteredAllProduct = allProduct?.filter(
    (product) => product.status === "hetban"
  );
  useEffect(() => {
    if (filteredAllProduct) {
      setTotalPage(Math.ceil(filteredAllProduct.length / limit));
    }
  }, [filteredAllProduct]);
  const queryClient = useQueryClient();
  const updateStatusMutation = useMutation({
    mutationKey: ["update-status"],
    mutationFn: async ({ userId, data }: { userId: string; data: any }) =>
      updateProductService(userId, data),
    onMutate() {
      setIsUpdating(true);
    },
    onSuccess() {
      setIsUpdating(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Sửa đổi trạng thái thành công", "success");
    },
  });
  const handleToggleDetailModal = (handle: string) => {
    setDetailModalHandle(handle);
    setDetailModal(true);
  };
  const statusTheme = (status: string) => {
    switch (status) {
      case "hethang":
        return "border-warning";
      case "dangban":
        return "border-success";
      case "hetban":
        return "border-red-500";
      default:
        return "";
    }
  };
  const handleChangeStatusProductToActive = async (data: Product) => {
    try {
      await updateStatusMutation.mutateAsync({
        userId: userInfo?.userId as string,
        data: {
          productId: data.productId,
          status: "dangban",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const titleStatusTheme = (status: string) => {
    switch (status) {
      case "hethang":
        return "text-warning";
      case "dangban":
        return "text-success";
      case "hetban":
        return "text-red-500";
      default:
        return "";
    }
  };

  if (isLoading || isUpdating) {
    return (
      <>
        <LoadingTable />
      </>
    );
  }
  const productSort = [
    { key: "name-asc", title: "Tên A-Z" },
    { key: "name-desc", title: "Tên Z-A" },
    { key: "price-lowest", title: "Giá thấp nhất" },
    { key: "price-highest", title: "Giá cao nhất" },
  ];
  if (products?.length === 0) {
    return (
      <>
        <div className="flex flex-col w-full justify-center items-center h-[500px] gap-y-[20px]">
          <LuPackageX className="text-[50px] text-normal " />
          <p className="text-normal">
            Không có sản phẩm nào bị dừng hoạt động.
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center px-[40px] py-[20px] mt-[10px] justify-end gap-x-4">
        <div className="w-[250px]">
          <Select
            placeholder="Sắp xếp"
            variant="underlined"
            selectedKeys={[sortBy]}
            onSelectionChange={(keys) =>
              setSortBy(Array.from(keys)[0] as string)
            }
          >
            {productSort.map((item) => (
              <SelectItem key={item.key}>{item.title}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex mt-[20px] flex-col items-center">
        <table className="flex flex-col w-full">
          <thead>
            <tr className="grid grid-cols-12 mx-[20px] px-[20px] py-4 bg-[#111111] rounded-lg">
              <th className="col-span-1 text-[12px] text-normal font-light text-start">
                ID
              </th>
              <th className="col-span-3 text-[12px] text-normal font-light text-start">
                Sản phẩm
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Nhãn hàng
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Giá
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-center">
                Trạng thái
              </th>
              <th className="col-span-2 text-[12px] text-normal font-light text-end">
                Thêm
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item) => (
              <tr
                key={item.productId}
                className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40"
              >
                <td className="col-span-1 text-[13px]">{item.productId}</td>
                <td className="col-span-3 flex items-center gap-x-2">
                  <div className="flex flex-col">
                    <p className="text-[13px] font-semibold line-clamp-2">
                      {item.productName}
                    </p>
                  </div>
                </td>
                <td className="col-span-2 text-[11px] text-center font-semibold">
                  {item.brand?.brandName}
                </td>
                <td className="col-span-2 text-[13px] text-center font-semibold">
                  {formatPrice(item?.price as number)}
                </td>
                <td className="col-span-2 flex justify-center">
                  <div
                    className={` flex justify-center px-3 gap-x-1 py-[2px] w-fit border self-center ${statusTheme(
                      item?.status as string
                    )} rounded-lg`}
                  >
                    <IoIosInformationCircleOutline
                      className={`${titleStatusTheme(item?.status as string)}`}
                    />
                    <p
                      className={`text-[11px] font-semibold font-open ${titleStatusTheme(
                        item?.status as string
                      )}`}
                    >
                      Ngừng vĩnh viễn
                    </p>
                  </div>
                </td>
                <td className="col-span-2 text-[13px] font-semibold flex justify-end">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <BsThreeDotsVertical className="text-normal text-[16px]" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onPress={() => handleChangeStatusProductToActive(item)}
                        className="group"
                        color="default"
                        startContent={
                          <FaPowerOff className="text-[16px] group-hover:text-success" />
                        }
                        key="change-active"
                      >
                        <p className="group-hover:text-success">Bán lại</p>
                      </DropdownItem>
                      <DropdownItem
                        onPress={() =>
                          handleToggleDetailModal(item.handle as string)
                        }
                        className="group"
                        color="default"
                        startContent={
                          <FaInbox className="text-[16px] group-hover:text-success" />
                        }
                        key="show"
                      >
                        <p className="group-hover:text-success">Chi tiết</p>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-[20px]">
          <Pagination
            loop
            showControls
            color="default"
            initialPage={page}
            total={totalPage}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </>
  );
}
