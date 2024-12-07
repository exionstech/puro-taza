"use client";

import { useAuth } from "@/hooks/use-auth";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import Hero from "./_components/hero";

export default function Home() {

  return (
    <MaxWrapper>
      <Hero/>
    </MaxWrapper>
  );
}
