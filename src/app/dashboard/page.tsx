"use client";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import React, { ReactNode, useMemo } from "react";
import { PiMoneyWavyLight } from "react-icons/pi";
import { formatPrice } from "../utils/format";
import { FaRegFileAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { LuPackageOpen } from "react-icons/lu";
import { Select, SelectItem } from "@heroui/react";
import {
  useAllProduct,
  useGetAllCustomerUser,
  useGetAllOrders,
  useGetTotalOrderValue,
} from "../hooks/hook";

export default function DashboardPage() {
  const { data: totalValue } = useGetTotalOrderValue();
  const { data: allOrders } = useGetAllOrders();
  const { data: allAcounts } = useGetAllCustomerUser();
  const { data: allProducts } = useAllProduct();
  const basicAnalytics: BasicAnalyticsItemProps[] = [
    {
      icon: <PiMoneyWavyLight className="text-[16px]" />,
      title: "Tổng doanh thu",
      type: "money",
      value: totalValue?.data as number,
    },
    {
      icon: <FaRegFileAlt className="text-[16px]" />,
      title: "Tổng đơn hàng",
      type: "number",
      value: allOrders?.length as number,
    },
    {
      icon: <AiOutlineUser className="text-[16px]" />,
      title: "Khách hàng",
      type: "number",
      value: allAcounts?.length as number,
    },
    {
      icon: <LuPackageOpen className="text-[16px]" />,
      title: "Sản phẩm",
      type: "number",
      value: allProducts?.length as number,
    },
  ];

  return (
    <div className="flex flex-col font-open py-[20px]">
      {/* Basic Summary */}
      <div className="grid grid-cols-4 px-[40px] gap-[20px]">
        {basicAnalytics.map((item) => (
          <BasicAnalyticsItem key={item.title} {...item} />
        ))}
      </div>
      {/* Revenue Chart */}
      <div className="flex flex-col px-[40px] mt-[20px]">
        <RevenueChart />
      </div>
      <div className="flex flex-col px-[40px] mt-[20px]">
        <OrderSummary />
      </div>
      {/* Order Summary */}
    </div>
  );
}

interface BasicAnalyticsItemProps {
  title: string;
  value: number;
  type: "number" | "money";
  icon: ReactNode;
}

function BasicAnalyticsItem(props: BasicAnalyticsItemProps) {
  return (
    <div className="flex justify-between p-[15px] transition-all duration-300 hover:bg-opacity-90 cursor-pointer border border-gray-400-40 rounded-xl bg-neutral-900 bg-opacity-40 font-open">
      <div className="flex flex-col gap-y-[10px]">
        <p className="text-normal font-light text-sm">{props.title}</p>
        {props.type === "number" && (
          <p className="text-[18px] font-semibold text-primary">
            {props.value}
          </p>
        )}
        {props.type === "money" && (
          <p className="text-[18px] font-semibold text-primary">
            {formatPrice(props.value)}
          </p>
        )}
      </div>
      <div className="p-[6px] bg-neutral-700 bg-opacity-30 w-fit h-fit rounded-md ">
        {props.icon}
      </div>
    </div>
  );
}

function RevenueChart() {
  const dateSort = [
    {
      key: "last10",
      title: "10 ngày trước",
    },
    {
      key: "last30",
      title: "Tháng trước",
    },
    {
      key: "lastYear",
      title: "Năm trước",
    },
  ];
  const data = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      Tháng: new Date(2025, i).toLocaleString("default", {
        month: "short",
      }),
      "Doanh thu": Math.floor(Math.random() * 100000000), // Random between 1000 - 11000
    }));
  }, []);
  return (
    <div className="flex flex-col bg-neutral-900 bg-opacity-40 border border-gray-400-40 rounded-xl font-open">
      <div className="flex justify-between p-[20px] rounded-xl items-center">
        <p className="text-normal font-light">Biểu đồ doanh thu</p>
        <div className="w-[250px]">
          <Select aria-label="sort" placeholder="Bộ lọc" variant="underlined">
            {dateSort.map((item) => (
              <SelectItem key={item.key}>{item.title}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="w-full mt-[40px]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a4ff66" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a4ff66" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* <XAxis
              dataKey="Tháng"
              tick={{ fill: "#8884d8" }}
              axisLine={false}
              tickLine={false}
            /> */}
            <Tooltip
              contentStyle={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
                padding: "10px",
                border: "none",
              }}
              formatter={(value) => `${formatPrice(value as number)}`}
              labelFormatter={(_, payload) => {
                if (payload && payload.length > 0) {
                  return `${payload[0].payload.Tháng}`; // Lấy đúng giá trị từ data
                }
                return "";
              }}
            />
            <Area
              type="monotoneX"
              dataKey="Doanh thu"
              stroke="#a4ff66"
              fill="url(#colorUv)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface CircleChartData {
  name: string;
  [key: string]: string | number;
}

interface CircleChartProps {
  color: string[];
  category: string[];
  chartData: CircleChartData[];
}

function OrderSummary() {
  const chartData: CircleChartProps = {
    color: [
      "hsl(var(--heroui-warning-600))", // Đang chờ
      "hsl(var(--heroui-secondary))", // Đang giao
      "hsl(var(--heroui-success))", // Đã giao
      "hsl(var(--heroui-danger))", // Đã huỷ
    ],
    category: ["Đang chờ", "Đang giao", "Đã giao", "Đã huỷ"],
    chartData: [
      { name: "Đang chờ", value: 30 },
      { name: "Đang giao", value: 10 },
      { name: "Đã giao", value: 20 },
      { name: "Đã huỷ", value: 5 },
    ],
  };
  return (
    <div className="flex gap-[20px]">
      {/* table */}
      <div className="flex flex-col w-[60%] p-[20px] bg-neutral-900 bg-opacity-40 border border-gray-400-40 rounded-xl font-open">
        <div className="flex justify-between">
          <p className="text-sm font-light text-normal">Các đơn gần nhất</p>
        </div>
        <table className="flex flex-col">
          <thead>
            <tr className="grid grid-cols-12 py-4">
              <th className="col-span-3 text-[12px] text-foreground font-semibold text-start">
                Mã đơn hàng
              </th>
              <th className="col-span-3 text-[12px] text-foreground font-semibold text-start">
                Tên khách hàng
              </th>
              <th className="col-span-3 text-[12px] text-foreground font-semibold text-start">
                Giá trị đơn
              </th>
              <th className="col-span-3 text-[12px] text-foreground font-semibold text-start">
                Tình trạng thanh toán
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-12 py-2">
              <td className="col-span-3 text-[13px]">GHT200005</td>
              <td className="col-span-3 text-[13px]">Trương Hoàng Trí</td>
              <td className="col-span-3 text-[13px]">
                {formatPrice(49999999)}
              </td>
              <td className="col-span-3 text-[13px]">GHT200005</td>
            </tr>
            <tr className="grid grid-cols-12 py-2">
              <td className="col-span-3 text-[13px]">GHT200005</td>
              <td className="col-span-3 text-[13px]">Trương Hoàng Trí</td>
              <td className="col-span-3 text-[13px]">
                {formatPrice(49999999)}
              </td>
              <td className="col-span-3 text-[13px]">GHT200005</td>
            </tr>
            <tr className="grid grid-cols-12 py-2">
              <td className="col-span-3 text-[13px]">GHT200005</td>
              <td className="col-span-3 text-[13px]">Trương Hoàng Trí</td>
              <td className="col-span-3 text-[13px]">
                {formatPrice(49999999)}
              </td>
              <td className="col-span-3 text-[13px]">GHT200005</td>
            </tr>
            <tr className="grid grid-cols-12 py-2">
              <td className="col-span-3 text-[13px]">GHT200005</td>
              <td className="col-span-3 text-[13px]">Trương Hoàng Trí</td>
              <td className="col-span-3 text-[13px]">
                {formatPrice(49999999)}
              </td>
              <td className="col-span-3 text-[13px]">GHT200005</td>
            </tr>
            <tr className="grid grid-cols-12 py-2">
              <td className="col-span-3 text-[13px]">GHT200005</td>
              <td className="col-span-3 text-[13px]">Trương Hoàng Trí</td>
              <td className="col-span-3 text-[13px]">
                {formatPrice(49999999)}
              </td>
              <td className="col-span-3 text-[13px]">GHT200005</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* chart order status */}
      <div className="flex flex-col justify-between w-[40%] p-[20px] bg-neutral-900 bg-opacity-40 border border-gray-400-40 rounded-xl font-open">
        <p className="text-sm font-light text-normal">Biểu đồ</p>
        <div className="flex items-center">
          <ResponsiveContainer
            width="55%"
            height={220}
            className="[&_.recharts-surface]:outline-none"
          >
            <PieChart>
              <Pie
                data={chartData.chartData}
                dataKey="value"
                nameKey="name"
                innerRadius="68%"
                paddingAngle={5}
                strokeWidth={0}
                animationDuration={1000}
                animationEasing="ease"
              >
                {chartData.chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartData.color[index]} />
                ))}
              </Pie>
              <Tooltip
                content={({ label, payload }) => (
                  <div className="flex h-8 min-w-[120px] items-center gap-x-2 rounded-medium bg-background px-1 text-tiny shadow-small">
                    <span className="font-medium text-foreground">{label}</span>
                    {payload?.map((p, index) => {
                      const name = p.name;
                      const value = p.value;
                      const category = name;
                      const colorIndex = chartData.chartData.findIndex(
                        (item) => item.name === name
                      );
                      return (
                        <div
                          key={`${index}-${name}`}
                          className="flex w-full items-center gap-x-2"
                        >
                          <div
                            className="h-2 w-2 flex-none rounded-full"
                            style={{
                              backgroundColor: chartData.color[colorIndex],
                            }}
                          />
                          <div className="flex w-full items-center justify-between gap-x-2 pr-1 text-xs text-default-700">
                            <span className="text-default-500">{category}</span>
                            <span className="font-mono font-medium text-default-700">
                              {value}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-y-[10px]">
            {chartData.category.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: chartData.color[index],
                  }}
                />
                <span className="text-normal text-sm">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
