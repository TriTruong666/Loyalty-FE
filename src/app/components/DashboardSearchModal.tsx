"use client";

import { IoIosSearch } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  dashboardSearchModalState,
  productDetailModalState,
} from "../store/modalAtoms";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useGetAllBrand,
  useGetProductByBrand,
  useSearchProductByKeyword,
} from "../hooks/hook";
import { Product as ProductProps } from "@/app/interfaces/Product";
import { Brand as BrandProps } from "../interfaces/Brand";
import { Button } from "@heroui/react";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { formatPrice } from "../utils/format";
import Link from "next/link";
import { productDetailState } from "../store/productAtoms";
import { userInfoState } from "../store/accountAtoms";
export default function DashboardSearchModal() {
  const info = useAtomValue(userInfoState);
  const [isToggleModal, setIsToggleModal] = useAtom(dashboardSearchModalState);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsToggleModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsToggleModal]);

  return (
    <AnimatePresence>
      {isToggleModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-90"
        >
          <div className="w-[700px] bg-black flex flex-col transition-all duration-300 relative rounded-[15px] shadow-[2px_2px_60px_6px_rgba(19,_19,_19,_0.63)] border border-neutral-700 border-opacity-50">
            {info?.type === "business" && <UserSearch />}
            {info?.type === "personal" && <UserSearch />}
            {info?.type === "sales" && <UserSearch />}
            {info?.type === "ceo" && <AdminSearch />}
            {info?.type === "admin" && <AdminSearch />}
            {info?.type === "staff" && <AdminSearch />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function UserSearch() {
  const [search, setSearch] = useState("");
  const { data: searchProducts } = useSearchProductByKeyword(search);
  const { data: brands = [] } = useGetAllBrand();
  const [handle, setHandle] = useState("dr-ciccarelli");
  const { data: products } = useGetProductByBrand(
    handle as string,
    "dangban",
    ""
  );
  const displayedProducts = products?.slice(0, 12);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleClearSearchInput = () => {
    setSearch("");
  };
  return (
    <div className="flex flex-col font-open">
      {/* Search */}
      <div className="flex items-center justify-between px-[20px] py-[15px]">
        <div className="flex justify-between items-center gap-x-[10px] w-full pr-[10px]">
          <IoIosSearch className="text-[24px]" />
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            className="outline-none bg-transparent border-none w-full text-[16px] font-light"
            placeholder="Tìm kiếm sản phẩm"
          />
          {search.length > 0 && (
            <Button
              isIconOnly
              size="sm"
              radius="full"
              variant="flat"
              onPress={handleClearSearchInput}
            >
              <IoCloseOutline className="text-[22px]" />
            </Button>
          )}
        </div>
        {/* badge */}
        <span className="px-[8px] py-[4px] rounded-[7px] bg-neutral-700 text-[10px]">
          ESC
        </span>
      </div>
      {/* Brand & Product */}
      {search.length > 0 ? (
        <>
          <div className="flex flex-col px-[20px] py-[15px]">
            <p className="text-[12px]">Từ khoá: {search}</p>
            {searchProducts?.length === 0 && (
              <>
                <div className="h-[400px] overflow-auto gap-y-[10px] py-[20px] flex flex-col items-center justify-center">
                  <IoIosSearch className="text-[40px]" />
                  <p>Không tìm thấy sản phẩm nào với từ khoá: {search}</p>
                </div>
              </>
            )}
            <div className="flex flex-col max-h-[400px] overflow-auto gap-y-[10px] py-[20px]">
              {searchProducts?.map((product) => (
                <UserSearchProductItem key={product.productId} {...product} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex border-t border-neutral-700 border-opacity-50 max-h-[400px] overflow-auto">
            {/* Brand */}
            <div className="flex flex-col w-[30%] border-r border-neutral-700 border-opacity-50 px-[20px] py-[15px]">
              <p className="text-[12px]">Nhãn hàng độc quyền</p>
              <div className="flex flex-col mt-[15px] gap-y-[10px]">
                {brands.map((brand) => (
                  <BrandItem
                    key={brand.brandId}
                    {...brand}
                    isActive={handle === brand.handle}
                    onClick={() => setHandle(brand.handle)}
                  />
                ))}
              </div>
            </div>
            {/* Products */}
            <div className="flex flex-col px-[20px] py-[15px] w-[70%] max-h-[400px] overflow-auto">
              <p className="text-[12px]">Gợi ý</p>
              <div className="grid grid-cols-4 gap-[15px] mt-[15px]">
                {displayedProducts?.map((item) => (
                  <UserProductItem key={item.productId} {...item} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AdminSearch() {
  const setIsToggleModal = useSetAtom(dashboardSearchModalState);
  const setDetailModal = useSetAtom(productDetailModalState);
  const setDetailModalHandle = useSetAtom(productDetailState);
  const [search, setSearch] = useState("");
  const { data: searchProducts } = useSearchProductByKeyword(search);
  const { data: brands = [] } = useGetAllBrand();
  const [handle, setHandle] = useState("dr-ciccarelli");
  const { data: products } = useGetProductByBrand(
    handle as string,
    "dangban",
    ""
  );
  const displayedProducts = products?.slice(0, 12);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleToggleDetailModal = (handle: string) => {
    setDetailModalHandle(handle);
    setIsToggleModal(false);
    setTimeout(() => {
      setDetailModal(true);
    }, 600);
  };
  const handleClearSearchInput = () => {
    setSearch("");
  };
  return (
    <div className="flex flex-col font-open">
      {/* Search */}
      <div className="flex items-center justify-between px-[20px] py-[15px]">
        <div className="flex justify-between items-center gap-x-[10px] w-full pr-[10px]">
          <IoIosSearch className="text-[24px]" />
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            className="outline-none bg-transparent border-none w-full text-[16px] font-light"
            placeholder="Tìm kiếm sản phẩm"
          />
          {search.length > 0 && (
            <Button
              isIconOnly
              size="sm"
              radius="full"
              variant="flat"
              onPress={handleClearSearchInput}
            >
              <IoCloseOutline className="text-[22px]" />
            </Button>
          )}
        </div>
        {/* badge */}
        <span className="px-[8px] py-[4px] rounded-[7px] bg-neutral-700 text-[10px]">
          ESC
        </span>
      </div>
      {/* Brand & Product */}
      {search.length > 0 ? (
        <>
          <div className="flex flex-col px-[20px] py-[15px]">
            <p className="text-[12px]">Từ khoá: {search}</p>
            {searchProducts?.length === 0 && (
              <>
                <div className="h-[400px] overflow-auto gap-y-[10px] py-[20px] flex flex-col items-center justify-center">
                  <IoIosSearch className="text-[40px]" />
                  <p>Không tìm thấy sản phẩm nào với từ khoá: {search}</p>
                </div>
              </>
            )}
            <div className="flex flex-col max-h-[400px] overflow-auto gap-y-[10px] py-[20px]">
              {searchProducts?.map((product) => (
                <AdminSearchProductItem
                  key={product.productId}
                  {...product}
                  onClick={() =>
                    handleToggleDetailModal(product.handle as string)
                  }
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex border-t border-neutral-700 border-opacity-50 max-h-[400px] overflow-auto">
            {/* Brand */}
            <div className="flex flex-col w-[30%] border-r border-neutral-700 border-opacity-50 px-[20px] py-[15px]">
              <p className="text-[12px]">Nhãn hàng độc quyền</p>
              <div className="flex flex-col mt-[15px] gap-y-[10px]">
                {brands.map((brand) => (
                  <BrandItem
                    key={brand.brandId}
                    {...brand}
                    isActive={handle === brand.handle}
                    onClick={() => setHandle(brand.handle)}
                  />
                ))}
              </div>
            </div>
            {/* Products */}
            <div className="flex flex-col px-[20px] py-[15px] w-[70%] max-h-[400px] overflow-auto">
              <p className="text-[12px]">Gợi ý</p>
              <div className="grid grid-cols-4 gap-[15px] mt-[15px]">
                {displayedProducts?.map((item) => (
                  <AdminProductItem
                    key={item.productId}
                    {...item}
                    onClick={() =>
                      handleToggleDetailModal(item.handle as string)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function BrandItem(
  props: BrandProps & { isActive: boolean; onClick: () => void }
) {
  return (
    <div
      onClick={props.onClick}
      className={`flex py-[12px] px-[15px] rounded-xl cursor-pointer group transition-all duration-300 
        ${
          props.isActive
            ? "bg-neutral-700 bg-opacity-80"
            : "bg-neutral-700 bg-opacity-30 hover:bg-neutral-700 hover:bg-opacity-70"
        }
      `}
    >
      <p
        className={`text-sm  group-hover:text-foreground transition-all duration-300 ${
          props.isActive ? "text-primary" : "text-normal"
        }`}
      >
        {props.brandName}
      </p>
    </div>
  );
}

function UserProductItem(props: ProductProps) {
  const setModal = useSetAtom(dashboardSearchModalState);
  return (
    <div className="flex flex-col justify-center w-full gap-y-[5px]">
      <Link
        href={`/dashboard/shop/brand/detail/${props.handle}`}
        onClick={() => setModal(false)}
      >
        <Image
          alt={props.productName || ""}
          src={props.imageUrl || ""}
          width={100}
          height={100}
          className="object-cover rounded-lg"
          loading="lazy"
        />
      </Link>

      <p className="text-normal text-[12px] text-center">
        {formatPrice(props.price as number)}
      </p>
    </div>
  );
}

function AdminProductItem(props: ProductProps & { onClick: () => void }) {
  return (
    <div className="flex flex-col justify-center w-full gap-y-[5px]">
      <div onClick={props.onClick} className="cursor-pointer">
        <Image
          alt={props.productName || ""}
          src={props.imageUrl || ""}
          width={100}
          height={100}
          className="object-cover rounded-lg"
          loading="lazy"
        />
      </div>

      <p className="text-normal text-[12px] text-center">
        {formatPrice(props.price as number)}
      </p>
    </div>
  );
}

function UserSearchProductItem(props: ProductProps) {
  return (
    <Link
      href={`/dashboard/shop/brand/detail/${props.handle}`}
      className="flex justify-between px-[15px] py-[10px] items-center hover:bg-neutral-700 hover:bg-opacity-30 rounded-lg transition-all duration-300"
    >
      <div className="flex items-center gap-x-[10px]">
        <Image
          alt={props.productName || ""}
          src={props.imageUrl || ""}
          width={60}
          height={60}
          className="object-cover rounded-lg"
          loading="lazy"
        />
        <div className="flex flex-col">
          <p className="text-[13px] font-light">{props.productName}</p>
          <p className="text-[14px] font-semibold">
            {formatPrice(props.price as number)}
          </p>
        </div>
      </div>
    </Link>
  );
}

function AdminSearchProductItem(
  props: ProductProps & { onClick?: () => void }
) {
  return (
    <div
      onClick={props.onClick}
      className="flex justify-between px-[15px] py-[10px] items-center hover:bg-neutral-700 hover:bg-opacity-30 rounded-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-x-[10px]">
        <Image
          alt={props.productName || ""}
          src={props.imageUrl || ""}
          width={60}
          height={60}
          className="object-cover rounded-lg"
          loading="lazy"
        />
        <div className="flex flex-col">
          <p className="text-[13px] font-light">{props.productName}</p>
          <p className="text-[14px] font-semibold">
            {formatPrice(props.price as number)}
          </p>
        </div>
      </div>
    </div>
  );
}
