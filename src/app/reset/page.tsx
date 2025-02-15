"use client";
import LoginHeader from "../components/LoginHeader";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { resetProgressState } from "../store/resetAtoms";

export default function ResetPage() {
  const progressState = useAtomValue(resetProgressState);

  return (
    <>
      <div className="font-inter relative w-screen h-screen overflow-hidden">
        <LoginHeader />
        {progressState === 1 && (
          <div className="flex h-full">
            {/* missing image */}
            <div className="flex w-[50%]"></div>
            <EmailForm />
          </div>
        )}
        {progressState === 2 && (
          <div className="flex h-full">
            <EmailVerification />
          </div>
        )}
        {progressState === 3 && (
          <div className="flex h-full">
            <ResetForm />
          </div>
        )}
      </div>
    </>
  );
}

function EmailForm() {
  const setProgress = useSetAtom(resetProgressState);

  const handleSubmit = () => {
    setProgress(2);
  };
  return (
    <div className="flex flex-col w-[50%] border-gray-400 border-opacity-40 border-l justify-center pl-[150px] gap-y-3 mb-[70px]">
      <p className="font-semibold 2xl:text-[40px] text-[50px] w-[80%] mt-[70px] 2xl:mt-[5px] bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-yellow-600 via-primary to-emerald-50 bg-clip-text text-transparent">
        Forgot your password? Don't worry.
      </p>
      <p className="dark:text-normal text-sm 2xl:text-[11px] w-[80%] text-black">
        First you need to enter your email, then the system will send an OTP
        code to your authenticated gmail.
      </p>
      <div className="pt-4 2xl:pt-2">
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="email"
            className="font-semibold text-sm 2xl:text-[12px] mb-1"
          >
            Email Address *
          </label>
          <div className="group flex items-center w-[70%] py-3 px-3 border space-x-4 border-gray-400 border-opacity-40 rounded-md transition-all duration-300 hover:border-opacity-80 focus-within:border-opacity-80 hover:shadow-md focus-within:shadow-md">
            <MdEmail size={20} />
            <input
              type="text"
              placeholder="hello@company.com"
              className="outline-none bg-transparent border-none w-full 2xl:text-[13px]"
            />
          </div>
          {/* <p className="text-[11px] 2xl:text-[9px] mt-1 text-dangerous">
            Your email not linked to our system.
          </p> */}
          <button
            className="mt-6 2xl:mt-3 2xl:text-sm w-[70%] border py-2 rounded-md transition-all duration-300 bg-gray-300 text-gray-500
             disabled:bg-[#141414] disabled:text-gray-600 disabled:border-gray-400 disabled:border-opacity-20
             enabled:bg-primary enabled:text-black enabled:hover:bg-black enabled:hover:text-white enabled:border-transparent enabled:hover:border-white"
            onClick={handleSubmit}
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
}

function EmailVerification() {
  const setProgress = useSetAtom(resetProgressState);

  const handleSubmit = () => {
    setProgress(3);
  };
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
    <div className="flex flex-col w-full justify-center items-center gap-y-6 min-h-screen bg-background text-foreground p-4">
      {/* Icon & Tiêu đề */}
      <IoMailUnreadOutline className="text-[60px] text-foreground" />
      <p className="text-[40px] font-semibold text-foreground">
        Please check your email.
      </p>
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
        onClick={handleSubmit}
      >
        Verify OTP
      </button>
      <div className="max-w-md text-center mb-[90px]">
        <p className="text-normal text-sm">
          We've sent a 6-digit code to{" "}
          <span className="text-primary">email123@gmail.com</span>. Enter OTP to
          reset your password.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-normal text-[11px]">
          It may take a few minutes for the email to arrive. Double-check your
          spam folder.
        </p>
        <p className="text-normal text-[11px]">
          Didn't get it?{" "}
          <span className="text-white cursor-pointer hover:underline">
            Resend Email.
          </span>
        </p>
      </div>
    </div>
  );
}

function ResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col w-full justify-center items-center gap-y-6 min-h-screen bg-background text-white p-4">
      <PiLockKeyOpenFill className="text-[60px] text-foreground" />
      <p className="text-[40px] font-semibold text-foreground">
        Enter your new password.
      </p>
      <div className="flex flex-col gap-y-2">
        <label
          htmlFor="password"
          className="font-semibold 2xl:text-[12px] mb-1 mt-3"
        >
          New Password *
        </label>
        <div className="relative group flex items-center w-[500px] py-3 px-3 border space-x-4 border-gray-400 border-opacity-40 rounded-md transition-all duration-300 hover:border-opacity-80 focus-within:border-opacity-80 hover:shadow-md focus-within:shadow-md">
          <FaKey size={20} />
          <input
            type={showPassword ? "text" : "password"} // Toggle Password Visibility
            placeholder="Set new password"
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
        <label
          htmlFor="password"
          className="font-semibold 2xl:text-[12px] mb-1 mt-3"
        >
          Confirm Password *
        </label>
        <div className="relative group flex items-center w-[500px] py-3 px-3 border space-x-4 border-gray-400 border-opacity-40 rounded-md transition-all duration-300 hover:border-opacity-80 focus-within:border-opacity-80 hover:shadow-md focus-within:shadow-md">
          <FaKey size={20} />
          <input
            type={showConfirmPassword ? "text" : "password"} // Toggle Password Visibility
            placeholder="Your confirm pass"
            className="outline-none bg-transparent border-none w-full 2xl:text-[13px]"
          />
          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 text-gray-500 hover:text-white transition"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </button>
        </div>
        <p className="text-[11px] 2xl:text-[9px] mt-1 text-dangerous">
          Wrong email or password
        </p>
        <button
          className="mt-6 mb-[100px] 2xl:mt-3 2xl:text-sm border py-2 rounded-md transition-all duration-300 bg-gray-300 text-gray-500
             disabled:bg-[#141414] disabled:text-gray-600 disabled:border-gray-400 disabled:border-opacity-20
             enabled:bg-primary enabled:text-black enabled:hover:bg-black enabled:hover:text-white enabled:border-transparent enabled:hover:border-white"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
