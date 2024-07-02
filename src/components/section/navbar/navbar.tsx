"use client";
import Link from "next/link";
import Button from "../../atomic/button/Button";
import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import siteUrls from "@/config/site-config";
import HamburgerIcon from "@/icons/HamburgerIcon.svg";
import Image from "next/image";
import IconButton from "@/components/atomic/icon-button/IconButton";
import _ from "lodash";
import TopbarNavigationItem from "@/components/atomic/navigation/TopbarNavigationItem";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import ContentSection from "@/containers/layout/ContentSection";
import { ThemeSwitcher } from "@/components/atomic/theme/ThemeSwitcher";
import AccountModal from "@/components/molecules/account-modal/AccountModal";
import { useSession } from "next-auth/react";
import Avatar from "@/components/atomic/avatar/Avatar";
import { useTranslation } from "@/lib/i18n/client";
import ChangeLocale from "@/components/locale/ChangeLocale";
export default function Navbar() {
  const { t } = useTranslation("landing");
  const pathName = usePathname();
  const router = useRouter();
  const [showMenu, setShowMenu] = React.useState(false);
  const [border, setBorder] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const [show, setShow] = React.useState(false);
  const changeNavBg = () => {
    if (!navRef.current) {
      return;
    }
    window.scrollY >= navRef.current?.clientHeight
      ? setBorder(true)
      : setBorder(false);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target instanceof HTMLElement && !e.target.closest(".dropdown")) {
        setShowMenu(false);
      }
    });
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentSection
        fullWidth
        additionalClassName={cn(
          "fixed  bg-landing-background dark:bg-landing-dark-background  bg-landing-background z-50 !py-2 !md:py-6",
          {
            "border-b-[1px] border-grey-200 dark:border-navbar-bottom-dark":
              border,
          }
        )}
      >
        <div
          ref={navRef}
          className="  navbar p-0 max-w-8xl     font-medium text-base leading-[19px] text-grey-400 "
        >
          <div className="navbar-start w-full menu menu-horizontal">
              <TopbarNavigationItem link="/" title="Jobsleak" />
              {/* <Image src="/images/logo.svg" alt="logo" width={150} height={50} className='dark:hidden' />
                            <Image src="/images/logo-dark.svg" alt="logo" width={150} height={50} className='hidden dark:block' /> */}
          </div>
          <div className="navbar-center hidden lg:flex justify-center">
            <ul className="menu menu-horizontal px-1 flex gap-1">
              {_.keys(siteUrls.navbar).map((key: string) => {
                const link = siteUrls.navbar[key];
                return (
                  <TopbarNavigationItem
                    link={link.url}
                    title={link.label}
                    key={key}
                    selected={pathName === link.url}
                  />
                );
              })}
            </ul>
          </div>
          <div className="navbar-end  w-full   gap-3">
            <div className="dropdown flex justify-end w-full lg:hidden">
              <div className="text-black dark:text-white font-black">
                <IconButton
                  icon={<HamburgerIcon />}
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                  className="w-8 h-8"
                />
              </div>
              <ul
                tabIndex={0}
                className={cn(
                  showMenu ? " absolute flex" : "hidden",
                  "  mt-8 z-[1] p-8 shadow bg-base-100 dark:bg-card-dark dark:text-profile-modal-text-dark rounded-box w-72  flex-col gap-4"
                )}
              >
                {_.keys(siteUrls.navbar).map((key: string) => {
                  const link = siteUrls.navbar[key];
                  return (
                    <TopbarNavigationItem
                      link={link.url}
                      title={link.label}
                      key={key}
                      selected={pathName === link.url}
                    />
                  );
                })}
                <div className="flex flex-row justify-start gap-3">
                  <ThemeSwitcher />
                </div>
                <li>
                  <Button
                    variant="primary"
                    className=" !min-w-[150px] !w-full  text-white "
                    label="Get Started"
                    size="md"
                    onClick={() => router.push(siteUrls.general.register)}
                  />
                </li>
              </ul>
            </div>
            <div className="hidden lg:flex  gap-2 justify-center items-center">
              <ThemeSwitcher />

              {session?.user && (
                <div
                  className="relative"
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                >
                  <Avatar
                    onClick={() => {
                      setShow(!show);
                    }}
                    tabIndex={0}
                    role="button"
                    image={
                      session?.user?.avatar ||
                      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                    name={session?.user?.name ?? ""}
                  />
                  <AccountModal
                    email={session?.user?.email as string}
                    name={
                      session?.user?.name ||
                      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                    image={
                      session?.user?.avatar ||
                      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                    shown={show}
                  />
                </div>
              )}
              {!session?.user && status !== "loading" && (
                <Button
                  variant="primary"
                  className="  !min-w-[120px] "
                  label={t("navbar.getStarted")}
                  size="lg"
                  onClick={() => router.push(siteUrls.general.register)}
                />
              )}
            </div>
          </div>
        </div>
      </ContentSection>
    </Suspense>
  );
}
