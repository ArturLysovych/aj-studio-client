'use client'
import React, { FC, useState, useEffect, useRef } from "react";
import SliderItem from "./SliderItem";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import Image from "next/image";
import sliderImage from '../assets/images/PngItem_6616167.webp';
import { Pagination, Autoplay } from "swiper/modules";

SwiperCore.use([Pagination, Autoplay]);

const Slider: FC = (): JSX.Element => {
  const divRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <Swiper
      spaceBetween={50}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      onSlideChange={handleSlideChange}
      slidesPerView={1}
      centeredSlides
      className="h-[220px] sm:h-[300px] md:h-[350px] lg:h-[441px] w-full flex mt-[20px] relative"
    >
      
      <SwiperSlide>
          <SliderItem className={`bg-[#FFDC62]`} />
      </SwiperSlide>
      <SwiperSlide>
          <SliderItem className={`bg-[#FFE2B5]`} />
      </SwiperSlide>
      <SwiperSlide>
        <SliderItem className={`bg-[#D3FBD9]`} />
      </SwiperSlide>
      <div className="h-[50px] gap-[10px] hidden sm:flex flex-col justify-center items-center absolute bottom-0 z-50 left-[50%] ml-[-70px] mb-[10px] rounded-lg">
        <div className="flex items-center justify-between gap-[10px] rounded-lg">
          {Array.from({ length: 3 }, (div, index) => (
            <div key={index} className="h-[40px] w-[40px] border-white border-2 rounded-md cursor-pointer">
              <Image className="h-full w-full" src={sliderImage} alt='slider image' />
            </div>
          ))}
        </div>

        <div className="h-[5px] relative flex justify-center gap-[10px] rounded-md">
          {Array.from({ length: 3 }, (div, index) => (
            <div key={index} className="w-[35px] h-[2px] bg-gray-400 overflow-hidden rounded-md relative">
              <div
                ref={(el: any) => divRefs.current[index] = el}
                style={{
                  width: `${(activeIndex >= index) ? '100%' : '0%'}`,
                  transition: 'width 1s'
                }}
                className="absolute inset-0 bg-gray-600"
              />
            </div>
          ))}
        </div>
      </div>
    </Swiper>
  );
}

export default Slider;