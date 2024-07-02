"use client";
import React from "react";
import Button from "../atomic/button/Button";
import Typography from "../atomic/typography/Typography";
import Image from "next/image";
import ArrowRightIcon from "@/icons/arrow-right.svg";
import { useTranslation } from "react-i18next";
import AnimatedSection from "../animated/AnimatedSection";
interface FeatureItemProps {
  direction?: "ltr" | "rtl" | string;
  image?: string;
  title: string;
  description: string;
}
const FeatureItem = ({
  direction = "ltr",
  title,
  description,
  image,
}: FeatureItemProps) => {
  const { t } = useTranslation("landing");

  return (
    <AnimatedSection
      className={`grid grid-cols-1 auto-rows-fr   lg:flex items-start justify-start relative  lg:justify-between flex-col lg:flex-row lg:items-center  gap-x-8 gap-y-8  lg:gap-16 w-full  text-black dark:text-white   ${direction === "ltr" ? "" : "lg:flex-row-reverse"}`}
    >
      <div className="flex-col flex-1  justify-center items-start gap-8  h-full">
        <div className="flex-col justify-start items-start gap-5 flex text-left">
          <Typography
            type="h1"
            className="text-[32px]  !lg:text-[32px] font-semibold !leading-normal  "
          >
            {title}
          </Typography>
          <Typography
            type="p"
            className="text-neutral-600 dark:text-sidebar-icon-dark text-[18px]  !lg:text-[20]  max-w-[520px] !leading-[28px]"
          >
            {description}
          </Typography>
        </div>
      </div>
      <div className="relative w-full  flex-1 h-96">
        <Image
          alt=""
          fill
          objectFit="cover"
          src={image ?? ""}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </AnimatedSection>
  );
};

export default FeatureItem;
