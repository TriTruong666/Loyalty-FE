"use client";
import LoginHeader from "../components/LoginHeader";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { PiLockKeyOpenFill } from "react-icons/pi";
import {
  dataForgetState,
  dataForgetVerifyState,
  dataResetState,
  resetProgressState,
} from "../store/resetAtoms";
import { useGetUserInfo } from "../hooks/hook";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  forgetPassService,
  resetPassService,
  verifyForgetService,
} from "../service/authenticateService";
import { showToast } from "../utils/toast";
import { Button } from "@heroui/react";

export default function ResetPage() {
  const progressState = useAtomValue(resetProgressState);
  const { data: info } = useGetUserInfo();
  const router = useRouter();
  useEffect(() => {
    const isError = info?.code === "UNKNOWN_ERROR";
    if (isError) {
      router.push("/reset");
    }
    if (!isError) {
      router.push("/dashboard");
    }
  }, [info]);
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
  const emailRef = useRef<HTMLInputElement>(null);
  const setProgress = useSetAtom(resetProgressState);
  const [submitData, setSubmitData] = useAtom(dataForgetState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const forgetMutation = useMutation({
    mutationKey: ["forget"],
    mutationFn: forgetPassService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.code === "EMAIL_DOES_NOT_BOUND_TO_ANY_EXISING_USER") {
        setError("Chúng tôi không tìm thấy email của bạn trong hệ thống.");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setProgress(2);
      }
    },
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSubmitData({
      email: value,
    });
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    if (submitData.email === "") {
      setError("Vui lòng nhập email của bạn để tiếp tục!");
      return;
    }
    if (!emailPattern.test(submitData.email)) {
      setError("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      return;
    }
    try {
      await forgetMutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex flex-col w-[50%] border-gray-400 border-opacity-40 border-l justify-center pl-[150px] gap-y-3 mb-[70px]">
      <p className="font-semibold 2xl:text-[40px] xl:text-[35px] text-[50px] w-[80%] mt-[70px] 2xl:mt-[5px] bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-yellow-600 via-primary to-emerald-50 bg-clip-text text-transparent">
        Quên mật khẩu hả? Đừng có lo nha.
      </p>
      <p className="dark:text-normal text-sm 2xl:text-[11px] xl:text-[13px] w-[80%] text-black">
        Đầu tiên bạn cần nhập email của mình, sau đó hệ thống sẽ gửi OTP mã vào
        gmail đã được xác thực của bạn.
      </p>
      <div className="pt-4 2xl:pt-2">
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="email"
            className="font-semibold text-sm 2xl:text-[12px] xl:text-[14px] mb-1"
          >
            Email *
          </label>
          <div className="relative group flex items-center w-[80%] py-3 px-3 border space-x-4 border-gray-400-40 rounded-md transition-all duration-300 hover:border-gray-400 hover:border-opacity-40 focus-within:border-gray-400 focus-within:border-opacity-40 hover:shadow-md focus-within:shadow-md">
            <MdEmail size={20} />
            <input
              ref={emailRef}
              onKeyDown={handleKeyDown}
              type="text"
              onChange={handleOnChange}
              placeholder="hello@company.com"
              className="outline-none bg-transparent border-none w-full 2xl:text-[13px] xl:text-[14px]"
            />
          </div>
          {error && (
            <p className="2xl:text-[11px] xl:text-[12px] mt-1 text-dangerous">
              {error}
            </p>
          )}

          <Button
            variant="flat"
            color="secondary"
            className="w-[80%] mt-[10px]"
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={handleSubmit}
          >
            <p>Xác thực email</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmailVerification() {
  const forgetData = useAtomValue(dataForgetState);
  const setProgress = useSetAtom(resetProgressState);
  const [isSpam, setIsSpam] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitData, setSubmitData] = useAtom<{ email: string; otp: string }>(
    dataForgetVerifyState
  );
  const forgetMutation = useMutation({
    mutationKey: ["forget"],
    mutationFn: forgetPassService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      setIsLoading(false);
    },
  });
  const verifyMutation = useMutation({
    mutationKey: ["verify-forget"],
    mutationFn: verifyForgetService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.code === "INVALID_OTP_CODE") {
        setError("OTP bạn vừa nhập không đúng, vui lòng kiểm tra lại");
        setIsLoading(false);
        return;
      }
      if (data.code === "THIS_OTP_CODE_HAS_BEEN_EXPIRED") {
        setError("OTP của bạn đã hết hạn xin vui lòng gửi lại OTP ");
        setIsLoading(false);
        return;
      } else {
        setProgress(3);
        setIsLoading(false);
      }
    },
  });
  const [otp, setOtp] = useState<string>("".padStart(6, ""));

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtpArray = otp.split("");
    newOtpArray[index] = value;
    const newOtp = newOtpArray.join("");

    setOtp(newOtp);
    setSubmitData({
      email: forgetData.email,
      otp: newOtp,
    });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    setOtp(pasteData);

    setSubmitData({
      email: forgetData.email,
      otp: pasteData,
    });

    inputRefs.current[pasteData.length]?.focus();
  };
  const handleSubmit = async () => {
    if (otp.trim() === "" || otp.length < 6) {
      setError("Vui lòng nhập đầy đủ mã OTP gồm 6 chữ số.");
      return;
    }
    try {
      await verifyMutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleResendOTP = async () => {
    try {
      await forgetMutation.mutateAsync(forgetData);
      showToast("Đã gửi lại OTP vui lòng kiểm tra gmail", "success");
      setIsSpam(true);
      setTimeout(() => {
        setIsSpam(false);
      }, 300000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col w-full justify-center items-center gap-y-6 min-h-screen bg-background text-white p-4">
      {/* Icon & Title */}
      <IoMailUnreadOutline className="text-[60px]" />
      <p className="text-[40px] font-semibold">Kiểm tra email của bạn.</p>

      {/* OTP Input Fields */}
      <div className="flex space-x-6 p-4">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={otp[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-center 
              text-2xl font-semibold text-white shadow-md shadow-black/50 
              focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
          />
        ))}
      </div>
      {error && (
        <p className="text-[12px] 2xl:text-[11px] mt-1 text-dangerous">
          {error}
        </p>
      )}
      <Button
        variant="flat"
        color="secondary"
        className="w-[30%] mt-[10px]"
        isLoading={isLoading}
        isDisabled={isLoading}
        onPress={handleSubmit}
      >
        <p>Xác nhận</p>
      </Button>

      <div className="max-w-md text-center mb-[90px]">
        <p className="text-normal text-sm">
          Hệ thống đã gửi mã OTP 6 số đến{" "}
          <span className="text-primary">{forgetData.email}</span>. Nhập OTP để
          xác minh quyền sở hữu của bạn và tiếp tục.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-normal text-[11px]">
          Có thể mất vài phút để email đến. Kiểm tra lại thư mục thư rác.
        </p>
        <p className="text-[11px] text-normal">
          OTP hết hạn?{" "}
          {isSpam ? (
            <span className="text-[11px] text-white cursor-pointer hover:underline">
              Gửi lại sau 5 phút
            </span>
          ) : (
            <span
              onClick={handleResendOTP}
              className="text-[11px] text-white cursor-pointer hover:underline"
            >
              Gửi lại OTP
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function ResetForm() {
  const forgetData = useAtomValue(dataForgetState);
  const [showPassword, setShowPassword] = useState(false);
  const [submitData, setSubmitData] = useAtom<{
    email: string;
    newPassword: string;
    confirmPassword: string;
  }>(dataResetState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const resetMutation = useMutation({
    mutationKey: ["reset-pass"],
    mutationFn: resetPassService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.code === "Password reset successfully") {
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }
      setIsLoading(false);
    },
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    if (submitData.newPassword === "" || submitData.confirmPassword === "") {
      setError("Vui lòng nhập mật khẩu mới và xác nhận mật khẩu");
      return;
    }
    if (submitData.newPassword !== submitData.confirmPassword) {
      setError("Cả hai mật khẩu phải giống nhau");
      return;
    }
    try {
      await resetMutation.mutateAsync({
        email: forgetData.email,
        newPassword: submitData.newPassword,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-full justify-center items-center gap-y-6 min-h-screen bg-background text-white p-4">
      <PiLockKeyOpenFill className="text-[60px] text-foreground" />
      <p className="text-[40px] font-semibold text-foreground">
        Tạo mật khẩu mới
      </p>
      <div className="flex flex-col gap-y-2">
        <label
          htmlFor="password"
          className="font-semibold 2xl:text-[12px] mb-1 mt-3"
        >
          Mật khẩu mới *
        </label>
        <div className="relative group flex items-center w-[500px] py-3 px-3 border space-x-4 border-gray-400-40 rounded-md transition-all duration-300 hover:border-gray-400 hover:border-opacity-40 focus-within:border-gray-400 focus-within:border-opacity-40 hover:shadow-md focus-within:shadow-md">
          <FaKey size={20} />
          <input
            onChange={handleOnChange}
            name="newPassword"
            type={showPassword ? "text" : "password"} // Toggle Password Visibility
            placeholder="Mật khẩu mới của bạn"
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
          Xác nhận mật khẩu *
        </label>
        <div className="relative group flex items-center w-[500px] py-3 px-3 border space-x-4 border-gray-400-40 rounded-md transition-all duration-300 hover:border-gray-400 hover:border-opacity-40 focus-within:border-gray-400 focus-within:border-opacity-40 hover:shadow-md focus-within:shadow-md">
          <FaKey size={20} />
          <input
            onChange={handleOnChange}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"} // Toggle Password Visibility
            placeholder="Nhập lại lần nữa"
            className="outline-none bg-transparent border-none w-full 2xl:text-[13px]"
          />
          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 text-gray-500 hover:text-white transition"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </button>
        </div>
        {error && <p className="text-[11px] mt-1 text-dangerous">{error}</p>}
        <Button
          variant="flat"
          color="secondary"
          className="w-[500px] mt-[10px]"
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={handleSubmit}
        >
          <p>Tạo lại mật khẩu</p>
        </Button>
      </div>
    </div>
  );
}
