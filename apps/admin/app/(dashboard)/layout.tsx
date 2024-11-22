"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { useStores } from "@/hooks/use-store";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { isLoading, stores } = useStores();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && stores.length === 0) {
      router.push("/");
    }
  }, [stores]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="mt-8 bg-white w-full rounded-lg h-screen">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default layout;
