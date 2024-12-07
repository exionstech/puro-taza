"use client";

import { useAuth } from "@/hooks/use-auth";
import { MaxWrapper } from "@/components/shared/max-wrapper";

export default function Home() {
  const { logout, isLoggedIn } = useAuth();

  return (
    <MaxWrapper>
      hero
    </MaxWrapper>
  );
}
