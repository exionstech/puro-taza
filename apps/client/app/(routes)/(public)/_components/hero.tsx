import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full mt-10 max-w-screen-2xl min-h-[120vh] px-5 md:px-14 flex items-center justify-center m-auto flex-col gap-6">
      <div className="w-full h-[40vh] md:h-[60vh] hero rounded-3xl flex items-end justify-end">
        <div className="w-full text-center mb-10">
          <h1 className="font-semibold text-5xl text-white">
            Your favourites fishes are now online
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center w-full">
        <div className="w-full flex items-center px-6 py-6 justify-center gap-2 rounded-xl bg-[#79A6EA]">
          <div className="w-1/2 flex flex-col gap-2 text-white">
            <h1 className="text-2xl font-bold">Sweet water fish</h1>
            <p className="text-sm">Fresh sweet water fishes just for you</p>
            <Link href={""}>
              <Button variant={"outline"} className="text-black px-8">Order Now</Button>
            </Link>
          </div>
          <div className="w-1/2">
            <Image
              src={"/home/hero/hero-chief.png"}
              alt="chief"
              height={100}
              width={100}
              className="shrink-0"
            />
          </div>
        </div>
        <div className="w-full flex items-center px-6 py-6 justify-center gap-2 rounded-xl bg-[#EAD179]">
          <div className="w-1/2 flex flex-col gap-2 text-white">
            <h1 className="text-2xl font-bold">Fresh prawns</h1>
            <p className="text-sm">Pure Taste, Freshly Delivered Daily</p>
            <Link href={""}>
              <Button variant={"outline"} className="text-black px-8">Order Now</Button>
            </Link>
          </div>
          <div className="w-1/2">
            <Image
              src={"/home/hero/hero-chief.png"}
              alt="chief"
              height={100}
              width={100}
              className="shrink-0"
            />
          </div>
        </div>
        <div className="w-full flex items-center px-6 py-6 justify-center gap-2 rounded-xl bg-[#EA9B79]">
          <div className="w-1/2 flex flex-col gap-2 text-white">
            <h1 className="text-2xl font-bold">Ready to cook</h1>
            <p className="text-sm">Straight from Sea to Your Plate</p>
            <Link href={""}>
              <Button variant={"outline"} className="text-black px-8">Order Now</Button>
            </Link>
          </div>
          <div className="w-1/2">
            <Image
              src={"/home/hero/hero-chief.png"}
              alt="chief"
              height={100}
              width={100}
              className="shrink-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
