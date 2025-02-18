/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Product } from "../interfaces/Product";
import * as ProductService from "@/app/service/productService";
import * as CloudinaryService from "@/app/service/cloudinaryService";
import { CloudinaryAsset } from "../interfaces/Cloudinary";
function useFetch<T>(
  queryKey: any[],
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T>
) {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<T>({
    queryKey,
    queryFn,
    ...options,
  });

  return { data, isLoading, isError, error, refetch, isFetching };
}

export function useAllProduct() {
  return useFetch<Product[]>(["products"], async () =>
    ProductService.getAllProductService()
  );
}

export function useGetProductByLimit(page: number) {
  return useFetch<Product[]>(["products", page], async () =>
    ProductService.getProductServiceByLimit(page)
  );
}

export function useGetAllAssets() {
  return useFetch<CloudinaryAsset[]>(["assets"], async () =>
    CloudinaryService.getAllAssets()
  );
}
