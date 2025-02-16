"use client";
import LoginHeader from "./components/LoginHeader";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import { useAtomValue, useSetAtom } from "jotai";
import { IoMailUnreadOutline } from "react-icons/io5";
import { loginProgressState } from "./store/loginAtoms";

export default function Home() {
  const progressState = useAtomValue(loginProgressState);
  return (
    <>
      <div className="font-inter font-light relative w-screen h-screen overflow-hidden">
        <LoginHeader />
        {progressState === 1 && (
          <div className="flex h-full">
            <Introduce />
            {/* missing image section */}
          </div>
        )}
        {progressState === 2 && (
          <div className="flex h-full">
            <EmailVerification />
            {/* missing image section */}
          </div>
        )}
      </div>
    </>
  );
}

function Introduce() {
  return (
    <div className="flex flex-col w-[50%] border-r h-full border-gray-400 border-opacity-40 justify-center pl-[150px] gap-y-3">
      <p className="font-semibold 2xl:text-[40px] text-[50px] w-[80%] mt-[70px] 2xl:mt-[5px] bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-yellow-600 via-primary to-emerald-50 bg-clip-text text-transparent">
        Loyalty happy to see you, friends.
      </p>
      <p className="dark:text-normal text-sm 2xl:text-[11px] w-[80%] text-black">
        Loyalty is a platform that helps pharmaceutical retailers buy in bulk
        from trusted suppliers. We offer competitive pricing, a seamless
        ordering process, and reliable product quality.
      </p>
      <div className="pt-4 2xl:pt-2">
        <LoginForm />
      </div>
      <div className="pt-4 2xl:pt-2 mt-[20px] 2xl:mb-[10px] mb-[60px]">
        <Participants />
      </div>
      <p className="dark:text-normal text-black text-[11px] 2xl:text-[9px] w-[80%] font-light 2xl:mb-[50px] mb-[180px]">
        Loyalty™ is a trademarked platform dedicated to helping pharmaceutical
        retailers purchase in bulk efficiently. Our brand name, logo, and
        associated materials are legally protected, ensuring authenticity and
        trust in the industry. Unauthorized use, reproduction, or imitation of
        Loyalty’s intellectual property is strictly prohibited.
      </p>
    </div>
  );
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const setProgress = useSetAtom(loginProgressState);
  const handleSubmit = () => {
    setProgress(2);
  };
  return (
    <div className="flex flex-col gap-y-2">
      {/* Email Field */}
      <label
        htmlFor="email"
        className="font-semibold text-sm 2xl:text-[12px] mb-1"
      >
        Email Address *
      </label>
      <div className="relative group flex items-center w-[80%] py-3 px-3 border space-x-4 border-gray-400-40 rounded-md transition-all duration-300 hover:border-gray-400 hover:border-opacity-40 focus-within:border-gray-400 focus-within:border-opacity-40 hover:shadow-md focus-within:shadow-md">
        <MdEmail size={20} />
        <input
          type="text"
          placeholder="hello@company.com"
          className="outline-none bg-transparent border-none w-full 2xl:text-[13px]"
        />
      </div>

      {/* Password Field */}
      <label
        htmlFor="password"
        className="font-semibold 2xl:text-[12px] mb-1 mt-3"
      >
        Password *
      </label>
      <div className="relative group flex items-center w-[80%] py-3 px-3 border space-x-4 border-gray-400-40 rounded-md transition-all duration-300 hover:border-gray-400 hover:border-opacity-40 focus-within:border-gray-400 focus-within:border-opacity-40 hover:shadow-md focus-within:shadow-md">
        <FaKey size={20} />
        <input
          type={showPassword ? "text" : "password"} // Toggle Password Visibility
          placeholder="yourpass123"
          className="outline-none bg-transparent border-none w-full 2xl:text-[13px]"
        />
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-gray-500 hover:text-white transition"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={22} />
          ) : (
            <AiOutlineEye size={22} />
          )}
        </button>
      </div>
      {/* <p className="text-[11px] 2xl:text-[9px] mt-1 text-dangerous">
        Wrong email or password
      </p> */}
      {/* Submit Button */}
      <button
        className="mt-6 2xl:mt-3 2xl:text-sm w-[80%] border py-2 rounded-md transition-all duration-300 bg-gray-300 text-gray-500
             disabled:bg-[#141414] disabled:text-gray-600 disabled:border-gray-400 disabled:border-opacity-20
             enabled:bg-primary enabled:text-black enabled:hover:bg-black enabled:hover:text-white enabled:border-transparent enabled:hover:border-white"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
}

function Participants() {
  return (
    <div className="flex flex-col mb-[10px]">
      {/* Stacked Images */}
      <div className="flex">
        <div className="flex">
          <Image
            alt=""
            src="/woman-1.jpg"
            width={30}
            height={30}
            className="w-[30px] h-[30px] rounded-full object-cover border-2 -ml-2 first:ml-0"
          />
          <Image
            alt=""
            src="/woman-1.jpg"
            width={30}
            height={30}
            className="w-[30px] h-[30px] rounded-full object-cover border-2 -ml-2 first:ml-0"
          />
          <Image
            alt=""
            src="/woman-1.jpg"
            width={30}
            height={30}
            className="w-[30px] h-[30px] rounded-full object-cover border-2 -ml-2 first:ml-0"
          />
          <Image
            alt=""
            src="/woman-1.jpg"
            width={30}
            height={30}
            className="w-[30px] h-[30px] rounded-full object-cover border-2 -ml-2 first:ml-0"
          />
          <Image
            alt=""
            src="/woman-1.jpg"
            width={30}
            height={30}
            className="w-[30px] h-[30px] rounded-full object-cover border-2 -ml-2 first:ml-0"
          />
          <Image
            alt=""
            src="/woman-1.jpg"
            width={30}
            height={30}
            className="w-[30px] h-[30px] rounded-full object-cover border-2 -ml-2 first:ml-0"
          />
        </div>
      </div>

      {/* Verified Message */}
      <div className="flex items-center gap-x-3 mt-2">
        <FaCircleCheck className="dark:text-normal text-black 2xl:text-[14px]" />
        <p className="text-sm dark:text-normal text-black 2xl:text-[12px]">
          +36 retailers became members of Loyalty.
        </p>
      </div>
    </div>
  );
}

function EmailVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = pasteData.concat(Array(6 - pasteData.length).fill(""));
    setOtp(newOtp);
    inputRefs.current[newOtp.findIndex((val) => val === "")]?.focus();
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-y-6 min-h-screen bg-background text-white p-4">
      {/* Icon & Tiêu đề */}
      <IoMailUnreadOutline className="text-[60px]" />
      <p className="text-[40px] font-semibold">Please check your email.</p>
      {/* OTP Input Fields */}
      <div className="flex space-x-6 p-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-center 
              text-2xl font-semibold text-white shadow-md shadow-black/50 
              focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
          />
        ))}
      </div>
      <button
        className="mt-6 2xl:mt-3 2xl:text-sm w-[30%] border py-2 rounded-md transition-all duration-300 bg-gray-300 text-gray-500
             disabled:bg-[#141414] disabled:text-gray-600 disabled:border-gray-400 disabled:border-opacity-20
             enabled:bg-primary enabled:text-black enabled:hover:bg-black enabled:hover:text-white enabled:border-transparent enabled:hover:border-white"
      >
        Verify OTP
      </button>
      <div className="max-w-md text-center mb-[90px]">
        <p className="text-normal text-sm">
          We&apos;ve sent a 6-digit code to{" "}
          <span className="text-primary">email123@gmail.com</span>. Enter OTP to
          verify your ownership and continue.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-normal text-[11px]">
          It may take a few minutes for the email to arrive. Double-check your
          spam folder.
        </p>
        <p className="text-normal text-[11px]">
          Didn&apos;t get it?{" "}
          <span className="text-white cursor-pointer hover:underline">
            Resend Email.
          </span>
        </p>
      </div>
    </div>
  );
}
