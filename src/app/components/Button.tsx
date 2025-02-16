"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/react";

interface GoNextButtonProps {
  title: string;
  url?: string;
}

export const GoNextButton: React.FC<GoNextButtonProps> = ({ title, url }) => {
  return (
    <Button
      as={Link}
      href={url}
      className="w-full"
      variant="flat"
      color="secondary"
    >
      <p className="font-bold font-open">{title}</p>
    </Button>
  );
};
