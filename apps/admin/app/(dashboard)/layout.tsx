"use client";

import React, { useEffect } from "react";
import { useStores } from "@/hooks/use-store";
import { useRouter } from "next/navigation";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { getUsers } from "@/hooks/get-users";
import { useUser } from "@clerk/nextjs";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { isLoading, stores } = useStores();
  const { users } = getUsers();
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  const currUser = users.find((ur) => ur.clerkId === user?.id);

  useEffect(() => {
    if (isUserLoaded && !isLoading) {
      if (stores.length === 0) {
        router.push("/");
      } else if (currUser) {
        const isAdmin = currUser?.role === "ADMIN";
        if (!isAdmin) {
          router.push("/waiting/access");
        }
      }
    }
  }, [isLoading, stores, currUser, router, isUserLoaded]);

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default Layout;
