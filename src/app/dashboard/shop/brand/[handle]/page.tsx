"use client";
import { Button, ButtonGroup } from "@heroui/button";
import { GrFormPreviousLink } from "react-icons/gr";
import { RiLayoutGrid2Line } from "react-icons/ri";
import { TfiLayoutGrid4 } from "react-icons/tfi";
import Image from "next/image";
import { formatPrice } from "@/app/utils/format";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Link as HeroLink } from "@heroui/link";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Product as ProductProps } from "@/app/interfaces/Product";
import { useGetProductByBrand } from "@/app/hooks/hook";
import { useParams } from "next/navigation";
import { ItemSkeleton } from "@/app/components/skeleton";
import { useInView } from "react-intersection-observer";
import { FaRegSadCry } from "react-icons/fa";
import { cartState } from "@/app/store/cartAtoms";
import { addToCart } from "@/app/service/cartService";
import { showToast } from "@/app/utils/toast";
import { BsBox2 } from "react-icons/bs";
const layoutState = atom("layout2");
const ITEMS_PER_LOAD = 8;
export default function BrandProductShopPage() {
  const params = useParams();
  const handle = params.handle;
  const brandTitle = (handle: string) => {
    switch (handle) {
      case "easydew":
        return "Easydew";
      case "dr-ciccarelli":
        return "Dr.Ciccarelli";
      case "eclat-du-teint":
        return "Eclat Du Teint";
      case "juve-head":
        return "Juve Head";
      case "sebamed":
        return "Sebamed";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col font-open py-[20px] h-full overflow-auto">
      <div className="flex items-center justify-between px-[40px]">
        <div className="flex flex-col gap-y-1">
          <p className="text-[28px] font-light select-none">
            {brandTitle(handle as string)}
          </p>
          <p className="text-sm text-normal">
            Các sản phẩm đến từ nhà{" "}
            <span className="font-bold text-primary">
              {brandTitle(handle as string)}
            </span>
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
  const params = useParams();
  const handle = params.handle;
  const { data: allProducts, isLoading } = useGetProductByBrand(
    handle as string
  );
  const [displayedProducts, setDisplayedProducts] = useState<ProductProps[]>(
    []
  );
  const [loadCount, setLoadCount] = useState(1); // Missing loadCount fix
  const [layout, setLayout] = useAtom(layoutState);
  const { ref, inView } = useInView({ threshold: 1.0, triggerOnce: false });

  useEffect(() => {
    if (allProducts) {
      setDisplayedProducts(allProducts.slice(0, ITEMS_PER_LOAD));
    }
  }, [allProducts]);

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  const loadMoreProducts = () => {
    if (!allProducts) return; //

    const nextLoadCount = loadCount + 1;
    const newProducts = allProducts.slice(0, nextLoadCount * ITEMS_PER_LOAD);

    setDisplayedProducts(newProducts || []);
    setLoadCount(nextLoadCount);
  };

  const handleChangeLayout = (layout: string) => {
    setLayout(layout);
  };
  if (allProducts?.length === 0) {
    return (
      <div className="w-full h-[550px] flex flex-col justify-center items-center gap-y-[20px]">
        <BsBox2 className="text-[70px] text-normal" />
        <p className="text-[20px] text-normal">
          Không có sản phẩm nào được hiển thị.
        </p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div
        className={`grid ${
          layout === "layout1"
            ? "grid-cols-3 gap-[70px]"
            : "grid-cols-4 gap-[50px]"
        } px-[40px] mt-[40px]`}
      >
        {[...Array(8)].map((_, index) => (
          <ItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-[40px] py-[20px] mt-[10px] justify-between">
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
      <div
        className={`grid ${
          layout === "layout1"
            ? "grid-cols-3 gap-[70px]"
            : "grid-cols-4 gap-[50px]"
        } px-[40px] mt-[40px]`}
      >
        {displayedProducts.map((item) => (
          <ProductItem key={item.productId} product={item} />
        ))}
      </div>
      <div ref={ref} className="h-10"></div>
    </div>
  );
}

const ProductItem: FC<{ product: ProductProps }> = ({ product }) => {
  const layout = useAtomValue(layoutState);
  const setCart = useSetAtom(cartState);

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
        <Button
          variant="flat"
          color="secondary"
          size="md"
          onPress={() => {
            if (product) {
              addToCart(product, 1, setCart);
              showToast("Đã thêm vào giỏ hàng.", "success");
            }
          }}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};
