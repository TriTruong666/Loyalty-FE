/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Product } from "../interfaces/Product";
import * as ProductService from "@/app/service/productService";
import * as CloudinaryService from "@/app/service/cloudinaryService";
import * as BrandService from "@/app/service/brandService";
import * as AccountService from "@/app/service/accountService";
import * as LocationService from "@/app/service/locationService";
import * as OrderService from "@/app/service/orderService";
import { CloudinaryAsset } from "../interfaces/Cloudinary";
import { Brand } from "../interfaces/Brand";
import { User } from "../interfaces/Account";
import { District, Province, Ward } from "../interfaces/Location";
import { Order } from "../interfaces/Order";
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
export function useGetProductByBrand(handle: string) {
  return useFetch<Product[]>(["shop", handle], async () =>
    ProductService.getProductByBrand(handle)
  );
}
export function useGetProductDetailByHandle(handle: string) {
  return useFetch<Product>(["product-detail", handle], async () =>
    ProductService.getProductDetailByHandle(handle)
  );
}
export function useGetProductByLimit(page: number, mode: string) {
  return useFetch<Product[]>(["products", page], async () =>
    ProductService.getProductServiceByLimit(page, mode)
  );
}

export function useGetAllAssets() {
  return useFetch<CloudinaryAsset[]>(["assets"], async () =>
    CloudinaryService.getAllAssets()
  );
}

export function useGetAllAssetByLimit(page: number) {
  return useFetch<CloudinaryAsset[]>(["assets", page], async () =>
    CloudinaryService.getAssetsByLimit(page)
  );
}

export function useGetUserByLimitByTypeByStatus(
  page: number,
  type: string,
  status: string
) {
  return useFetch<User[]>(["users", page], async () =>
    AccountService.getUserByLimitByTypeByStatus(page, type, status)
  );
}
export function useGetUserByLimitByType(page: number, type: string) {
  return useFetch<User[]>(["users", page], async () =>
    AccountService.getUserByLimitByType(page, type)
  );
}
export function useGetUserByLimitByStatus(page: number, status: string) {
  return useFetch<User[]>(["users", page], async () =>
    AccountService.getUserByLimitByStatus(page, status)
  );
}
export function useGetCustomerUserByLimitByStatus(
  page: number,
  status: string
) {
  return useFetch<User[]>(["users", page], async () =>
    AccountService.getCustomerUserByLimitByStatus(page, status)
  );
}
export function useGetAllBrand() {
  return useFetch<Brand[]>(["brands"], async () => BrandService.getAllBrand());
}

export function useGetUserInfo() {
  return useFetch<User>(["user-info"], async () =>
    AccountService.getUserInfo()
  );
}

export function useGetAllUser() {
  return useFetch<User[]>(["users"], async () => AccountService.getAllUser());
}

export function useGetAllProvince() {
  return useFetch<Province[]>(["provinces"], async () =>
    LocationService.getAllProvinces()
  );
}

export function useGetDistrictByProvince(provinceId: string) {
  return useFetch<District[]>(["districts", provinceId], async () =>
    LocationService.getDistrictsByProvinceId(provinceId)
  );
}
export function useGetWardByDistrict(districtId: string) {
  return useFetch<Ward[]>(["wards", districtId], async () =>
    LocationService.getWardsByDistrictId(districtId)
  );
}
export function useGetOrderByLimitByStatus(page: number, status: string) {
  return useFetch<Order[]>(["orders", page], async () =>
    OrderService.getOrderByLimitByStatus(page, status)
  );
}
export function useGetAllOrders() {
  return useFetch<Order[]>(["all-orders"], async () =>
    OrderService.getAllOrders()
  );
}
