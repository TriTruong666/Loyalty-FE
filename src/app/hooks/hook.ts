/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Product } from "../interfaces/Product";
import * as ProductService from "@/app/service/productService";
import * as CloudinaryService from "@/app/service/cloudinaryService";
import * as BrandService from "@/app/service/brandService";
import * as AccountService from "@/app/service/accountService";
import * as LocationService from "@/app/service/locationService";
import * as OrderService from "@/app/service/orderService";
import * as NotificationService from "@/app/service/notificationService";
import * as AnalyticsService from "@/app/service/analyticsService";
import * as LoyaltyService from "@/app/service/loyaltyService";
import { CloudinaryAsset } from "../interfaces/Cloudinary";
import { Brand } from "../interfaces/Brand";
import { User, Welcome } from "../interfaces/Account";
import { District, Province, Ward } from "../interfaces/Location";
import { Order } from "../interfaces/Order";
import { SalesCustomer } from "../interfaces/SalesCustomer";
import { userInfoState } from "../store/accountAtoms";
import { useAtomValue } from "jotai";
import { Notification } from "../interfaces/Notification";
import {
  AnalyticsDailyRevenueData,
  AnalyticsData,
  AnalyticsDataGateway,
  AnalyticsDataTransaction,
  AnalyticsYearlyRevenueData,
} from "../interfaces/Analytics";
import { Loyalty, Ranking } from "../interfaces/Loyalty";
function useFetch<T>(
  queryKey: any[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
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
export function useGetProductByBrand(
  handle: string,
  status: string,
  sortBy: string
) {
  return useFetch<Product[]>(["products", handle, status, sortBy], async () =>
    ProductService.getProductByBrand(handle, status, sortBy)
  );
}
export function useGetProductDetailByHandle(handle: string) {
  return useFetch<Product>(["products", handle], async () =>
    ProductService.getProductDetailByHandle(handle)
  );
}
export function useGetProductByLimit(
  page: number,
  mode: string,
  sortBy: string
) {
  return useFetch<Product[]>(["products", page, mode, sortBy], async () =>
    ProductService.getProductServiceByLimit(page, mode, sortBy)
  );
}
export function useSearchProductByKeyword(keyword: string) {
  return useFetch<Product[]>(["search", keyword], async () =>
    ProductService.searchProductByKeyword(keyword)
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
  return useFetch<User[]>(["users", page, type, status], async () =>
    AccountService.getUserByLimitByTypeByStatus(page, type, status)
  );
}
export function useGetUserByLimitByType(page: number, type: string) {
  return useFetch<User[]>(["users", page, type], async () =>
    AccountService.getUserByLimitByType(page, type)
  );
}
export function useGetUserByLimitByStatus(page: number, status: string) {
  return useFetch<User[]>(["users", page, status], async () =>
    AccountService.getUserByLimitByStatus(page, status)
  );
}
export function useGetCustomerUserByLimitByStatus(
  page: number,
  status: string
) {
  return useFetch<User[]>(["customers", page], async () =>
    AccountService.getCustomerUserByLimitByStatus(page, status)
  );
}

export function useGetAllCustomerUser() {
  return useFetch<User[]>(["customers"], async () =>
    AccountService.getAllCustomerUser()
  );
}

export function useGetUserInfo() {
  return useFetch<User>(["user-info"], async () =>
    AccountService.getUserInfo()
  );
}

export function useGetAllUser() {
  const userInfo = useAtomValue(userInfoState);
  const allowedRoles = ["admin", "ceo"];

  return useFetch<User[]>(["users"], async () => AccountService.getAllUser(), {
    enabled: !!userInfo && allowedRoles.includes(userInfo.type),
  });
}

export function useGetAllBrand() {
  return useFetch<Brand[]>(["brands"], async () => BrandService.getAllBrand());
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
export function useGetOrderByLimitByStatus(
  page: number,
  status: string,
  sortBy: string
) {
  return useFetch<Order[]>(["orders", page, status, sortBy], async () =>
    OrderService.getOrderByLimitByStatus(page, status, sortBy)
  );
}
export function useGetAllOrders() {
  return useFetch<Order[]>(["orders"], async () => OrderService.getAllOrders());
}

export function useGetDetailOrder(orderId: string) {
  return useFetch<Order>(["orders", orderId], async () =>
    OrderService.getDetailOrderService(orderId)
  );
}

export function useGetAllSalesCustomer() {
  return useFetch<SalesCustomer[]>(["sales-customers"], async () =>
    AccountService.getAllSalesCustomer()
  );
}

export function useGetSalesCustomerByLimit(page: number, limit: number) {
  return useFetch<SalesCustomer[]>(["sales-customers", page], async () =>
    AccountService.getSalesCustomerByLimit(page, limit)
  );
}

export function useGetListNotification() {
  return useFetch<Notification[]>(["notifications"], async () =>
    NotificationService.getListNotification()
  );
}

export function useGetDetailNotification(id: string) {
  return useFetch<Notification>(["notifications", id], async () =>
    NotificationService.getDetailNotification(id)
  );
}

export function useGetTotalOrderValue() {
  return useFetch<AnalyticsData>(["total-order-value"], async () =>
    AnalyticsService.getOrderTotalValueService()
  );
}
export function useGetOrderValueByTime(from: string, to: string) {
  return useFetch<AnalyticsData>(["total-order-value", from, to], async () =>
    AnalyticsService.getOrderValueByTime(from, to)
  );
}
export function useGetOrderValueByTransactionStatus(status: string) {
  return useFetch<AnalyticsDataTransaction>(
    ["order-value-by-transaction", status],
    async () => AnalyticsService.getOrderValueByTransactionStatus(status)
  );
}
export function useGetOrderValueByGateway(gateway: string) {
  return useFetch<AnalyticsDataGateway>(
    ["order-value-by-gateway", gateway],
    async () => AnalyticsService.getOrderValueByGateway(gateway)
  );
}
export function useGetOrderValueByDaily(from: string, to: string) {
  return useFetch<AnalyticsDailyRevenueData>(
    ["value-daily", from, to],
    async () => AnalyticsService.getOrderValueByDaily(from, to)
  );
}
export function useGetOrderValueByYear() {
  return useFetch<AnalyticsYearlyRevenueData>(["value-yearly"], async () =>
    AnalyticsService.getOrderValueByYear()
  );
}

export function useGetLoyaltyInfo(type: string) {
  return useFetch<Loyalty[]>(["loyalty", type], async () =>
    LoyaltyService.getLoyaltyInfo(type)
  );
}

export function useGetAnonymousRankingService(type: string) {
  return useFetch<Ranking[]>(["ranking", type], async () =>
    AccountService.getAnonymousRankingService(type)
  );
}

export function useWelcomeAccountService() {
  return useFetch<Welcome[]>(["welcome"], async () =>
    AccountService.welcomeAccountService()
  );
}
