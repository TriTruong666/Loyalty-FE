"use client"; // Ensure this runs only on the client
import Image from "next/image";
import Link from "next/link";
import { MdOutlineNavigateNext } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useSetAtom } from "jotai";
import { resetProgressState } from "../store/resetAtoms";
import { loginProgressState } from "../store/loginAtoms";
import { useTheme } from "./ThemeProvider";
import { BsMoon, BsSun } from "react-icons/bs";

export default function LoginHeader() {
  const pathName = usePathname();
  const setResetState = useSetAtom(resetProgressState);
  const setLoginState = useSetAtom(loginProgressState);

  const handleResetState = () => {
    setResetState(1);
    setLoginState(1);
  };

  return (
    <div className="flex items-center justify-between px-6 py-2 border-b border-gray-400 border-opacity-40">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo-dark2.png"
          alt="Logo"
          width={200}
          height={60}
          className="w-fit h-[60px] object-cover"
        />
      </div>

      {/* <ThemeToggle /> */}

      {pathName === "/reset" ? (
        <div className="flex items-center space-x-5">
          <p className="text-normal font-light 2xl:text-sm">
            Just remember it?
          </p>
          <Link
            href="/"
            onClick={handleResetState}
            className="relative 2xl:text-sm text-black dark:text-white hover:underline"
          >
            Sign in
          </Link>
          <MdOutlineNavigateNext className="text-primary text-[24px] 2xl:text-[20px]" />
        </div>
      ) : (
        <div className="flex items-center space-x-5">
          <p className="text-normal font-light 2xl:text-sm">
            Forget your account?
          </p>
          <Link
            href="/reset"
            onClick={handleResetState}
            className="relative 2xl:text-sm text-black dark:text-white hover:underline"
          >
            Reset account
          </Link>
          <MdOutlineNavigateNext className="text-primary text-[24px] 2xl:text-[20px]" />
        </div>
      )}
    </div>
  );
}

// ✅ Theme Toggle Button Component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700
                 text-black dark:text-white flex items-center gap-2 transition-all duration-300"
    >
      {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
    </button>
  );
}
