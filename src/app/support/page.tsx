"use client";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { IoIosArrowRoundBack, IoIosGlobe, IoMdSend } from "react-icons/io";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { useAtomValue } from "jotai";
import { userInfoState } from "../store/accountAtoms";
import { showToast } from "../utils/toast";
import { formatDateTime } from "../utils/format";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

export default function SupportPage() {
  const info = useAtomValue(userInfoState);
  const [submitData, setSubmitData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  useEffect(() => {
    if (info) {
      setSubmitData((prev) => ({
        ...prev,
        from_name: info?.userName || "",
        from_email: info?.email || "",
      }));
    }
  }, [info]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmitData({
      ...submitData,
      message: e.target.value,
    });
  };
  const handleSendMail = async () => {
    if (!submitData.message.trim()) {
      showToast("Vui lòng nhập yêu cầu trước khi gửi", "error");
      return;
    }
    if (!submitData.from_email || !submitData.from_name) {
      showToast(
        "Thông tin người dùng chưa sẵn sàng, vui lòng thử lại sau.",
        "error"
      );
      return;
    }

    const now = new Date().toString();
    const formattedTime = formatDateTime(now);

    const templateParamsForUser = {
      from_name: info?.userName,
      message: submitData.message,
      email: info?.email,
    };

    const templateParamsForAdmin = {
      name: info?.userName,
      email: info?.email,
      message: submitData.message,
      time: formattedTime,
    };

    try {
      // Gửi song song cả 2 email
      await Promise.all([
        emailjs.send(
          SERVICE_ID || "",
          "template_x3t6svn", // template dành cho khách
          templateParamsForUser,
          PUBLIC_KEY || ""
        ),
        emailjs.send(
          SERVICE_ID || "",
          "template_ou5qjvd", // template dành cho admin
          templateParamsForAdmin,
          PUBLIC_KEY || ""
        ),
      ]);

      showToast("Yêu cầu của bạn đã được gửi.", "success");
      setSubmitData({ ...submitData, message: "" });
    } catch (error) {
      showToast("Gửi yêu cầu thất bại, vui lòng thử lại.", "error");
      console.error(error);
    }
  };

  const handleGoToPolicyDebt = () => {
    if (typeof window !== undefined) {
      window.location.href = "/policies/thanh-toan";
    }
  };
  const accordionList: AccordionProps[] = [
    {
      key: 1,
      title: "Tài khoản của bạn đã bị khoá!",
      content: (
        <div className="flex flex-col w-full gap-y-[25px] pb-[20px]">
          <p className="text-sm text-normal leading-7">
            Đây là trường hợp dành cho các tài khoản bị vi phạm nghiêm trọng về
            việc sử dụng dịch vụ của chúng tôi, các vi phạm bao gồm:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-[20px] text-normal text-sm">
            <li>Thực hiện tấn công hệ thống nhằm mục đích thay đổi dữ liệu.</li>
            <li>Spam đơn hàng nhưng không mua hàng.</li>
          </ul>
          <p className="text-sm text-normal leading-7">
            Sau khi tài khoản bị khoá, email của bạn sẽ được gửi thông báo, bạn
            có thể liên hệ cho admin thông qua{" "}
            <span className="font-semibold text-blue-600">Facebook</span> hoặc
            gửi mail qua{" "}
            <span className="underline text-purple-500">
              tritruonghoang3@gmail.com
            </span>
          </p>
        </div>
      ),
    },
    {
      key: 2,
      title: "Hiện tại bạn đang có đơn công nợ và chưa được thanh toán",
      content: (
        <div className="flex flex-col w-full gap-y-[25px] pb-[20px]">
          <p className="text-sm font-semibold">Hình minh hoạ: </p>
          <div className="flex items-center w-full justify-center">
            <Image
              alt=""
              src="/76.png"
              width={600}
              height={350}
              className="object-cover border border-neutral-800 border-opacity-70"
            />
          </div>
          <p className="text-sm text-normal leading-7">
            Nếu bạn gặp trường hợp như trên thì đó là do bạn đang có đơn{" "}
            <span className="text-danger-500 font-semibold">Công Nợ</span> , để
            có thể mua tiếp tục bạn cần phải tiến hành{" "}
            <span className="font-semibold text-primary">
              thanh toán đầy đủ
            </span>{" "}
            và đơn hàng đó phải được{" "}
            <span className="font-semibold text-success-300">
              Giao thành công
            </span>{" "}
            . Chi tiết về{" "}
            <span className="text-danger-500 font-semibold">Công Nợ</span> bạn
            có thể xem{" "}
            <span
              onClick={handleGoToPolicyDebt}
              className="underline cursor-pointer"
            >
              Tại đây
            </span>
          </p>
        </div>
      ),
    },
    {
      key: 3,
      title: "PicareVN Loyalty có thể sử dụng trên thiết bị di động không?",
      content: (
        <div className="flex flex-col w-full gap-y-[25px] pb-[20px]">
          <p className="text-sm text-normal leading-7">
            Hiện tại PicareVN Loyalty{" "}
            <span className="text-danger-400 font-semibold">chưa hỗ trợ</span>{" "}
            sử dụng trên thiết bị di động. Tuy nhiên, đây chỉ mới là version đầu
            tiên nên chúng tôi đang có kế hoạch phát triển thêm phiên bản trên
            thiết bị di động ở những version sau, bạn có thể tải nó trên{" "}
            <span className="font-semibold text-foreground">IOS</span> hoặc{" "}
            <span className="font-semibold text-foreground">Android</span>.
          </p>
        </div>
      ),
    },
    {
      key: 4,
      title: "Trang này hiện chưa hoạt động với tài khoản của bạn!!!",
      content: (
        <div className="flex flex-col w-full gap-y-[25px] pb-[20px]">
          <p className="text-sm text-normal leading-7">
            Quý khách hiện tại sẽ không thể sử dụng trang{" "}
            <span className="text-foreground font-semibold">Tổng quan</span> bởi
            vì hiện tại chúng tôi vẫn chưa có đủ dữ liệu để thống kê những số
            liệu cần thiết cho quý khách hàng. Tuy nhiên, những phiên bản tiếp
            theo chúng tôi sẽ hoàn thành trang{" "}
            <span className="text-foreground font-semibold">Tổng quan</span> cho
            quý khách.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col min-h-screen p-[30px] w-screen overflow-hidden bg-background font-open">
      <Toaster position="top-center" reverseOrder={false} />
      <Link
        color="foreground"
        href="/dashboard"
        className="flex items-center text-normal gap-x-[10px] w-fit"
      >
        <IoIosArrowRoundBack className="text-[20px]" />
        <p className="font-light">Quay lại</p>
      </Link>
      {/* FAQ */}
      <div className="flex justify-between px-[40px] py-[60px]">
        <div className="flex flex-col gap-y-[10px]">
          <p className="font-semibold text-[26px]">Tổng quan FAQs</p>
          <p className="font-light text-[13px] max-w-[90%]">
            Đây là những thắc mắc mà quý khách có thể gặp phải trong quá trình
            sử dụng website Loyalty. Nếu bạn có bất kỳ câu hỏi nào có thể gửi
            ticket cho chùng tôi hoặc liên hệ:{" "}
          </p>
          <ul className="flex items-center list-none mt-[30px]">
            <li className="relative mx-2 group">
              <a
                href="https://shopduocmypham.com/"
                aria-label="picare"
                data-social="picare"
                className="relative flex justify-center items-center w-12 h-12 bg-white text-gray-600 transition-all duration-300 ease-in-out group-hover:text-white group-hover:shadow-lg overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-full h-0 bg-green-600 transition-all duration-300 ease-in-out group-hover:h-full z-0" />
                <IoIosGlobe className="z-10 text-[26px]" />
              </a>

              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-white bg-black rounded-full py-[2px] px-[10px] text-sm opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:top-[-50px]">
                PicareVN
              </div>
            </li>
            <li className="relative mx-2 group">
              <a
                href="https://www.facebook.com/PiCareShopDuocMyPhamCaoCap"
                aria-label="facebook"
                data-social="facebook"
                className="relative flex justify-center items-center w-12 h-12 bg-white text-gray-600 transition-all duration-300 ease-in-out group-hover:text-white group-hover:shadow-lg overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-full h-0 bg-blue-700 transition-all duration-300 ease-in-out group-hover:h-full z-0" />
                <FaFacebook className="z-10 text-[26px]" />
              </a>

              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-white bg-black rounded-full py-[2px] px-[10px] text-sm opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:top-[-50px]">
                Facebook
              </div>
            </li>
            <li className="relative mx-2 group">
              <a
                href="https://www.tiktok.com/@picare.vn"
                aria-label="tiktok"
                data-social="tiktok"
                className="relative flex justify-center items-center w-12 h-12  bg-white text-gray-600 transition-all duration-300 ease-in-out group-hover:text-white group-hover:shadow-lg overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-300  7890 ease-in-out group-hover:h-full z-0" />
                <FaTiktok className="z-10 text-[26px]" />
              </a>

              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-white bg-black rounded-full py-[2px] px-[10px] text-sm opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:top-[-50px]">
                Tiktok
              </div>
            </li>
            <li className="relative mx-2 group">
              <a
                href="https://www.instagram.com/htriii2603"
                aria-label="ig"
                data-social="ig"
                className="relative flex justify-center items-center w-12 h-12 bg-white text-gray-600 transition-all duration-300 ease-in-out group-hover:text-white group-hover:shadow-lg overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-full h-0 bg-pink-500 transition-all duration-300 ease-in-out group-hover:h-full z-0" />
                <FaInstagram className="z-10 text-[26px]" />
              </a>

              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-white bg-black rounded-full py-[2px] px-[10px] text-sm opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:top-[-50px]">
                Instagram
              </div>
            </li>
          </ul>
        </div>
        <Accordion variant="light">
          {accordionList.map((item) => (
            <AccordionItem
              key={item.key}
              aria-label={item.title}
              title={item.title}
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {/* Mail Support */}
      <div className="w-full flex flex-col items-center mt-[40px] gap-y-[10px] mb-[150px]">
        <p className="font-semibold text-[32px]">Gửi yêu cầu hỗ trợ</p>
        <p className="font-light text-normal text-sm max-w-[45%] text-center">
          Yêu cầu hỗ trợ của bạn sẽ được xử lý trong vòng 1-2 ngày, bạn sẽ nhận
          được mail phản hồi trong thời gian đó, trong quá trình hỗ trợ có thể
          website sẽ bị gián đoạn nếu gặp trường hợp đặc biệt, mong quý khách
          thông cảm.
        </p>
        <div className="flex items-center gap-[20px] w-full max-w-2xl mt-[20px]">
          {/* input */}
          <input
            type="text"
            name="message"
            value={submitData.message}
            onChange={handleOnChange}
            placeholder="Nhập miêu tả yêu cầu..."
            className="flex-1 h-12 rounded-md px-[20px] outline-none bg-transparent border border-neutral-800 border-opacity-45 hover:border-white/20 focus:border-white/20 duration-300 transition-all"
          />

          {/* button */}
          <button
            onClick={handleSendMail}
            className="h-12 w-[130px] group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-neutral-800 border-opacity-45 hover:border-white/20 "
          >
            <span className="text-lg">
              <IoMdSend className="text-[22px]" />
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  key: number;
  title: string;
  content: ReactNode;
}
