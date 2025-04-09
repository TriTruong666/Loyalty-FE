"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // Tốc độ parallax
  bg?: string; // Màu nền hoặc background image
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  bg = "white",
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden"
      style={{ background: bg }}
    >
      <motion.div style={{ y }} className="text-center">
        {children}
      </motion.div>
    </section>
  );
}
