"use client";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Pricing from "@/components/section/pricing/pricing";
import AccountSsttings from "@/components/dashboard/settings/account/Account";
import TabItem from "@/components/atomic/tabs/TabItem";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  phoneNumber: yup.string().required(),
});

interface FormValues {
  email: string;
  name: string;
  phoneNumber: string;
}

const tabs = [
  {
    name: "Account",
    component: (
      <div>
        <AccountSsttings />{" "}
      </div>
    ),
  },
  {
    name: "Subscription",
    component: (
      <div>
        <Pricing showDescription={false} />
      </div>
    ),
  },
];
export default function SettingsPage() {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const [tab, setTab] = React.useState(tabs[1]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: any) => {};
  return (
    <div>
      <div className="flex justify-start w-full">
        <div role="tablist" className="flex flex-row gap-2">
          {tabs.map((t, index) => {
            return (
              <TabItem
                selected={t.name == tab.name}
                key={index}
                onClick={() => setTab(t)}
                label={t.name}
              />
            );
          })}
        </div>
      </div>
      <div className="  flex justify-center lg:justify-start">
        {tab.component}
      </div>
    </div>
  );
}
