"use client";
import { useEffect, useRef, useState } from "react";
import Dock from "./Dock";
import {
  IoBookOutline,
  IoDiamondOutline,
  IoExitOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import RotatingText from "./RotatingText";
import { AnimatePresence, motion } from "framer-motion";
import GlitchText from "./GlitchText";
import ShinyText from "./ShinyText";

export default function WelcomeComponent() {
  const [visibleSection, setVisibleSection] = useState(0);

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
        const section = document.getElementById("4");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: <IoDiamondOutline size={18} />,
      label: "Loyalty",
      onClick: () => alert("Profile!"),
    },
    {
      icon: <IoExitOutline size={18} />,
      label: "Dashboard",
      onClick: () => alert("Archive!"),
    },
  ];
  const sections = [
    {
      id: 1,
      content: (
        <div className="flex items-center justify-center gap-x-[15px] h-screen">
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
        <div className="flex flex-col items-center justify-center gap-6 h-screen font-open px-[60px]">
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }} // Start smaller and transparent
            animate={visibleSection === 3 ? { opacity: 1, scale: 1 } : {}} // Animate to visible
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
            animate={visibleSection === 3 ? { opacity: 1, scale: 1 } : {}} // Animate to visible
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
            animate={visibleSection === 3 ? { opacity: 1, scale: 1 } : {}} // Animate to visible
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
      id: 4,
      content: (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <ShinyText
            text="Instructions For Use"
            disabled={false}
            speed={3}
            className="text-[50px]"
          />
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
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <Dock
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
