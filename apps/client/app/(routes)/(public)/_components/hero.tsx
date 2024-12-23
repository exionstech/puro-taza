import React from "react";
import CategoryCard from "./sub-components/hero/category-card";

const Hero = () => {
  return (
    <section className="w-full mt-10 max-w-screen-2xl min-h-screen px-5 md:px-14 flex items-center justify-center mx-auto flex-col gap-6">
      <div className="w-full mt-10 h-[40vh] md:h-[65vh] hero rounded-3xl flex items-end justify-end">
        <div className="w-full text-center mb-10 hidden">
          <h1 className="font-semibold text-2xl md:text-5xl text-white">
            Your favourites fishes are now online
          </h1>
        </div>
      </div>
      {/* <ImageSlider images={heroImages} interval={3000} /> */}
      <CategoryCard/>
    </section>
  );
};

export default Hero;
