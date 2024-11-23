"use client";

import React, { useEffect, useState } from "react";
import SettingsForm from "../../_components/SettingsForm";
import { Separator } from "@/components/ui/separator";
import StoreDetails from "../../_components/StoreDetails";
import { Button } from "@/components/ui/button";
import StoreDialog from "@/components/StoreDialog";
import { Trash2 } from "lucide-react";
import { deleteStore, getStore } from "@/actions/store";
import { toast } from "sonner";
import { Store } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    storeId: string;
  };
}

const Page = ({ params }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (storeId: string) => {
    if (!storeId) {
      return;
    }

    setLoading(true);

    try {
      const isDeleted = await deleteStore(storeId);

      if (isDeleted) {
        toast.success("Store deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="flex items-center gap-2">
              <Button
                size={"sm"}
                onClick={() => setOpen(true)}
                disabled={loading}
              >
                Create Store
              </Button>
            </div>
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
