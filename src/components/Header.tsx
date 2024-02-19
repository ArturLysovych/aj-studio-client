'use client'
import { FC } from "react";
import Image from 'next/image';
import sidelist from '../assets/images/sidelist.svg';
import search from '../assets/images/search.svg';
import logo from '../assets/images/logo.svg';
import user_icon from '../assets/images/header/User.svg';
import cart_icon from '../assets/images/header/cart.svg'; 
import heart_icon from '../assets/images/header/heart.svg'; 
import arrow_icon from '../assets/images/header/arrow.svg';
import useCartStore from "@/store/cart.store";

const Header: FC = (): JSX.Element => {
  const cart = useCartStore((state: any) => state.cart);
  const changeCartVisible = useCartStore((state: any) => state.toggleVisible);
  const toggleVisible = () => changeCartVisible();

  return (
    <div className="w-full h-[60px] mt-[25px] flex justify-between items-center">
          <div className="h-full flex justify-between items-center gap-[10px]">
            <button className='h-[56px] w-[114px] bg-[#E7E9EB] flex justify-between items-center px-[18px] rounded-3xl text-[18px] text-[#11293B] font-normal'>
              <Image src={sidelist} alt='sidelist icon' /> Menu
            </button>
            <div className="hidden w-[200px] h-[56px] px-[19px] gap-[5px] bg-[#E7E9EB] rounded-3xl items-center md:flex">
              <Image src={search} alt='search icon' />
              <input className="bg-transparent w-full h-[30px] outline-none border-none" type="text" placeholder='Search' />
            </div>
          </div>
          <Image src={logo} alt='logo icon' />
          <div className="hidden md:flex justify-center items-center gap-[29px]">
            <Image src={user_icon} alt="header icon here" />
            <Image src={heart_icon} alt="header icon here" />
            <div className="flex items-center gap-[6px] cursor-pointer" onClick={toggleVisible}>
              <Image src={cart_icon} alt="header icon here" />
              <span className="h-[28px] w-[28px] rounded-full bg-[#F67280] shadow-sm shadow-[#F67280] text-white text-[16px] flex justify-center items-center">{ cart.length }</span>
            </div>
      </div>
      <div className="hidden md:flex justify-center items-center gap-[10px]">
        <div className="w-[70px] h-[30px] bg-[#E7E9EB] rounded-2xl text-[12px] font-normal flex justify-center items-center gap-[6px]">
          <p>ENG</p>
          <Image src={arrow_icon} alt="arrow icon" />
        </div>
        <div className="w-[70px] h-[30px] bg-[#E7E9EB] rounded-2xl text-[12px] font-normal flex justify-center items-center gap-[6px]">
          <p>USD</p>
          <Image src={arrow_icon} alt="arrow icon" />
        </div>
      </div>
          <div className="flex flex-col justify-center items-center gap-[5px] cursor-pointer md:hidden">
            <div className="w-[25px] h-[2px] bg-[#11293B]"></div>
            <div className="w-[25px] h-[2px] bg-[#11293B]"></div>
            <div className="w-[25px] h-[2px] bg-[#11293B]"></div>
          </div>
          {/* For LG screens */}
          {/* <div className=""></div> */}
    </div>
  )
}

export default Header;
