"use client";
import { Pagination } from "@heroui/pagination";
import { FaXmark } from "react-icons/fa6";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@heroui/react";
import { formatDate } from "@/app/utils/format";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as CloudinaryService from "@/app/service/cloudinaryService";
import { useEffect, useState } from "react";
import { Signature } from "@/app/interfaces/Cloudinary";
import { showToast } from "@/app/utils/toast";
import { useGetAllAssetByLimit, useGetAllAssets } from "@/app/hooks/hook";
import { LoadingTable } from "@/app/components/loading";
import { TbMoodEmpty } from "react-icons/tb";
export default function MediaPage() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center px-[40px] py-[20px] mt-[10px] justify-end gap-x-4">
        <div className="w-[250px]">
          {/* <ThemeProvider value={selectTheme}>
            <Select
              label="Sắp xếp"
              variant="standard"
              className="font-inter font-semibold"
            >
              <Option>Tên khách hàng (A → Z)</Option>
              <Option>Tên khách hàng (Z → A)</Option>
            </Select>
          </ThemeProvider> */}
        </div>
        <div className="w-[250px]">
          {/* <ThemeProvider value={selectTheme}>
            <Select
              label="Bộ lọc"
              variant="standard"
              className="font-inter font-semibold"
            >
              <Option>Bởi trạng thái</Option>
              <Option>Bởi ID (Tăng dần)</Option>
              <Option>Bởi ID (Giảm dần)</Option>
            </Select>
          </ThemeProvider> */}
        </div>
      </div>
      <MediaTable />
    </div>
  );
}

function MediaTable() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const limit = 10;
  const [submitSign, setSubmitSign] = useState<Signature>({
    apiSecret: process.env.NEXT_PUBLIC_SECRET_API as string,
    publicID: "",
  });
  const { data: allAssets } = useGetAllAssets();
  const { data: assets, isLoading } = useGetAllAssetByLimit(page);
  useEffect(() => {
    if (allAssets) {
      setTotalPage(Math.ceil(allAssets.length / limit));
    }
  }, [allAssets]);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["deleteFile"],
    mutationFn: CloudinaryService.deleteFileService,
    onMutate() {
      setIsDeleting(true);
    },
    onSuccess() {
      setIsDeleting(false);
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      showToast("Xoá ảnh thành công", "success");
    },
  });
  const signMutation = useMutation({
    mutationKey: ["signature"],
    mutationFn: CloudinaryService.createSignatureService,
  });
  const handleDeleteFile = async (id: string) => {
    const newSign = { ...submitSign, publicID: id };

    try {
      const signatureResponse = await signMutation.mutateAsync(newSign);

      if (signatureResponse) {
        await deleteMutation.mutateAsync({
          signature: signatureResponse.signature,
          public_id: id,
          api_key: process.env.NEXT_PUBLIC_API_KEY as string,
          timestamp: signatureResponse.timeStamp,
        });
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  if (isLoading || isDeleting) {
    return (
      <>
        <LoadingTable />
      </>
    );
  }
  if (assets?.length === 0) {
    return (
      <>
        <div className="flex flex-col w-full justify-center items-center h-[400px] gap-y-[20px]">
          <TbMoodEmpty className="text-[50px] text-normal " />
          <p className="text-normal">
            Không có ảnh nào được lưu, vui lòng thử lại.
          </p>
        </div>
      </>
    );
  }
  return (
    <div className="flex mt-[20px] flex-col items-center">
      <table className="flex flex-col w-full">
        <thead>
          <tr className="grid grid-cols-12 mx-[20px] px-[20px] py-4 bg-[#111111] rounded-lg">
            <th className="col-span-1 text-[12px] text-normal font-light text-start">
              ID
            </th>
            <th className="col-span-3 text-[12px] text-normal font-light text-start">
              Tên ảnh
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-center">
              Ngày tạo
            </th>
            <th className="col-span-4 text-[12px] text-normal font-light text-center">
              URL
            </th>
            <th className="col-span-2 text-[12px] text-normal font-light text-end">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody>
          {assets?.map((item, i) => (
            <tr
              key={item.public_id}
              className="grid grid-cols-12 mx-[20px] px-[20px] py-4 items-center border-b border-gray-600 border-opacity-40"
            >
              <td className="col-span-1 text-[13px]">{i + 1}</td>
              <td className="col-span-3 flex items-center gap-x-2">
                <p className="text-[13px] font-semibold">{item.display_name}</p>
              </td>
              <td className="col-span-2 text-[13px] text-center font-semibold">
                {formatDate(item.created_at)}
              </td>
              <td className="col-span-4 text-[13px] text-center font-semibold w-fit">
                <Link
                  isExternal
                  showAnchorIcon
                  size="sm"
                  href={item.url}
                  className=""
                >
                  <p className="text-[13px] line-clamp-1 max-w-[80%]">
                    {item.url}
                  </p>
                </Link>
              </td>
              <td className="flex gap-3 justify-end col-span-2 text-[13px] font-semibold text-end">
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <BsThreeDotsVertical className="text-normal text-[16px]" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      onPress={() => handleDeleteFile(item.public_id)}
                      className="group"
                      color="default"
                      startContent={
                        <FaXmark className="text-[16px] group-hover:text-danger" />
                      }
                      key="approve"
                    >
                      <p className="group-hover:text-danger">Xoá ảnh này</p>
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
  );
}
