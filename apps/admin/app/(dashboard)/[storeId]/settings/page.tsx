"use client";

import React, { useState } from "react";
import SettingsForm from "../../_components/SettingsForm";
import { Separator } from "@/components/ui/separator";
import StoreDetails from "../../_components/StoreDetails";
import { Button } from "@/components/ui/button";
import StoreDialog from "@/components/StoreDialog";

interface Props {
  params: {
    storeId: string;
  };
}

const Page = ({ params }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <div className="border-b border-gray-300 px-5 py-3">
          <h1 className="text-xl font-semibold">Settings</h1>
          <p className="text-sm font-normal text-gray-500">
            Update settings as per need
          </p>
        </div>
        <div className="px-5 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Store</h1>
            <Button size={"sm"} onClick={() => setOpen(true)}>
              Create Store
            </Button>
          </div>
          <SettingsForm />
        </div>
        <Separator />
        <div className="px-5 py-3">
          <StoreDetails />
        </div>
      </div>
      <StoreDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Page;
