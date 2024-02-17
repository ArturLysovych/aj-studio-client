'use client'
import { FC } from "react"
import SliderItem from "./SliderItem";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import { Pagination } from "swiper/modules";

SwiperCore.use([Pagination]);

const Slider: FC = (): JSX.Element => {
  return (
    <Swiper
      spaceBetween={50}
      pagination={{clickable: true}}
      slidesPerView={1}
      centeredSlides
      className="h-[220px] sm:h-[300px] md:h-[350px] lg:h-[441px] w-full flex mt-[20px]"
    >
      <SwiperSlide>
        <SliderItem className={"bg-[#FFDC62]"} />
      </SwiperSlide>
      <SwiperSlide>
        <SliderItem className={"bg-[#FFE2B5]"} />
      </SwiperSlide>
      <SwiperSlide>
        <SliderItem className={"bg-[#D3FBD9]"} />
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;