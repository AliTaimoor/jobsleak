"use client";
// components/Sidebar.tsx
import React from "react";
import Link from "next/link";
import siteUrls from "@/config/site-config";
import DashboardLogoIcon from "@/icons/dashboard-logo.svg";
import HomeIcon from "@/icons/home.svg";
import InboxIcon from "@/icons/inbox.svg";
import UserGroupIcon from "@/icons/user-group.svg";
import SettingsIcon from "@/icons/settings.svg";
import NavigationItem from "../atomic/navigation/NavigationItem";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import DashboardDarkIcon from "@/icons/dashboard-logo-dark-icon.svg";
import { useTranslation } from "@/lib/i18n/client";
import { useSession } from "next-auth/react";
interface SidebarLink {
  label: string;
  path: string;
  iconSrc: React.ReactNode; // Path to your icon images
  adminRoute?: boolean;
}

const sidebarLinks: SidebarLink[] = [
  { label: "home", path: "/dashboard", iconSrc: <HomeIcon /> },
  // { label: "notifications", path: "/notifications", iconSrc: <InboxIcon /> },
  // {
  //   label: "users",
  //   path: "/users",
  //   iconSrc: <UserGroupIcon />,
  //   adminRoute: true,
  // },
];
const bottomSideBarLinks: SidebarLink[] = [
  { label: "settings", path: "/settings", iconSrc: <SettingsIcon /> },
];

interface SidebarProps {
  showMenu?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showMenu }: SidebarProps) => {
  const session = useSession();
  const pathname = usePathname();
  const { theme } = useTheme();
  const { t } = useTranslation("dashboard");

  return (
    <aside
      className={` z-50 flex  h-screen  text-white overflow-y-hidden absolute lg:static top-0 left-0 w-72 flex-col bg-grey-100 dark:bg-profile-modal-background-dark
        duration-300 ease-linear p-3 pt-5
        lg:translate-x-0 ${showMenu ? "-translate-x-0" : "-translate-x-full"}`}
    >
      <div className=" flex items-center justify-between gap-2  mb-2   ">
        <Link
          href={siteUrls.general.dashboard}
          className="btn btn-ghost text-xl"
        >
          {/* {theme == "light" ? <DashboardLogoIcon /> : <DashboardDarkIcon />} */}
          <h2>Jobsleak</h2>
        </Link>
      </div>
      <ul className="menu w-64 no-scrollbar flex-1 flex justify-between flex-col">
        <div>
          <div className="flex flex-col gap-[6px] mt-[6px]">
            {sidebarLinks
              .filter((link) =>
                link.adminRoute ? session.data?.user?.role == "ADMIN" : true
              )
              .map((link) => (
                <NavigationItem
                  title={t(`sidebar.${link.label}`)}
                  icon={link.iconSrc}
                  link={link.path}
                  key={link.label}
                  selected={pathname.includes(link.path)}
                />
              ))}
          </div>
        </div>
        <div>
          {bottomSideBarLinks.map((link) => (
            <NavigationItem
              title={t(`sidebar.${link.label}`)}
              icon={link.iconSrc}
              link={link.path}
              key={link.label}
              selected={pathname.includes(link.path)}
            />
          ))}
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
