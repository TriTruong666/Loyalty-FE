"use client";
import { Button, ButtonGroup } from "@heroui/button";
import { GrFormPreviousLink } from "react-icons/gr";
import { RiLayoutGrid2Line } from "react-icons/ri";
import { TfiLayoutGrid4 } from "react-icons/tfi";
import Image from "next/image";
import { formatPrice } from "@/app/utils/format";
import { atom, useAtom, useAtomValue } from "jotai";
import { Link as HeroLink } from "@heroui/link";
import Link from "next/link";
import { FC, useState } from "react";
import { Product as ProductProps } from "@/app/interfaces/Product";
import { useGetProductByLimit } from "@/app/hooks/hook";
const layoutState = atom("layout1");
export default function BrandProductShopPage() {
  return (
    <div className="flex flex-col font-open py-[20px] h-full overflow-auto">
      <div className="flex items-center justify-between px-[40px]">
        <div className="flex flex-col gap-y-1">
          <p className="text-[28px] font-light select-none">La Roche Posay</p>
          <p className="text-sm text-normal">
            Các sản phẩm đến từ nhà{" "}
            <span className="font-bold text-primary">La Roche Posay</span>
          </p>
        </div>
        <HeroLink href="/dashboard/shop" className="flex items-center gap-x-2">
          <GrFormPreviousLink className="text-[18px] text-normal" />
          <p className="text-sm text-normal">Xem nhãn hàng khác</p>
        </HeroLink>
      </div>
      <div className="flex-1">
        <ProductSection />
      </div>
    </div>
  );
}

function ProductSection() {
  const [layout, setLayout] = useAtom(layoutState);
  const [page, setPage] = useState(1);
  const { data: products, isLoading } = useGetProductByLimit(page, "dangban");
  const handleChangeLayout = (layout: string) => {
    setLayout(layout);
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center px-[40px] py-[20px] mt-[10px] justify-between">
        <div className="flex">
          <ButtonGroup>
            <Button
              onPress={() => handleChangeLayout("layout1")}
              variant={layout === "layout1" ? "bordered" : "shadow"}
            >
              <RiLayoutGrid2Line className="text-[20px]" />
            </Button>
            <Button
              onPress={() => handleChangeLayout("layout2")}
              variant={layout === "layout2" ? "bordered" : "shadow"}
            >
              <TfiLayoutGrid4 className="text-[20px]" />
            </Button>
          </ButtonGroup>
        </div>
        <div className="flex gap-x-4">
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
      </div>
      <div
        className={`grid ${layout === "layout1" && "grid-cols-3 gap-[70px]"} ${
          layout === "layout2" && "grid-cols-4 gap-[50px]"
        }  px-[40px] mt-[40px]`}
      >
        {products?.map((item) => (
          <ProductItem key={item.productId} product={item} />
        ))}
      </div>
    </div>
  );
}

const ProductItem: FC<{ product: ProductProps }> = ({ product }) => {
  const layout = useAtomValue(layoutState);

  return (
    <div className="flex flex-col gap-y-[10px]">
      <Image
        loading="lazy"
        alt={product.productName || "Product Image"}
        src={product.imageUrl || "/placeholder.jpg"}
        width={316}
        height={316}
        className="w-full h-auto object-cover rounded-[20px]"
      />

      <p className="text-[12px] text-normal mt-2">
        {product.brand?.brandName || "Unknown Brand"}
      </p>

      <Link
        href={`/dashboard/shop/brand/detail/${product.handle}`}
        className={`font-semibold text-foreground duration-300 transition-all hover:text-primary line-clamp-2 ${
          layout === "layout2" && "text-sm"
        }`}
      >
        {product.productName}
      </Link>

      <div className="flex mt-[10px] items-center justify-between">
        <p
          className={`text-primary font-semibold text-[18px] ${
            layout === "layout2" && "!text-[16px]"
          }`}
        >
          {formatPrice(product.price || 0)}
        </p>
        <Button variant="flat" color="secondary" size="md">
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};
