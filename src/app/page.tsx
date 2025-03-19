"use client";
import LoginHeader from "./components/LoginHeader";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { IoMailUnreadOutline } from "react-icons/io5";
import {
  dataLoginState,
  dataVerifyOTPState,
  loginProgressState,
} from "./store/loginAtoms";
import DecryptedText from "./components/DecryptText";
import { Avatar } from "./components/Avatar";
import { useMutation } from "@tanstack/react-query";
import {
  loginService,
  verifyLoginService,
} from "./service/authenticateService";
import { useRouter } from "next/navigation";
import { showToast } from "./utils/toast";
import { useGetUserInfo } from "./hooks/hook";
import { Button } from "@heroui/react";

export default function Home() {
  const progressState = useAtomValue(loginProgressState);
  const router = useRouter();
  const { data: info } = useGetUserInfo();
  useEffect(() => {
    const isError = info?.code === "UNKNOWN_ERROR";
    if (isError) {
      router.push("/");
    }
    if (!isError) {
      router.push("/dashboard");
    }
  }, [info]);
  return (
    <div className="font-inter font-light relative w-screen h-screen overflow-hidden">
      <LoginHeader />
      {progressState === 1 && (
        <div className="flex h-full">
          <Introduce />
        </div>
      )}
      {progressState === 2 && (
        <div className="flex h-full">
          <EmailVerification />
        </div>
      )}
    </div>
  );
}

function Introduce() {
  return (
    <div className="flex flex-col w-[50%] border-r h-full border-gray-400 border-opacity-40 justify-center pl-[150px] gap-y-3">
      <div className="w-[80%]">
        <DecryptedText
          text="Hi, chào mừng bạn đã đến với nền tảng Loyalty Picare."
          characters="LTAOTY!Hchád"
          animateOn="view"
          encryptedClassName="font-semibold xl:text-[25px] 2xl:text-[30px] text-[40px] w-[80%] mt-[70px] 2xl:mt-[5px] bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-yellow-600 via-primary to-emerald-50 bg-clip-text text-transparent"
          revealDirection="start"
          maxIterations={10}
          sequential
          speed={60}
          className="font-semibold xl:text-[25px] 2xl:text-[30px] text-[40px] w-[80%] mt-[70px] 2xl:mt-[5px] bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-yellow-600 via-primary to-emerald-50 bg-clip-text text-transparent"
        />
      </div>

      <p className="dark:text-normal text-sm xl:text-[10px] 2xl:text-[11px] w-[80%] text-black">
        Chúng tôi cung cấp giải pháp toàn diện, giúp khách hàng xây dựng mối
        quan hệ gắn kết bền vững, gia tăng lợi nhuận và nâng tầm dịch vụ. Với hệ
        thống quản lý điểm thưởng linh hoạt và các chương trình ưu đãi hấp dẫn,
        chúng tôi cam kết mang đến cho bạn những trải nghiệm tuyệt vời.
      </p>
      <div className="pt-4 xl:pt-1 2xl:pt-2">
        <LoginForm />
      </div>
      <div className="pt-4 xl:pt-1 2xl:pt-2 mt-[20px] 2xl:mb-[0] mb-[120px]">
        <Participants />
      </div>
    </div>
  );
}

function LoginForm() {
  const [submitData, setSubmitData] = useAtom(dataLoginState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const setProgress = useSetAtom(loginProgressState);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.code === "INVALID_EMAIL_OR_PASSWORD") {
        setError("Thử lại, sai email hoặc mật khẩu");
        setIsLoading(false);
      }
      if (data.code === "ACCOUNT_HAS_NOT_BEEN_ACTIVATED") {
        setError(
          "Tài khoản của bạn đã bị khoá! Vui lòng gửi mail đến picareloyalty@gmail.com để được hỗ trợ"
        );
        setIsLoading(false);
      }
      if (data.message === "Login successfully") {
        setIsLoading(false);
        setProgress(2);
      }
      setIsLoading(false);
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubmitData((prev) => ({ ...prev, [name]: value }));
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    if (submitData.email === "" || submitData.pass === "") {
      setError("Vui lòng nhập đủ thông tin đăng nhập");
      return;
    }

    if (!emailPattern.test(submitData.email)) {
      setError("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      return;
    }

    try {
      await loginMutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {/* Email Field */}
      <label
        htmlFor="email"
        className="font-semibold text-sm 2xl:text-[12px] xl:text-[13px] mb-1"
      >
        Email *
      </label>
      <div className="relative group flex items-center w-[80%] py-3 px-3 border space-x-4 border-gray-400-40 rounded-md transition-all duration-300 hover:border-gray-400 hover:border-opacity-40 focus-within:border-gray-400 focus-within:border-opacity-40 hover:shadow-md focus-within:shadow-md">
        <MdEmail size={20} />
        <input
          onChange={handleOnChange}
          name="email"
          type="text"
          placeholder="hello@company.com"
          className="outline-none bg-transparent border-none w-full 2xl:text-[13px]"
          onKeyDown={handleKeyDown} // Add keydown listener
        />
      </div>

      {/* Password Field */}
      <label
        htmlFor="password"
        className="font-semibold 2xl:text-[12px] xl:text-[13px] mb-1 mt-3"
      >
        Mật khẩu *
      </label>
      <div className="relative group flex items-center w-[80%] py-3 px-3 border space-x-4 border-gray-400-40 rounded-md transition-all duration-300 hover:border-gray-400 hover:border-opacity-40 focus-within:border-gray-400 focus-within:border-opacity-40 hover:shadow-md focus-within:shadow-md">
        <FaKey size={20} />
        <input
          ref={passwordRef}
          onChange={handleOnChange}
          name="pass"
          type={showPassword ? "text" : "password"} // Toggle Password Visibility
          placeholder="yourpass123"
          className="outline-none bg-transparent border-none w-full 2xl:text-[13px]"
          onKeyDown={handleKeyDown} // Add keydown listener
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
      {error && <p className="2xl:text-[11px] mt-1 text-dangerous">{error}</p>}

      {/* Submit Button */}
      <Button
        variant="flat"
        color="secondary"
        className="w-[80%] mt-[10px]"
        isLoading={isLoading}
        isDisabled={isLoading}
        onPress={handleSubmit}
      >
        <p>Đăng nhập</p>
      </Button>
    </div>
  );
}

function Participants() {
  return (
    <div className="flex flex-col mb-[10px]">
      {/* Stacked Images */}
      <div className="flex">
        <div className="flex xl:mt-[-10px]">
          <Avatar
            name="Cty TNHH Trung Hanh"
            role="Doanh nghiệp"
            className="-ml-2 first:ml-0"
          />
          <Avatar
            name="Truong Hoang Tri"
            role="Cá nhân"
            className="-ml-2 first:ml-0"
          />
          <Avatar
            name="Sang Ngoc"
            role="Cá nhân"
            className="-ml-2 first:ml-0"
          />
          <Avatar
            name="Long Châu"
            role="Doanh nghiệp"
            className="-ml-2 first:ml-0"
          />
          <Avatar
            name="Pharmacity"
            role="Doanh nghiệp"
            className="-ml-2 first:ml-0"
          />
        </div>
      </div>

      {/* Verified Message */}
      <div className="flex items-center gap-x-3 mt-2">
        <FaCircleCheck className="dark:text-normal text-black 2xl:text-[14px]" />
        <p className="text-sm dark:text-normal text-black xl:text-[12px] 2xl:text-[12px]">
          +36 doanh nghiệp & cá nhân đã tham gia Loyalty.
        </p>
      </div>
    </div>
  );
}

function EmailVerification() {
  const loginData = useAtomValue(dataLoginState);
  const [submitData, setSubmitData] = useAtom<{ email: string; pass: string }>(
    dataVerifyOTPState
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSpam, setIsSpam] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState<string>("".padStart(6, ""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginService,
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      setIsLoading(false);
    },
  });
  const verifyMutation = useMutation({
    mutationKey: ["verify-login"],
    mutationFn: verifyLoginService,
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
        if (typeof window !== "undefined") {
          window.location.href = "/dashboard";
        }
        setIsLoading(false);
      }
    },
  });

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtpArray = otp.split("");
    newOtpArray[index] = value;
    const newOtp = newOtpArray.join("");

    setOtp(newOtp);
    setSubmitData({
      email: loginData.email,
      pass: newOtp,
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
      email: loginData.email,
      pass: pasteData,
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
      await loginMutation.mutateAsync(loginData);
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
          <span className="text-primary">{loginData.email}</span>. Nhập OTP để
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
