"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import Dock from "./Dock";
import {
  IoBookOutline,
  IoDiamondOutline,
  IoExitOutline,
  IoInformationCircleOutline,
  IoShieldCheckmark,
  IoSparklesSharp,
} from "react-icons/io5";
import RotatingText from "./RotatingText";
import { AnimatePresence, motion } from "framer-motion";
import GlitchText from "./GlitchText";
import ShinyText from "./ShinyText";
import CountUp from "./CountUp";
import FlowingMenu from "./FlowingMenu";
import {
  FaArrowDown,
  FaCalculator,
  FaHeart,
  FaRegCreditCard,
} from "react-icons/fa";
import SpotlightCard from "./SpotlightCard";
import { FaRankingStar } from "react-icons/fa6";
import { IoIosGift } from "react-icons/io";
import { TbRobotFace } from "react-icons/tb";
import Image from "next/image";
import Squares from "./Squares";
import { useCountAllCustomer } from "../hooks/hook";

interface FeaturedCardProps {
  id?: number;
  icon: ReactNode;
  title: string;
  content: string;
  color?: string;
}

export default function WelcomeComponent() {
  const { data: count, isLoading } = useCountAllCustomer();
  const [visibleSection, setVisibleSection] = useState(0);
  const [showModal, setShowModal] = useState<boolean | null>(true);
  const totalCustomer =
    Number(count?.independentCustomer) + Number(count?.saleCustomer);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal");
      if (!hasSeenModal) {
        localStorage.setItem("hasSeenWelcomeModal", "true");
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, []);

  const items = [
    {
      icon: <IoInformationCircleOutline size={18} />,
      label: "Giới thiệu",
      onClick: () => {
        const section = document.getElementById("1");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: <IoBookOutline size={18} />,
      label: "Hướng dẫn",
      onClick: () => {
        const section = document.getElementById("7");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: <IoDiamondOutline size={18} />,
      label: "Loyalty",
      onClick: () => {
        const section = document.getElementById("17");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: <IoExitOutline size={18} />,
      label: "Trở về",
      onClick: () => {
        const section = document.getElementById("21");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
  ];
  const featuredItems: FeaturedCardProps[] = [
    {
      id: 1,
      title: "Tích điểm tự động",
      content:
        "Bạn sẽ luôn nhận được điểm thưởng khi mua hàng - mua nhiều thì tích điểm cao đó nha 🤣",
      icon: <FaCalculator className="text-[28px]" />,
      color: "rgba(255, 99, 132, 0.3)",
    },
    {
      id: 2,
      title: "Ưu đãi & Quà tặng?",
      content:
        "Tích điểm cao để lấy chiết khấu thôi ư? Không, tụi tui còn tặng quà cho bạn nữa á 💖",
      icon: <IoIosGift className="text-[28px]" />,
      color: "rgba(54, 162, 235, 0.3)",
    },
    {
      id: 3,
      title: "Hệ thống phân hạng",
      content:
        "Điểm càng cao thì bạn sẽ được thăng hạng, hạng càng cao thì được `ĐUA TOP` luôn 😜",
      icon: <FaRankingStar className="text-[28px]" />,
      color: "rgba(255, 206, 86, 0.3)",
    },
    {
      id: 7,
      title: "Loyalty Chatbot",
      content:
        "Hệ thống có Chatbot riêng để giúp khách hàng tìm kiếm thông tin nhanh chóng, giúp bạn tiết kiệm ⏱️",
      icon: <TbRobotFace className="text-[28px]" />,
      color: "rgba(0, 229, 255, 0.3)",
    },
    {
      id: 8,
      title: "Thanh toán dễ dàng",
      content:
        "Hệ thống thanh toán đa dạng, bạn có thể mua hàng mà `TRẢ SAU` cũng được 🫨",
      icon: <FaRegCreditCard className="text-[28px]" />,
      color: "rgba(255, 255, 255, 0.3)",
    },
    {
      id: 5,
      title: "Hỗ trợ 24/7",
      content:
        "Không chỉ CSKH chăm sóc bạn đâu, mà chúng tôi còn có cả BOT để hỗ trợ bạn luôn đó 🥰",
      icon: <FaHeart className="text-[28px]" />,
      color: "rgba(153, 102, 255, 0.3)",
    },
    {
      id: 4,
      title: "Bảo mật nâng cao",
      content:
        "Hệ thống của Loyalty sẵn sàng bảo vệ bạn trước các cuộc tấn công đánh cắp thông tin 😉",
      icon: <IoShieldCheckmark className="text-[28px]" />,
      color: "rgba(75, 192, 192, 0.3)",
    },

    {
      id: 6,
      title: "Trải nghiệm tuyệt vời",
      content:
        "Đội ngũ Loyalty tăng trải nghiệm bằng cách thiết kế UI/UX để bạn cảm thấy thoải mái nhất 😎",
      icon: <IoSparklesSharp className="text-[28px]" />,
      color: "rgba(255, 159, 64, 0.3)",
    },
  ];
  const demoItems = [
    {
      link: "https://easydew.vn/",
      text: "Easydew",
      image: "/brand2.png",
    },
    {
      link: "https://sebamed.com.vn/",
      text: "Sebamed",
      image: "/brand5.png",
    },
    {
      link: "https://drciccarelli.vn/",
      text: "Dr.Ciccarelli",
      image: "/brand-dr-ci.png",
    },
    {
      link: "https://shopduocmypham.com/collections/eclat-du-teint?srsltid=AfmBOorRGOS0oYZdp1SLSdSoo8OX_7s-K90O3bwQ8Oc4BtJQ92qWfqTH",
      text: "Eclat Du Teint",
      image: "/brand3.png",
    },
    {
      link: "https://shopduocmypham.com/collections/pax-moly?srsltid=AfmBOoqnOZSitRF0_xbjbGp8DCFkHjezlRf4e-0PAdxbP5AMWD5qe80n",
      text: "Pax Moly",
      image: "/brand6.png",
    },
  ];
  const sections = [
    {
      id: 1,
      content: (
        <div className="flex items-center justify-center gap-x-[15px] h-screen relative">
          <p className="font-bold text-[50px] cursor-default">PicareVN</p>
          <RotatingText
            texts={[
              "Xin chào",
              "Welcome",
              "안녕하세요",
              "こんにちは",
              "Bonjour",
              "สวัสดี",
              "你好",
              "Привет",
            ]}
            mainClassName="px-2 bg-primary font-bold text-[50px] cursor-default font-poppins text-black overflow-hidden py-1 rounded-lg"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.05}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 40, stiffness: 400 }}
            rotationInterval={3000}
          />
          <ScrollDown />
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="text-[40px]"
          >
            1.0Version
          </GlitchText>
        </div>
      ),
    },

    {
      id: 3,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          {visibleSection === 3 && (
            <>
              <CountUp
                from={0}
                to={Number(totalCustomer)}
                separator=","
                direction="up"
                duration={2}
                delay={2}
                className="font-bold text-[70px] bg-gradient-to-b from-yellow-500 via-purple-500 to-orange-500 text-transparent bg-clip-text"
                startWhen={visibleSection === 3 && !isLoading}
                onEnd={() => {
                  const section = document.getElementById("4");
                  if (section) {
                    setTimeout(() => {
                      section.scrollIntoView({ behavior: "smooth" });
                    }, 7000);
                  }
                }}
              />
              <p className="text-[24px] text-normal">
                Khách hàng thân thiết đã tham gia{" "}
                <strong className="text-primary">Loyalty</strong>. Có cả bạn nữa
                đó ❤️
              </p>
            </>
          )}
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <ShinyText
            text="Thương hiệu độc quyền PicareVN"
            disabled={false}
            speed={3}
            className="text-[40px]"
          />
          <div className="3xl:h-[660px] 2xl:h-[500px] w-full mt-[30px]">
            <FlowingMenu items={demoItems} />
          </div>
        </div>
      ),
    },
    {
      id: 5,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen px-[80px]">
          <div className="grid grid-cols-4 justify-between w-full gap-[20px]">
            {(featuredItems ?? []).map((item) => (
              <SpotlightCard
                key={item.id}
                className="custom-spotlight-card"
                spotlightColor={item.color as string}
              >
                <div className="flex flex-col gap-y-[20px] font-inter">
                  <div className="">{item.icon}</div>
                  <p className="font-bold text-[22px]">{item.title}</p>
                  <p className="text-sm text-normal">{item.content}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 6,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen font-open px-[60px]">
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }} // Start smaller and transparent
            animate={visibleSection === 6 ? { opacity: 1, scale: 1 } : {}} // Animate to visible
            exit={{ opacity: 0, scale: 0.8 }} // Exit animation
            transition={{ duration: 0.5, ease: "easeOut" }} // Transition settings
            className="text-[18px] leading-10"
          >
            <strong className="font-bold text-primary">PicareVN Loyalty</strong>{" "}
            là hệ thống chăm sóc khách hàng thân thiết được phát triển nhằm tri
            ân và gắn kết lâu dài với khách hàng đã và đang tin tưởng sử dụng
            sản phẩm, dịch vụ của PicareVN. Với mục tiêu mang đến nhiều lợi ích
            thiết thực, hệ thống này cho phép khách hàng mua sản phẩm với mức
            giá ưu đãi hơn, đồng thời tích lũy điểm thưởng thông qua mỗi lần mua
            sắm. Điểm tích lũy có thể được quy đổi thành các mức giảm giá hấp
            dẫn hoặc các phần quà độc quyền, giúp việc mua sắm trở nên tiết kiệm
            và thú vị hơn bao giờ hết.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }} // Start smaller and transparent
            animate={visibleSection === 6 ? { opacity: 1, scale: 1 } : {}} // Animate to visible
            exit={{ opacity: 0, scale: 0.8 }} // Exit animation
            transition={{ duration: 0.7, ease: "easeOut" }} // Transition settings
            className="text-[18px] leading-10"
          >
            Đặc biệt,{" "}
            <strong className="font-bold text-primary">PicareVN Loyalty</strong>{" "}
            phân chia khách hàng thành nhiều hạng mức (rank) khác nhau như Thành
            viên <strong className="text-gray-300">Bạc</strong>,{" "}
            <strong className="text-yellow-400">Vàng</strong>,{" "}
            <strong className="text-blue-400">Bạch Kim</strong>,… với các quyền
            lợi tăng dần theo từng cấp độ. Càng mua sắm nhiều, tích điểm cao,
            khách hàng càng nhanh chóng thăng hạng và được tiếp cận với các
            chương trình ưu đãi đặc biệt như khuyến mãi riêng, quà tặng sinh
            nhật, quyền đặt hàng sớm, hay hỗ trợ cá nhân hóa từ đội ngũ chăm sóc
            khách hàng.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }} // Start smaller and transparent
            animate={visibleSection === 6 ? { opacity: 1, scale: 1 } : {}} // Animate to visible
            exit={{ opacity: 0, scale: 0.8 }} // Exit animation
            transition={{ duration: 0.9, ease: "easeOut" }} // Transition settings
            className="text-[18px] leading-10"
          >
            Chúng tôi tin rằng, với hệ thống Loyalty này, khách hàng không chỉ
            cảm thấy được trân trọng mà còn có thêm động lực để gắn bó dài lâu
            cùng thương hiệu. Đây chính là lời cam kết của chúng tôi trong việc
            không ngừng nâng cao trải nghiệm và giá trị dành cho khách hàng thân
            thiết.
          </motion.p>
        </div>
      ),
    },
    {
      id: 7,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <ShinyText
            text="Hướng dẫn Loyalty"
            disabled={false}
            speed={3}
            className="text-[50px]"
          />
        </div>
      ),
    },
    {
      id: 8,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/59.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 9,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/60.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 10,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/61.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 11,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/62.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 12,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/63.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 13,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/64.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 14,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/65.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 15,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/66.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 16,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/67.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 17,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <ShinyText
            text="Hệ thống tích điểm"
            disabled={false}
            speed={3}
            className="text-[50px]"
          />
        </div>
      ),
    },
    {
      id: 18,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/69.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 19,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/70.png"
            width={1200}
            height={800}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 20,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <Image
            alt=""
            src="/71.png"
            width={1200}
            height={650}
            className="!object-fill 2xl:w-[1000px] 2xl:h-[550px] 3xl:w-[1200px] 3xl:h-[650px] 1.5xl:w-[1000px] h-[550px]"
          />
        </div>
      ),
    },
    {
      id: 21,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen relative">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal" // up, down, left, right, diagonal
            borderColor="#404040"
            hoverFillColor="#a4ff66"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center gap-y-[20px]">
            <p className="text-center w-[80%]  bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text text-[70px] font-semibold cursor-default">
              Một hành trình gắn kết dành riêng cho doanh nghiệp.
            </p>
            <p className="w-[55%] text-[17px] text-normal font-light text-center font-open">
              Đội ngũ PicareVN Loyalty xin chân thành cảm ơn sự quan tâm và ủng
              hộ của khách hàng. Phiên bản đầu tiên có thể gặp lỗi kính mong quý
              khách thông cảm.
            </p>
            <div className="flex items-center justify-center mt-[20px]">
              <div
                className="relative group"
                onClick={() => setShowModal(false)}
              >
                <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                  <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                    <div className="relative z-10 flex items-center space-x-2">
                      <span className="transition-all duration-500 group-hover:translate-x-1 font-open">
                        Bắt đầu trải nghiệm
                      </span>
                      <svg
                        className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                        data-slot="icon"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSection(Number(entry.target.id));
        }
      });
    }, options);

    const sectionElements = document.querySelectorAll(".section");
    sectionElements.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        observerRef.current?.unobserve(section);
      });
    };
  }, []);
  if (showModal === null || !showModal) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] bg-background font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Scrollable content bên trong */}
        <div className=" w-full h-full overflow-y-auto snap-y snap-mandatory">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              id={section.id.toString()}
              className="section snap-start h-screen"
              initial={{ opacity: 0, y: 50 }}
              animate={
                visibleSection === section.id ? { opacity: 1, y: 0 } : {}
              }
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {section.content}
            </motion.div>
          ))}
        </div>

        {/* Dock cố định */}
        {visibleSection !== 1 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <Dock
              items={items}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function ScrollDown() {
  return (
    <div className="flex items-center absolute top-0 3xl:bottom-[-500px] 2xl:bottom-[-400px] gap-x-[20px]">
      <FaArrowDown className="text-[36px] text-neutral-600 text-opacity-30" />
      <p className="text-[30px] text-neutral-600 text-opacity-30">Kéo xuống</p>
    </div>
  );
}
