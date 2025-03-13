"use client";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Pagination } from "@heroui/pagination";
import { FaEdit, FaInbox, FaPowerOff } from "react-icons/fa";
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
import { dataUpdateProductState } from "@/app/store/productAtoms";
import { Product } from "@/app/interfaces/Product";
import { updateProductModalState } from "@/app/store/modalAtoms";
import { userInfoState } from "@/app/store/accountAtoms";

export default function ProductPage() {
  return (
    <div className="flex flex-col pb-[40px]">
      <ProductTable />
    </div>
  );
}

function ProductTable() {
  const userInfo = useAtomValue(userInfoState);
  const setUpdateModal = useSetAtom(updateProductModalState);
  const setSelectedProduct = useSetAtom(dataUpdateProductState);
  const [isUpdating, setIsUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 8;
  const { data: products, isLoading } = useGetProductByLimit(page, "dangban");
  const { data: allProduct } = useAllProduct();
  const filteredAllProduct = allProduct?.filter(
    (product) => product.status === "dangban"
  );
  useEffect(() => {
    if (filteredAllProduct) {
      setTotalPage(Math.ceil(filteredAllProduct.length / limit));
    }
  }, [filteredAllProduct]);
  const queryClient = useQueryClient();
  // const deleteProductMutation = useMutation({
  //   mutationKey: ["delete-product"],
  //   mutationFn: deleteProductService,
  //   onSuccess() {
  //     showToast("Xoá thành công", "success");
  //     queryClient.invalidateQueries({ queryKey: ["products"] });
  //   },
  // });
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
      if (products?.length === 1) {
        setPage(page - 1);
      }
    },
  });
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
  // const handleDelProduct = async (productId: string) => {
  //   try {
  //     await deleteProductMutation.mutateAsync(productId);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleChangeStatusProduct = async (data: Product) => {
    try {
      await updateStatusMutation.mutateAsync({
        userId: userInfo?.userId as string,
        data: {
          productId: data.productId,
          status: "hethang",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateProduct = (data: Product) => {
    setUpdateModal(true);
    setSelectedProduct(data);
  };
  const productSort = [
    {
      key: "nameASC",
      title: "Tên A-Z",
    },
    {
      key: "nameDESC",
      title: "Tên Z-A",
    },
  ];
  if (isLoading || isUpdating) {
    return (
      <>
        <LoadingTable />
      </>
    );
  }

  if (products?.length === 0) {
    return (
      <>
        <div className="flex flex-col w-full justify-center items-center h-[500px] gap-y-[20px]">
          <LuPackageX className="text-[50px] text-normal " />
          <p className="text-normal">
            Không có sản phẩm nào trong hệ thống, vui lòng thêm sản phẩm.
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center px-[40px] py-[20px] mt-[10px] justify-end gap-x-4">
        <div className="w-[250px]">
          <Select placeholder="Sắp xếp" variant="underlined">
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
                      Đang Bán
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
                      {/* <DropdownItem
                        onPress={() =>
                          handleDelProduct(item.productId as string)
                        }
                        className="group"
                        color="default"
                        startContent={
                          <FaEdit className="text-[16px] group-hover:text-danger" />
                        }
                        key="delete"
                      >
                        <p className="group-hover:text-danger">
                          Xoá (for test)
                        </p>
                      </DropdownItem> */}
                      <DropdownItem
                        onPress={() => handleUpdateProduct(item)}
                        className="group"
                        color="default"
                        startContent={
                          <FaEdit className="text-[16px] group-hover:text-foreground" />
                        }
                        key="update"
                      >
                        <p className="group-hover:text-foreground">Chỉnh sửa</p>
                      </DropdownItem>
                      <DropdownItem
                        onPress={() => handleChangeStatusProduct(item)}
                        className="group"
                        color="default"
                        startContent={
                          <FaPowerOff className="text-[16px] group-hover:text-warning" />
                        }
                        key="change-inactive"
                      >
                        <p className="group-hover:text-warning">Hết Hàng</p>
                      </DropdownItem>
                      <DropdownItem
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
