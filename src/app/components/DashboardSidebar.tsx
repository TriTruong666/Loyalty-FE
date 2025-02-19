"use client";
import Image from "next/image";
import Link from "next/link";
import { RiLineChartLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { HiOutlineUser } from "react-icons/hi2";
import { LuPackage2 } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { PiNotification } from "react-icons/pi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiSettingsLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { RiShoppingBagLine } from "react-icons/ri";
import { BsCart } from "react-icons/bs";
import { IoLockOpenOutline } from "react-icons/io5";
import { MdOutlinePermMedia } from "react-icons/md";
import { logoutService } from "../service/authenticateService";
import { useRouter } from "next/navigation";

export default function DashboardSidebar() {
  return (
    <div className="flex flex-col justify-between w-[270px] border-gray-400-40 h-screen border-r font-open overflow-hidden">
      {/* main */}
      <div className="flex flex-col">
        <div className="flex justify-center items-center-40 py-2">
          <Image
            alt="Logo"
            src="/logo-dark2.png"
            width={200}
            height={60}
            className="w-fit h-[60px] object-cover"
          />
        </div>
        <div className="py-2">
          <AdminMenu />
        </div>
        <div className="border-t border-gray-400-40 pb-2">
          <MenuOnlyForCEO />
        </div>
        <div className="border-t border-gray-400-40">
          <UtilityItem />
        </div>
      </div>
      <p className="text-center text-primary font-light text-[11px] pb-4">
        Powered by Loyalty™
      </p>
    </div>
  );
}

function StaffMenu() {
  const menu = [
    {
      name: "Tổng quan",
      icon: RiLineChartLine,
      path: "/dashboard",
    },
    {
      name: "Đơn hàng",
      icon: LuFileText,
      path: "/dashboard/admin-orders",
      typography: 10,
    },
    {
      name: "Thông báo",
      icon: PiNotification,
      path: "/dashboard/notification",
      typography: 3,
    },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-normal text-[12px] px-6 py-4">Menu</p>
      <div className="flex flex-col gap-y-3 mb-2">
        {menu.map((item, i) => (
          <MenuItem
            key={i}
            icon={item.icon}
            name={item.name}
            path={item.path}
            typography={item.typography}
          />
        ))}
      </div>
    </div>
  );
}
function AdminMenu() {
  const menu = [
    {
      name: "Tổng quan",
      icon: RiLineChartLine,
      path: "/dashboard",
    },
    {
      name: "Tài khoản",
      icon: HiOutlineUser,
      path: "/dashboard/accounts",
    },
    {
      name: "Sản phẩm",
      icon: LuPackage2,
      path: "/dashboard/products",
    },
    {
      name: "Đơn hàng",
      icon: LuFileText,
      path: "/dashboard/admin-orders",
      typography: 10,
    },
    {
      name: "Thư viện",
      icon: MdOutlinePermMedia,
      path: "/dashboard/media",
    },
    {
      name: "Thông báo",
      icon: PiNotification,
      path: "/dashboard/admin-notification",
      typography: 3,
    },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-normal text-[12px] px-6 py-4">Menu</p>
      <div className="flex flex-col gap-y-3 mb-2">
        {menu.map((item, i) => (
          <MenuItem
            key={i}
            icon={item.icon}
            name={item.name}
            path={item.path}
            typography={item.typography}
          />
        ))}
      </div>
    </div>
  );
}

function UtilityItem() {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
    logoutService();
  };
  const utilMenu = [
    {
      name: "Cài đặt",
      icon: RiSettingsLine,
      path: "/dashboard/setting",
    },
    {
      name: "Hỗ trợ?",
      icon: IoIosHelpCircleOutline,
      path: "/dashboard/help",
    },
  ];
  return (
    <div className="flex flex-col pt-4 ">
      <p className="text-normal text-[12px] px-6 py-2">Utilities</p>
      <div className="flex flex-col gap-y-3 mt-2">
        {utilMenu.map((item, i) => (
          <MenuItem
            key={i}
            icon={item.icon}
            name={item.name}
            path={item.path}
          />
        ))}
        <div
          className="relative flex items-center justify-between px-6 py-2 group overflow-hidden transition-all duration-300 cursor-pointer"
          onClick={handleLogout}
        >
          <span className="absolute inset-0 bg-gray-600 bg-opacity-10 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

          <div className="relative flex items-center gap-x-3 z-10">
            <IoIosLogOut />
            <p className="text-[13px] font-light group-hover:text-foreground transition-all duration-300 text-normal">
              Đăng xuất
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  name,
  icon: Icon,
  path,
  typography,
}: {
  name: string;
  icon: any;
  path: string;
  typography?: number;
}) {
  const pathName = usePathname();
  const isActive =
    path === "/dashboard" ? pathName === path : pathName.startsWith(path);

  return (
    <Link
      href={path}
      className={`relative flex items-center justify-between px-6 py-2 group overflow-hidden transition-all duration-300 ${
        isActive ? "border-l-[4px] !border-primary !bg-transparent" : ""
      }`}
    >
      <span className="absolute inset-0 bg-gray-600 bg-opacity-10 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

      <div className="relative flex items-center gap-x-3 z-10">
        <Icon
          className={`text-[16px] text-normal group-hover:text-foreground transition-all duration-300 ${
            isActive ? "!text-primary" : ""
          }`}
        />
        <p
          className={`text-[13px] font-light group-hover:text-foreground transition-all duration-300 ${
            isActive ? "!text-primary font-medium" : "text-normal"
          }`}
        >
          {name}
        </p>
      </div>

      {typography !== undefined && (
        <p
          className={`relative text-[10px] px-2 py-[2px] bg-transparent text-foreground border border-gray-400-40 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background ${
            isActive && "!bg-primary !text-background"
          } font-semibold rounded-full text-center min-w-[20px] z-10`}
        >
          {typography}
        </p>
      )}
    </Link>
  );
}

function MenuOnlyForCEO() {
  const ceoMenu = [
    {
      name: "Xét duyệt",
      icon: IoLockOpenOutline,
      path: "/dashboard/permission",
      typography: 3,
    },
  ];
  return (
    <div className="flex flex-col pt-4 ">
      <p className="text-normal text-[12px] px-6 py-2">Dành cho CEO</p>
      <div className="flex flex-col gap-y-3 mt-2">
        {ceoMenu.map((item, i) => (
          <MenuItem
            key={i}
            icon={item.icon}
            name={item.name}
            path={item.path}
            typography={item.typography}
          />
        ))}
      </div>
    </div>
  );
}

function UserMenu() {
  const userMenu = [
    {
      name: "Tổng quan",
      icon: RiLineChartLine,
      path: "/dashboard",
    },
    {
      name: "Mua sắm",
      icon: RiShoppingBagLine,
      path: "/dashboard/shop",
    },
    {
      name: "Giỏ hàng",
      icon: BsCart,
      path: "/dashboard/cart",
    },
    {
      name: "Đơn hàng",
      icon: LuFileText,
      path: "/dashboard/user-orders",
      typography: 10,
    },
    {
      name: "Thông báo",
      icon: PiNotification,
      path: "/dashboard/user-notification",
      typography: 3,
    },
  ];
  return (
    <div className="flex flex-col pt-4 ">
      <p className="text-normal text-[12px] px-6 py-1">Menu</p>
      <div className="flex flex-col gap-y-3 mt-2">
        {userMenu.map((item, i) => (
          <MenuItem
            key={i}
            icon={item.icon}
            name={item.name}
            path={item.path}
            typography={item.typography}
          />
        ))}
      </div>
    </div>
  );
}
