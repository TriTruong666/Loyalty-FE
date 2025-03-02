"use client";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsBellFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useAtom } from "jotai";
import {
  cartDropdownState,
  notificationDropdownState,
  profileSettingDropdownState,
} from "../store/dropdownAtoms";
import { cartState } from "../store/cartAtoms";
import { getCartFromStorage } from "../service/cartService";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between border-b border-gray-400-40 py-4 px-[30px]">
      <SearchBar />
      <MainBar />
    </div>
  );
}

function SearchBar() {
  const placeholderTexts = [
    "Tìm sản phẩm bạn đang cần...",
    "Đơn hàng mà bạn tìm kiếm...",
    "Danh mục nhãn hàng...",
  ];

  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = placeholderTexts[index];
    const typingSpeed = isDeleting ? 50 : 100;
    const delayBeforeDeleting = 4000;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setPlaceholder((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setPlaceholder((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), delayBeforeDeleting);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % placeholderTexts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <div className="flex items-center w-[600px] 2xl:w-[500px] px-3 py-3 rounded-full gap-x-3 bg-[#222124] transition-all duration-150">
      <IoIosSearch className="text-[24px]" />
      <input
        type="text"
        className="outline-none bg-transparent border-none w-full text-[14px] font-light"
        placeholder={placeholder}
      />
    </div>
  );
}

function MainBar() {
  const [notiDropdown, setNotiDropdown] = useAtom(notificationDropdownState);
  const [cartDropdown, setCartDropdown] = useAtom(cartDropdownState);
  const [profileDropdown, setProfileDropdown] = useAtom(
    profileSettingDropdownState
  );
  const [cart, setCart] = useAtom(cartState);
  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
  }, [setCart]);
  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  const handleToggleNotiDropdown = () => {
    setNotiDropdown(!notiDropdown);
    setCartDropdown(false);
    setProfileDropdown(false);
  };
  const handleToggleCartDropdown = () => {
    setCartDropdown(!cartDropdown);
    setNotiDropdown(false);
    setProfileDropdown(false);
  };
  const handleToggleProfileModal = () => {
    setProfileDropdown(!profileDropdown);
    setNotiDropdown(false);
    setCartDropdown(false);
  };
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-x-2 border border-[#34C724] px-2 py-1 rounded-full mr-4">
        <IoShieldCheckmarkOutline className="text-[14px] text-[#34C724]" />
        <p className="text-[12px] text-[#34C724]">Verified</p>
      </div>
      {/* Notification Icon with Badge */}
      <div
        className="relative px-4 border-l border-gray-300 cursor-pointer"
        onClick={handleToggleNotiDropdown}
      >
        <BsBellFill className="text-[20px]" />
        <span className="absolute -top-1 left-[30px] bg-red-500 text-white text-[8px] px-[6px] py-[1px] rounded-full font-bold">
          10
        </span>
      </div>
      {/* Cart Icon with Badge */}
      <div
        className="relative px-4 border-l border-gray-300 cursor-pointer"
        onClick={handleToggleCartDropdown}
      >
        <FaShoppingCart className="text-[20px]" />
        <span className="absolute -top-1 left-[30px] bg-red-500 text-white text-[8px] px-[6px] py-[1px] rounded-full font-bold">
          {totalQuantity}
        </span>
      </div>
      <div
        className="px-4 border-l border-gray-300 cursor-pointer"
        onClick={handleToggleProfileModal}
      >
        <IoIosSettings className="text-[20px]" />
      </div>
      {/* Avatar */}
      {/* <div className="flex items-center ml-[15px] gap-x-2">
        <div className="flex flex-col">
          <p className="text-foreground font-semibold text-[13px] font-monse">
            Truong Hoang Tri
          </p>
          <p className="text-end text-[11px] text-normal font-semibold font-monse">
            Admin
          </p>
        </div>
        <Image
          alt="User Avatar"
          src="/woman-1.jpg"
          width={40}
          height={40}
          className="w-[40px] h-[40px] object-cover rounded-full"
          priority
        />
      </div> */}
    </div>
  );
}
