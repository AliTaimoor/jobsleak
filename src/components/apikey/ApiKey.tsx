"use client";
import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import EyeIcon from "@/icons/eye-icon.svg";
import EyeSlashIcon from "@/icons/eye-slash-icon.svg";
import Chip from "../atomic/chip/Chip";
import customToast from "../atomic/toast/customToast";

export default function ApiKey() {
  const {data: session} = useSession();
  const [view, setView] = useState(false);

  const copyApiKey = useCallback(() => {
    navigator.clipboard.writeText(session?.user?.apikey as string);
    customToast.success("API Key copied");
  }, []);

  return (
    <div className="flex gap-8">
      <label className="text-lg">Your API Key</label>
      {view ? (
        <>
          <label>{session?.user?.apikey}</label>
          <span className="cursor-pointer" onClick={copyApiKey}>
            <Chip size="sm">Copy</Chip>
          </span>
          <span className="cursor-pointer" onClick={() => setView(false)}>
            <EyeSlashIcon />
          </span>
        </>
      ) : (
        <>
          <label className="text-xl">*****************</label>
          <span className="cursor-pointer" onClick={() => setView(true)}>
            <EyeIcon />
          </span>
        </>
      )}
    </div>
  );
}
