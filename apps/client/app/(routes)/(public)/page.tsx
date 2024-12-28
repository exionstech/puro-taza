"use client";

import { useAuth } from "@/hooks/use-auth";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import Hero from "./_components/hero";
import BestSellers from "./_components/best-sellers";
import { Testimonials } from "./_components/testimonials";
import GetApp from "./_components/get-app";
import RecommendItems from "./_components/recommended-item";

export default function Home() {

  return (
    <MaxWrapper>
      <Hero/>
      <BestSellers/>
      <RecommendItems/>
      <GetApp/>
      <Testimonials/>
    </MaxWrapper>
  );
}
