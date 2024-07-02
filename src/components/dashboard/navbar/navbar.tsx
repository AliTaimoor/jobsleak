"use client";
import HamburgerIcon from "@/icons/HamburgerIcon.svg";
import React from "react";
import Topbar from "../navigation/Topbar";

const DashboardNavbar = ({ onClick }: { onClick: () => void }): JSX.Element => {
  //eslint-disable-next-line
  return (
    <header className="sticky top-0 z-40 flex w-full bg-white dark:bg-black ">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-10">
        <div
          className=" block rounded-full hover:bg-gray-100  p-1.5 shadow-sm dark:border-stroke   lg:hidden"
          onClick={onClick}
        >
          <HamburgerIcon />
        </div>

        <Topbar />
      </div>
    </header>
  );
};

export default DashboardNavbar;
