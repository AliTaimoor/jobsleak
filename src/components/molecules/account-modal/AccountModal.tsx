import Avatar from "@/components/atomic/avatar/Avatar";
import siteUrls from "@/config/site-config";
import { cn } from "@/utils/cn";
import { signOut } from "next-auth/react";
import React from "react";
import SettingsIcon from "@/icons/settings.svg";
import UserIcon from "@/icons/user-icon.svg";
import ArrowLeftOnIcon from "@/icons/arrow-left-on-icon.svg";
import { useRouter } from "next/navigation";

interface AccountModalProps {
  name: string;
  image: string;
  email: string;
  shown: boolean;
}

const AccountModal = ({ name, image, email, shown }: AccountModalProps) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex flex-col p-4 pt-1 pb-4 shadow-lg  border border-grey-200 dark:border-profile-modal-border-dark dark:bg-profile-modal-background-dark rounded-lg justify-start content duration-300 ease-in-out absolute top-12 bg-white right-0",
        { "hidden h-0": !shown }
      )}
    >
      <div className="flex flex-row justify-center items-center gap-4 my-2 py-2">
        <Avatar size="sm" image={image} name={name} />
        <div className="flex text-grey-400 dark:text-white flex-col ">
          <p className="text-sm leading-[18px] text-black font-medium dark:text-white">
            {name}
          </p>
          <p className="text-xs font-normal leading[18px] dark:text-profile-modal-text-dark">
            {email}
          </p>
        </div>
      </div>
      <ul className="flex flex-col w-full gap-[6px]">
        <div
          onClick={() => router.push(siteUrls.general.settings)}
          className="px-[6px] py-2 gap-[22px] rounded-[5px] bg-white dark:bg-card-dark hover:bg-grey-100 focus:text-black focus:bg-grey-100 text-grey-600  flex flex-row cursor-pointer dark:text-profile-modal-text-dark hover:dark:bg-profile-modal-hover-dark"
        >
          <SettingsIcon />
          <p className="text-sm leading-[18px] font-medium">Settings</p>
        </div>
        <div
          onClick={async () => {
            await signOut({ callbackUrl: "/ " });
          }}
          className="px-[6px] py-2 gap-[22px] rounded-[5px] bg-white dark:bg-card-dark dark:text-red-400 hover:bg-grey-100 focus:text-black focus:bg-grey-100 text-red-400 flex flex-row cursor-pointer hover:dark:bg-profile-modal-hover-dark "
        >
          <ArrowLeftOnIcon />
          <p className="text-sm leading-[18px] font-medium text-red-400">
            Log out
          </p>
        </div>
      </ul>
    </div>
  );
};

export default AccountModal;
