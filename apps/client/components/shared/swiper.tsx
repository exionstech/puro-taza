import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

interface CustomSwiperProps {
  children: ReactNode;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween?: number;
    }
  };
  autoplayDelay?: number;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  children,
  breakpoints,
  autoplayDelay = 5000,
}) => {
  const defaultBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10
    }
  };

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          navigationDisabledClass: 'opacity-30',
        }}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={breakpoints || defaultBreakpoints}
        className="w-full overflow-x-hidden"
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className="flex px-[2px]">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons with Lucide Icons */}
      <div 
        className="swiper-button-prev absolute top-1/2 left-0 z-10 transform -translate-y-1/2 p-1 bg-white/70 rounded-full shadow-md flex items-center justify-center hover:bg-white/90 transition-all cursor-pointer duration-300"
        style={{ 
          width: '40px', 
          height: '40px',
          position: 'absolute'
        }}
      >
        <ChevronLeft className="text-violet" size={20} />
      </div>
      <div 
        className="swiper-button-next absolute top-1/2 right-0 z-10 transform -translate-y-1/2 p-1 bg-white/70 rounded-full shadow-md flex items-center justify-center hover:bg-white/90 transition-all cursor-pointer duration-300"
        style={{ 
          width: '40px', 
          height: '40px',
          position: 'absolute'
        }}
      >
        <ChevronRight className="text-violet" size={20} />
      </div>
    </div>
  );
};

export default CustomSwiper;