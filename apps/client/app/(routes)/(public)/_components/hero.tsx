import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full mt-10 max-w-screen-2xl min-h-screen px-5 md:px-14 flex items-center justify-center mx-auto flex-col gap-6">
      <div className="w-full mt-10 h-[40vh] md:h-[65vh] hero rounded-3xl flex items-end justify-end">
        <div className="w-full text-center mb-10">
          <h1 className="font-semibold text-2xl md:text-5xl text-white">
            Your favourites fishes are now online
          </h1>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 items-center">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center w-full">
          <div className="relative w-full flex items-center px-6 gap-2 rounded-xl bg-[#79A6EA]">
            <div className="w-1/2 flex flex-col gap-2 text-white py-6">
              <h1 className="md:text-2xl text-xl font-bold">
                Sweet water <br /> fish
              </h1>
              <p className="text-sm">Fresh sweet water fishes just for you</p>
              <Link href={""}>
                <Button variant={"outline"} className="text-black px-8">
                  Order Now
                </Button>
              </Link>
            </div>
            <div className="absolute bottom-0 right-6 w-1/2 lg:flex self-end h-full hidden">
              <Image
                src={"/home/hero/hero-chief.png"}
                alt="chief"
                height={200}
                width={200}
                className="shrink-0"
              />
            </div>
            <div className="absolute bottom-0 right-1  w-1/2 flex self-end h-full lg:hidden">
              <Image
                src={"/home/hero/hero-chief.png"}
                alt="chief"
                height={150}
                width={150}
                className="shrink-0"
              />
            </div>
          </div>
          <div className="w-full flex items-center px-6 py-6 justify-center gap-2 rounded-xl bg-[#EAD179]">
            <div className="w-1/2 flex flex-col gap-2 text-white">
              <h1 className="md:text-2xl text-xl font-bold">
                Fresh <br /> prawns
              </h1>
              <p className="text-sm">Pure Taste, Freshly Delivered Daily</p>
              <Link href={""}>
                <Button variant={"outline"} className="text-black px-8">
                  Order Now
                </Button>
              </Link>
            </div>
            <div className="w-1/2">
              <Image
                src={"/home/hero/prawn.png"}
                alt="chief"
                height={160}
                width={160}
                className="shrink-0"
              />
            </div>
          </div>
          <div className="w-full flex items-center px-6 py-6 justify-center gap-2 rounded-xl bg-[#EA9B79]">
            <div className="w-1/2 flex flex-col gap-2 text-white">
              <h1 className="md:text-2xl text-xl font-bold">
                Ready <br /> to cook
              </h1>
              <p className="text-sm">Straight from Sea to Your Plate, Fresh.</p>
              <Link href={""}>
                <Button variant={"outline"} className="text-black px-8">
                  Order Now
                </Button>
              </Link>
            </div>
            <div className="w-1/2">
              <Image
                src={"/home/hero/fish.png"}
                alt="chief"
                height={170}
                width={170}
                className="shrink-0"
              />
            </div>
          </div>
        </div>
        <div className="w-full items-center justify-center flex">
          <Link href={""} className="px-8 border-none flex items-center justify-center space-x-2">
              <h1 className="text-black text-lg">View More</h1>
              <ChevronsRight className="size-6 md:mt-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
