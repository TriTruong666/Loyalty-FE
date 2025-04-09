"use client";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import React, { ReactNode, useMemo, useState } from "react";
import { PiMoneyWavyLight } from "react-icons/pi";
import { formatPrice } from "../utils/format";
import { FaRegCreditCard, FaRegFileAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import {
  LuArrowDownRight,
  LuArrowUpRight,
  LuPackageOpen,
} from "react-icons/lu";
import { Select, SelectItem } from "@heroui/react";
import {
  useAllProduct,
  useGetAllCustomerUser,
  useGetAllOrders,
  useGetOrderByLimitByStatus,
  useGetOrderValueByDaily,
  useGetOrderValueByGateway,
  useGetOrderValueByTransactionStatus,
  useGetOrderValueByYear,
  useGetTotalOrderValue,
} from "../hooks/hook";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { IoMdCheckmark } from "react-icons/io";
import { TbFolderCancel, TbPigMoney } from "react-icons/tb";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { userInfoState } from "../store/accountAtoms";
import { MdConstruction } from "react-icons/md";

const dashboardProgressState = atom(1);

export default function DashboardPage() {
  const info = useAtomValue(userInfoState);
  // const { data: websocket } = useWebsocketService();
  const [progress, setProgress] = useAtom(dashboardProgressState);
  const { data: totalValue } = useGetTotalOrderValue();
  const { data: allOrders } = useGetAllOrders();
  const { data: allAcounts } = useGetAllCustomerUser();
  const { data: allProducts } = useAllProduct();
  const basicAnalytics: BasicAnalyticsItemProps[] = [
    {
      icon: <PiMoneyWavyLight className="text-[16px]" />,
      title: "Tổng giá trị đơn hàng",
      type: "money",
      value: totalValue?.data as number,
      onClick: () => handleOnClickItem(2),
    },
    {
      icon: <FaRegFileAlt className="text-[16px]" />,
      title: "Tổng đơn hàng",
      type: "number",
      value: allOrders?.length as number,
      onClick: () => handleOnClickItem(3),
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

  const handleRole: Record<string, boolean> = {
    business: true,
    personal: true,
    sales: true,
    staff: true,
    ceo: false,
    admin: false,
  };

  const handleOnClickItem = (value: number) => {
    setProgress(value);
  };
  if (handleRole[info?.type as string]) {
    return (
      <>
        <Available />
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col font-open py-[20px]">
        {progress === 1 && (
          <>
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
            {/* Order Summary */}
            <div className="flex flex-col px-[40px] mt-[20px]">
              <OrderSummary />
            </div>
          </>
        )}
        {progress === 2 && (
          <div className="px-[40px]">
            <RevenueDetail />
          </div>
        )}
        {progress === 3 && (
          <div className="px-[40px]">
            <OrderDetail />
          </div>
        )}
      </div>
    </>
  );
}

function Available() {
  return (
    <div className="flex flex-col w-full h-[600px] justify-center items-center font-open gap-y-[10px]">
      <MdConstruction className="text-[70px] text-normal" />
      <p className="text-normal text-[18px]">
        Trang này hiện chưa hoạt động với tài khoản của bạn!!!
      </p>
    </div>
  );
}

interface BasicAnalyticsItemProps {
  title: string;
  value: number;
  type: "number" | "money";
  icon: ReactNode;
  onClick?: () => void;
}

function BasicAnalyticsItem(props: BasicAnalyticsItemProps) {
  return (
    <div
      onClick={props.onClick}
      className="w-full flex justify-between p-[15px] transition-all duration-300 hover:bg-opacity-90 cursor-pointer border border-gray-400-40 rounded-xl bg-neutral-900 bg-opacity-40 font-open"
    >
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
  const [selectedSort, setSelectedSort] = useState<string>("last10");

  // Move getDateRange function ABOVE its usage
  const getDateRange = (filter: string) => {
    const now = new Date();
    let from;

    switch (filter) {
      case "last10":
        from = new Date();
        from.setDate(now.getDate() - 10);
        break;
      case "last30":
        from = new Date();
        from.setMonth(now.getMonth() - 1);
        break;
      // case "lastYear":
      //   from = new Date();
      //   from.setFullYear(now.getFullYear() - 1);
      //   break;
      default:
        from = now;
    }

    const to = now;

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    return {
      from: formatDate(from),
      to: formatDate(to),
    };
  };

  // Now use getDateRange without any error
  const { from, to } = useMemo(
    () => getDateRange(selectedSort),
    [selectedSort]
  );

  const { data: daily } = useGetOrderValueByDaily(from, to);
  const { data: yearly } = useGetOrderValueByYear();
  const dateSort = [
    { key: "last10", title: "10 ngày trước" },
    { key: "last30", title: "Tháng trước" },
    { key: "currentYear", title: "Năm nay" },
  ];

  const data = useMemo(() => {
    if (selectedSort === "currentYear") {
      if (!yearly?.data) return [];

      return yearly.data.map(({ month, total }) => {
        const [mm, yyyy] = month.split("-");
        const displayMonth = `Tháng ${mm}-${yyyy}`;

        return {
          date: displayMonth,
          "Doanh thu": total,
        };
      });
    }

    if (!daily?.data) return [];

    const startDate = new Date(from);
    const endDate = new Date(to);
    const dateMap = new Map();

    daily.data.forEach(({ date, total }) => {
      dateMap.set(date, total);
    });

    const result = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      const [year, month, day] = formattedDate.split("-");
      const displayDate = `${day}-${month}-${year}`;

      result.push({
        date: displayDate,
        "Doanh thu": dateMap.get(formattedDate) || 0,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }, [selectedSort, daily, yearly, from, to]);

  return (
    <div className="flex flex-col bg-neutral-900 bg-opacity-40 border border-gray-400-40 rounded-xl font-open">
      <div className="flex justify-between p-[20px] rounded-xl items-center">
        <p className="text-normal font-light">Biểu đồ doanh thu</p>
        <div className="w-[250px]">
          <Select
            aria-label="sort"
            placeholder="Bộ lọc"
            variant="underlined"
            selectedKeys={[selectedSort]}
            onChange={(e) => {
              setSelectedSort(e.target.value);
            }}
          >
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
                  return `${payload[0].payload.date}`;
                }
                return "";
              }}
            />
            <Area
              type="linear"
              dataKey="Doanh thu"
              stroke="#a4ff66"
              fill="url(#colorUv)"
              strokeWidth={1}
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
  const { data: orders } = useGetOrderByLimitByStatus(1, "pending", "");
  const newOrders = orders?.slice(0, 5);
  const { data: allOrders } = useGetAllOrders();
  const pendingOrders = allOrders?.filter(
    (order) => order.orderStatus === "pending"
  ).length;
  const confirmedOrders = allOrders?.filter(
    (order) => order.orderStatus === "confirmed"
  ).length;
  const deliveryOrders = allOrders?.filter(
    (order) => order.orderStatus === "exported"
  ).length;
  const completeOrders = allOrders?.filter(
    (order) => order.orderStatus === "complete"
  ).length;
  const cancelOrders = allOrders?.filter(
    (order) => order.orderStatus === "cancelled"
  ).length;
  const chartData: CircleChartProps = {
    color: [
      "hsl(var(--heroui-warning-600))", // Đang chờ
      "hsl(var(--heroui-primary-600))", // Da xac nhan
      "hsl(var(--heroui-secondary))", // Đang giao
      "hsl(var(--heroui-success))", // Đã giao
      "hsl(var(--heroui-danger))", // Đã huỷ
    ],
    category: ["Đang chờ", "Đã xác nhận", "Đang giao", "Đã giao", "Đã huỷ"],
    chartData: [
      { name: "Đang chờ", value: pendingOrders as number },
      { name: "Đã xác nhận", value: confirmedOrders as number },
      { name: "Đang giao", value: deliveryOrders as number },
      { name: "Đã giao", value: completeOrders as number },
      { name: "Đã huỷ", value: cancelOrders as number },
    ],
  };
  const handleFinanceStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-700";
      case "cancelled":
        return "bg-danger-50 text-red-600";
      case "confirmed":
        return "bg-success-200";
      default:
        return "";
    }
  };
  const handleFinanceStatusName = (status: string) => {
    switch (status) {
      case "pending":
        return "Chưa thanh toán";
      case "cancelled":
        return "Đã huỷ đơn";
      case "confirmed":
        return "Đã thanh toán";
      default:
        return "";
    }
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
            {newOrders?.map((order) => (
              <tr key={order.orderId} className="grid grid-cols-12 py-2">
                <td className="col-span-3 text-[13px]">{order.orderId}</td>
                <td className="col-span-3 text-[13px]">{order.customerName}</td>
                <td className="col-span-3 text-[13px]">
                  {formatPrice(order.totalPayment)}
                </td>
                <td className="col-span-3 flex justify-start">
                  <p
                    className={`text-[10px] font-semibold text-center px-[20px] py-[4px] rounded-lg ${handleFinanceStatus(
                      order.transaction.transactionStatus
                    )}`}
                  >
                    {handleFinanceStatusName(
                      order.transaction.transactionStatus
                    )}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* chart order status */}
      <div className="flex flex-col justify-between w-[40%] p-[20px] bg-neutral-900 bg-opacity-40 border border-gray-400-40 rounded-xl font-open">
        <p className="text-sm font-light text-normal">Biểu đồ đơn hàng</p>
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
              <g>
                <text textAnchor="middle" x="50%" y="48%">
                  <tspan
                    className="fill-default-500 text-tiny"
                    dy="-0.5em"
                    x="50%"
                  >
                    Tổng đơn
                  </tspan>
                  <tspan
                    className="fill-foreground text-medium font-semibold"
                    dy="1.5em"
                    x="50%"
                  >
                    {allOrders?.length}
                  </tspan>
                </text>
              </g>
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

function RevenueDetail() {
  const setProgress = useSetAtom(dashboardProgressState);
  const handleBack = () => {
    setProgress(1);
  };

  const { data: yearly } = useGetOrderValueByYear();
  const { to, from } = useMemo(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 10);
    return { to, from };
  }, []); // Empty dependency array ensures this runs only once

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const { data: daily } = useGetOrderValueByDaily(
    formatDate(from),
    formatDate(to)
  );

  const thisDayData = useMemo(() => {
    if (!daily?.data) return [];

    const startDate = new Date(from);
    const endDate = new Date(to);
    const dateMap = new Map();

    daily.data.forEach(({ date, total }) => {
      dateMap.set(date, total);
    });

    const result = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      const [year, month, day] = formattedDate.split("-");
      const displayDate = `${day}-${month}-${year}`;

      result.push({
        date: displayDate,
        "Doanh thu ngày": dateMap.get(formattedDate) || 0,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }, [daily, from, to]);

  const thisMonthdata = useMemo(() => {
    if (!yearly?.data) return [];

    return yearly.data.map(({ month, total }) => {
      const [mm, yyyy] = month.split("-");
      const displayMonth = `Tháng ${mm}-${yyyy}`;

      return {
        date: displayMonth,
        "Doanh thu tháng": total,
      };
    });
  }, [yearly]);

  const { currentMonthTotal, lastMonthTotal, increasePercentageMonth } =
    useMemo(() => {
      if (!yearly?.data)
        return {
          currentMonthTotal: 0,
          lastMonthTotal: 0,
          increasePercentageMonth: "N/A",
        };

      const today = new Date();
      const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
      const currentYear = today.getFullYear();
      const lastMonth = String(today.getMonth()).padStart(2, "0");

      // Lấy dữ liệu doanh thu
      const currentData = yearly.data.find(
        (item) => item.month === `${currentMonth}-${currentYear}`
      );
      const lastData = yearly.data.find(
        (item) => item.month === `${lastMonth}-${currentYear}`
      );

      const currentTotal = currentData ? currentData.total : 0;
      const lastTotal = lastData ? lastData.total : 0;

      let percentage = "N/A";
      if (lastTotal > 0) {
        percentage = `${(
          ((currentTotal - lastTotal) / lastTotal) *
          100
        ).toFixed(2)}% so với tháng trước`;
      } else if (currentTotal > 0) {
        percentage = "Tháng trước không có doanh thu";
      } else {
        percentage = "0% so với tháng trước";
      }

      return {
        currentMonthTotal: currentTotal,
        lastMonthTotal: lastTotal,
        increasePercentageMonth: percentage,
      };
    }, [yearly]);

  const { currentDayTotal, lastDayTotal, increasePercentageDay } =
    useMemo(() => {
      if (!daily?.data) {
        return {
          currentDayTotal: 0,
          lastDayTotal: 0,
          increasePercentageDay: "N/A",
        };
      }

      const today = new Date();
      const formattedToday = formatDate(today);
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const formattedYesterday = formatDate(yesterday);

      // Get today's and yesterday's revenue data
      const todayData = daily.data.find((item) => item.date === formattedToday);
      const yesterdayData = daily.data.find(
        (item) => item.date === formattedYesterday
      );

      const currentTotal = todayData ? todayData.total : 0;
      const lastTotal = yesterdayData ? yesterdayData.total : 0;

      let percentage = "N/A";
      if (lastTotal > 0) {
        percentage = `${(
          ((currentTotal - lastTotal) / lastTotal) *
          100
        ).toFixed(2)}% so với hôm qua`;
      } else if (currentTotal > 0) {
        percentage = "Hôm qua không có doanh thu";
      } else {
        percentage = "0% so với hôm qua";
      }

      return {
        currentDayTotal: currentTotal,
        lastDayTotal: lastTotal,
        increasePercentageDay: percentage,
      };
    }, [daily]);

  const { data: totalBankTransfer } =
    useGetOrderValueByGateway("bank_transfer");
  const { data: totalCOD } = useGetOrderValueByGateway("cod");
  const { data: totalDebt } = useGetOrderValueByGateway("debt");
  const { data: totalConfirmed } =
    useGetOrderValueByTransactionStatus("confirmed");
  const revenueStats: BasicAnalyticsItemProps[] = [
    {
      icon: <IoMdCheckmark className="text-[16px]" />,
      title: "Đơn hàng đã thanh toán",
      type: "money",
      value: totalConfirmed?.total as number,
    },
    {
      icon: <FaRegCreditCard className="text-[16px]" />,
      title: "Đơn hàng chuyển khoản",
      type: "money",
      value: totalBankTransfer?.data.total as number,
    },
    {
      icon: <TbPigMoney className="text-[16px]" />,
      title: "Đơn hàng công nợ",
      type: "money",
      value: totalDebt?.data.total as number,
    },
    {
      icon: <FaRegMoneyBill1 className="text-[16px]" />,
      title: "Đơn hàng COD",
      type: "money",
      value: totalCOD?.data.total as number,
    },
  ];

  const gradientType =
    lastDayTotal > 0 && currentDayTotal > lastDayTotal
      ? "increase"
      : lastDayTotal > 0 && currentDayTotal < lastDayTotal
      ? "decrease"
      : lastDayTotal === 0 && currentDayTotal === 0
      ? "no revenue"
      : "default";
  console.log("Gradient Type:", gradientType);
  return (
    <div className="flex flex-col">
      <p
        className="w-fit text-normal text-sm underline cursor-pointer"
        onClick={handleBack}
      >
        Quay lại
      </p>
      <div className="flex justify-between mt-[40px] font-open gap-x-[20px]">
        {/* This month vs last month */}
        <div className="flex justify-between p-[20px] bg-neutral-900 bg-opacity-40 border border-gray-400-40 rounded-xl w-full">
          {/* detail */}
          <div className="flex flex-col justify-between gap-y-[20px]">
            <p className="font-light text-normal text-[14px]">
              Giá trị đơn hàng tháng này
            </p>
            <p className="font-semibold text-foreground text-[20px]">
              {formatPrice(currentMonthTotal as number)}
            </p>
            <p className="flex items-center gap-x-[6px]">
              {lastMonthTotal > 0 && currentMonthTotal > lastMonthTotal ? (
                <span className="flex items-center text-primary gap-x-[5px]">
                  <LuArrowUpRight className="text-[20px]" />
                  <span>{increasePercentageMonth}</span>
                </span>
              ) : lastMonthTotal > 0 && currentMonthTotal < lastMonthTotal ? (
                <span className="flex items-center text-red-500 gap-x-[5px]">
                  <LuArrowDownRight className="text-[20px]" />
                  <span>{increasePercentageMonth}</span>
                </span>
              ) : (
                <span className="text-gray-400">{increasePercentageMonth}</span>
              )}
            </p>
          </div>
          {/* chart */}
          <div className="flex w-[50%]">
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={thisMonthdata}>
                <defs>
                  {lastMonthTotal > 0 && currentMonthTotal > lastMonthTotal ? (
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a4ff66" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#a4ff66" stopOpacity={0} />
                    </linearGradient>
                  ) : lastMonthTotal > 0 &&
                    currentMonthTotal < lastMonthTotal ? (
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  ) : (
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                    </linearGradient>
                  )}
                </defs>
                <Area
                  type="linear"
                  dataKey="Doanh thu tháng"
                  stroke={
                    lastMonthTotal > 0 && currentMonthTotal > lastMonthTotal
                      ? "#a4ff66"
                      : lastMonthTotal > 0 && currentMonthTotal < lastMonthTotal
                      ? "#ef4444"
                      : "#9ca3af"
                  }
                  fill="url(#colorUv)"
                  strokeWidth={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex justify-between p-[20px] bg-neutral-900 bg-opacity-40 border border-gray-400-40 rounded-xl w-full">
          {/* detail */}
          <div className="flex flex-col justify-between gap-y-[20px]">
            <p className="font-light text-normal text-[14px]">
              Giá trị đơn hàng hôm nay
            </p>
            <p className="font-semibold text-foreground text-[20px]">
              {formatPrice(currentDayTotal as number)}
            </p>
            <p className="flex items-center gap-x-[6px]">
              {lastDayTotal > 0 && currentDayTotal > lastDayTotal ? (
                <span className="flex items-center text-primary gap-x-[5px]">
                  <LuArrowUpRight className="text-[20px]" />
                  <span>{increasePercentageDay}</span>
                </span>
              ) : lastDayTotal > 0 && currentDayTotal < lastDayTotal ? (
                <span className="flex items-center text-red-500 gap-x-[5px]">
                  <LuArrowDownRight className="text-[20px]" />
                  <span>{increasePercentageDay}</span>
                </span>
              ) : (
                <span className="text-gray-400">{increasePercentageDay}</span>
              )}
            </p>
          </div>
          {/* chart */}
          <div className="flex w-[50%]">
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={thisDayData}>
                <defs>
                  {gradientType === "increase" ? (
                    <linearGradient id="colorSv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a4ff66" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#a4ff66" stopOpacity={0} />
                    </linearGradient>
                  ) : gradientType === "decrease" ? (
                    <linearGradient id="colorSv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  ) : gradientType === "no revenue" ? (
                    <linearGradient id="colorSv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                    </linearGradient>
                  ) : (
                    <linearGradient id="colorSv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                    </linearGradient>
                  )}
                </defs>
                <Area
                  type="linear"
                  dataKey="Doanh thu ngày"
                  stroke={
                    gradientType === "increase"
                      ? "#a4ff66"
                      : gradientType === "decrease"
                      ? "#ef4444"
                      : "#9ca3af" // Neutral color for no revenue
                  }
                  fill="url(#colorSv)"
                  strokeWidth={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* grid of other revenue */}
      </div>
      <div className="grid grid-cols-4 gap-[20px] w-full my-[20px]">
        {revenueStats.map((item) => (
          <BasicAnalyticsItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

function OrderDetail() {
  const setProgress = useSetAtom(dashboardProgressState);
  const handleBack = () => {
    setProgress(1);
  };
  const { data: allOrders } = useGetAllOrders();
  const pendingOrders = allOrders?.filter(
    (order) => order.orderStatus === "pending"
  ).length;
  const confirmedOrders = allOrders?.filter(
    (order) => order.orderStatus === "confirmed"
  ).length;
  const deliveryOrders = allOrders?.filter(
    (order) => order.orderStatus === "exported"
  ).length;
  const completeOrders = allOrders?.filter(
    (order) => order.orderStatus === "complete"
  ).length;
  const cancelOrders = allOrders?.filter(
    (order) => order.orderStatus === "cancelled"
  ).length;
  const pendingTransactionOrders = allOrders?.filter(
    (order) => order?.transaction?.transactionStatus === "pending"
  ).length;
  const chartData: CircleChartProps = {
    color: [
      "hsl(var(--heroui-warning-600))", // Đang chờ
      "hsl(var(--heroui-primary-600))", // Da xac nhan
      "hsl(var(--heroui-secondary))", // Đang giao
      "hsl(var(--heroui-success))", // Đã giao
      "hsl(var(--heroui-danger))", // Đã huỷ
    ],
    category: ["Đang chờ", "Đã xác nhận", "Đang giao", "Đã giao", "Đã huỷ"],
    chartData: [
      { name: "Đang chờ", value: pendingOrders as number },
      { name: "Đã xác nhận", value: confirmedOrders as number },
      { name: "Đang giao", value: deliveryOrders as number },
      { name: "Đã giao", value: completeOrders as number },
      { name: "Đã huỷ", value: cancelOrders as number },
    ],
  };
  const progressCancelOrder =
    ((cancelOrders ?? 0) / (allOrders?.length ?? 1)) * 100;
  const progressCompleteOrder =
    ((completeOrders ?? 0) / (allOrders?.length ?? 1)) * 100;
  const progressPendingTransactionOrder =
    ((pendingTransactionOrders ?? 0) / (allOrders?.length ?? 1)) * 100;
  const fixedCancel = Number(progressCancelOrder.toFixed(0));
  const fixedComplete = Number(progressCompleteOrder.toFixed(0));
  const fixedPendingTransaction = Number(
    progressPendingTransactionOrder.toFixed(0)
  );
  const statsKPIList: ProgressKPIStatsProps[] = [
    {
      title: "Đơn huỷ",
      color: "danger",
      icon: <TbFolderCancel className="text-[18px] text-danger-600" />,
      progress: fixedCancel,
    },
    {
      title: "Đơn thành công",
      color: "success",
      icon: <TbFolderCancel className="text-[18px] text-success-600" />,
      progress: fixedComplete,
    },
    {
      title: "Đơn Chưa thanh toán",
      color: "neutral",
      icon: <TbFolderCancel className="text-[18px] text-neutral-300" />,
      progress: fixedPendingTransaction,
    },
  ];
  return (
    <div className="flex flex-col">
      <p
        className="w-fit text-normal text-sm underline cursor-pointer"
        onClick={handleBack}
      >
        Quay lại
      </p>
      <div className="flex justify-between mt-[40px] font-open gap-x-[20px]">
        {/* Pie chart */}
        <div className="flex flex-col justify-between w-[50%] p-[20px] bg-neutral-900 bg-opacity-40 border border-gray-400-40 rounded-xl font-open">
          <p className="text-sm font-light text-normal">Biểu đồ đơn hàng</p>
          <div className="flex items-center">
            <ResponsiveContainer
              width="65%"
              height={270}
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
                      <span className="font-medium text-foreground">
                        {label}
                      </span>
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
                              <span className="text-default-500">
                                {category}
                              </span>
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
                <g>
                  <text textAnchor="middle" x="50%" y="48%">
                    <tspan
                      className="fill-default-500 text-tiny"
                      dy="-0.5em"
                      x="50%"
                    >
                      Tổng đơn
                    </tspan>
                    <tspan
                      className="fill-foreground text-medium font-semibold"
                      dy="1.5em"
                      x="50%"
                    >
                      {allOrders?.length}
                    </tspan>
                  </text>
                </g>
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
        <div className="flex flex-col w-[50%] gap-y-[15px]">
          {statsKPIList.map((item, i) => (
            <ProgressKPIStats key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProgressKPIStatsProps {
  icon: ReactNode;
  title: string;
  progress: number;
  color: "neutral" | "success" | "danger";
}

function ProgressKPIStats(props: ProgressKPIStatsProps) {
  return (
    <div className="flex flex-col gap-y-[10px] p-[15px] bg-neutral-900 bg-opacity-40 border border-gray-400-40 rounded-xl font-open">
      <div className="flex items-center justify-between">
        <p className="text-normal text-sm">{props.title}</p>
        <div
          className={`p-[6px] border ${
            props.color === "danger" &&
            "border-danger-100 bg-danger-200 bg-opacity-15"
          } ${
            props.color === "success" &&
            "border-success-100 bg-success-200 bg-opacity-15"
          } ${
            props.color === "neutral" &&
            "border-neutral-600 bg-neutral-200 bg-opacity-15"
          } rounded-lg`}
        >
          {props.icon}
        </div>
      </div>
      <p className="font-bold text-[20px]">{props.progress}%</p>
      <div className="relative h-[10px] rounded-full w-full bg-neutral-800 bg-opacity-50 mt-[10px]">
        <div
          className={`absolute top-0 left-0 ${
            props.color === "danger" && "bg-danger-300"
          } ${props.color === "success" && "bg-success-300"} ${
            props.color === "neutral" && "bg-neutral-300"
          } h-full rounded-full`}
          style={{ width: `${props.progress}%` }}
        ></div>
      </div>
    </div>
  );
}
