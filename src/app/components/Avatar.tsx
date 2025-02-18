"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";

interface AvatarProps {
  name: string;
  role?: string;
  className?: string;
}

// Function to generate a consistent HSL color from a name
const generateColorFromName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 50%)`;
};

export const Avatar: FC<AvatarProps> = ({ name, className, role }) => {
  const [toggleInfo, setToggleInfo] = useState(false);
  const color = generateColorFromName(name);

  return (
    <div className={`${className} relative font-open`}>
      {toggleInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute px-[20px] py-[10px] min-w-[200px] rounded-[10px] top-[-70px] left-[-80px] flex flex-col justify-center items-center bg-black border border-gray-600 border-opacity-40"
        >
          <p className="text-sm line-clamp-1 font-semibold">{name}</p>
          <p className="text-[12px] font-light">{role}</p>
        </motion.div>
      )}

      <div
        onMouseEnter={() => setToggleInfo(true)}
        onMouseLeave={() => setToggleInfo(false)}
        className="w-[35px] h-[35px] flex items-center justify-center rounded-full font-bold text-white cursor-pointer relative"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};
