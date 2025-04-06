"use client";
import { Button, Switch } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { GrHelpBook, GrSun } from "react-icons/gr";
import {
  IoLogOutOutline,
  IoSearchOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { PiRanking } from "react-icons/pi";
import { profileSettingDropdownState } from "../store/dropdownAtoms";
import { logoutService } from "../service/authenticateService";
import { useMutation } from "@tanstack/react-query";
import { userInfoState } from "../store/accountAtoms";
import { dashboardSearchModalState } from "../store/modalAtoms";

export default function ProfileSettingDropdown() {
  const setSearchModal = useSetAtom(dashboardSearchModalState);
  const userInfo = useAtomValue(userInfoState);
  const isToggleDropdown = useAtomValue(profileSettingDropdownState);
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutService,
  });
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };
  const handleRoleName = (role: string) => {
    switch (role) {
      case "business":
        return "Doanh nghiệp";
      case "admin":
        return "Sales Admin";
      case "sales":
        return "Sales Team";
      case "ceo":
        return "System Admin";
      case "personal":
        return "Cá Nhân";
      case "business":
        return "Doanh nghiệp";
      case "staff":
        return "Nhân viên";
      default:
        return "";
    }
  };
  const handleRole: Record<string, boolean> = {
    business: true,
    personal: true,
    sales: true,
    staff: true,
    ceo: false,
    admin: false,
  };
  const handleToggleSearchModalOn = () => {
    setSearchModal(true);
  };
  return (
    <div className="">
      <AnimatePresence>
        {isToggleDropdown && (
          <motion.div
            initial={{ opacity: 0, translateX: 100 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, display: "none", translateX: 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed flex flex-col w-[300px] 3xl:w-[400px] max-h-[600px] z-[35] border border-gray-400-40 bg-background top-[70px] left-[1210px] 3xl:left-[1450px] 2.5xl:left-[1420px] rounded-[15px] p-[20px] font-open"
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-[5px]">
                  <div className="w-[35px] h-[35px] flex items-center justify-center rounded-full font-bold text-white cursor-pointer relative bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-200 via-pink-900 to-stone-800">
                    {userInfo?.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[13px]">
                      {userInfo?.userName.toUpperCase()}
                    </p>
                    <p className="text-[11px] font-light">
                      {handleRoleName(userInfo?.type as string)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-[20px] gap-y-[10px]">
                <Item
                  title="Cài đặt"
                  link="/dashboard/setting"
                  icon={<IoSettingsOutline className="text-[18px]" />}
                />
                {handleRole[userInfo?.type as string] && (
                  <Item
                    title="Hạng Loyalty"
                    link="/dashboard/loyalty"
                    icon={<PiRanking className="text-[18px]" />}
                  />
                )}

                <Item
                  title="Tìm kiếm nhanh"
                  icon={<IoSearchOutline className="text-[18px]" />}
                  onClick={handleToggleSearchModalOn}
                />
                <Item
                  title="Chính sách"
                  link="/policies"
                  icon={<GrHelpBook className="text-[18px]" />}
                />
                <Item
                  title="Chế độ"
                  icon={<GrSun className="text-[18px]" />}
                  option={
                    <Switch
                      defaultSelected
                      color="secondary"
                      size="sm"
                      thumbIcon={({ isSelected, className }) =>
                        isSelected ? (
                          <SunIcon className={className} />
                        ) : (
                          <MoonIcon className={className} />
                        )
                      }
                    ></Switch>
                  }
                />

                <Button
                  onPress={handleLogout}
                  variant="light"
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-[10px]">
                    <div className="">
                      <IoLogOutOutline className="text-[18px]" />
                    </div>
                    <p className="text-sm font-light">Đăng xuất</p>
                  </div>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ItemProps {
  icon: ReactNode;
  option?: ReactNode;
  link?: string; //
  title: string;
  onClick?: () => void;
}

const Item: FC<ItemProps> = ({ option, link, title, icon, onClick }) => {
  if (link) {
    return (
      <Button
        onPress={onClick}
        as={Link}
        href={link}
        variant="light"
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-x-[10px]">
          <div className="">{icon}</div>
          <p className="text-sm font-light">{title}</p>
        </div>
        <div className="">{option}</div>
      </Button>
    );
  }
  return (
    <Button
      variant="light"
      className="flex items-center justify-between"
      onPress={onClick}
    >
      <div className="flex items-center gap-x-[10px]">
        <div className="">{icon}</div>
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="">{option}</div>
    </Button>
  );
};

const MoonIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
        fill="currentColor"
      />
    </svg>
  );
};

const SunIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <g fill="currentColor">
        <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
        <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
      </g>
    </svg>
  );
};
