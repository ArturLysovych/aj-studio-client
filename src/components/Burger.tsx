'use client'
import { FC, useEffect, useState } from "react";
import Image from 'next/image';
import logo from '../assets/images/logo.svg';
import useCartStore from "@/store/cart.store";
import useBurgerStore from "@/store/burger.store";
import { IoIosClose } from "react-icons/io";
import user_icon from '@/assets/images/header/User.svg';
import cart_icon from '@/assets/images/header/cart.svg'; 
import heart_icon from '@/assets/images/header/heart.svg'; 
import Link from 'next/link';
import { IoLogInOutline } from "react-icons/io5";

const Burger: FC = (): JSX.Element => {
  const toggleBurger = useBurgerStore((state: any) => state.toggleVisible);
  const toggleCart = useCartStore((state: any) => state.toggleVisible);

  return (
    <div className="fixed h-screen w-full bg-white z-20 flex flex-col">
          <div className="w-full bg-[#fafafa] p-[20px] flex justify-center items-center relative">
            <div className="h-[40px] w-[40px] rounded border-2 border-gray-400 cursor-pointer flex justify-center items-center absolute top-[15px] right-[20px]">
              <IoIosClose onClick={toggleBurger} className='self-end items-end' size={40} color='gray' />
            </div>
            {/* <div className="w-full h-[calc(100%-40px)] flex justify-start items-center gap-[10px]">
              <div className="h-[80px] w-[80px] bg-gray-200 rounded-xl"></div>
              <div className="flex flex-col">
                <h2>Artur Lysovych</h2>
                <p>User</p>
              </div>
            </div> */}
            <Image src={logo} alt='logo'></Image>
          </div>
          <ul className='w-full py-[20px] flex flex-col gap-[10px]'>
            <div className='flex items-center gap-[10px] h-[50px] text-[17px] w-full border-b-2 px-[20px] cursor-pointer' onClick={() => {
              toggleBurger();
              toggleCart();
            }} ><Image className="cursor-pointer" src={cart_icon} alt="header icon here" />Cart</div>
            <div className='flex items-center gap-[10px] h-[50px] text-[17px] w-full border-b-2 px-[20px] cursor-pointer' onClick={() => {
              toggleBurger();
              window.location.href = '/saved'
            }}><Image className="cursor-pointer" src={heart_icon} alt="header icon here" />Saved</div>
            <Link href={'/profile'} className='flex items-center gap-[10px] h-[50px] text-[17px] w-full border-b-2 px-[20px] cursor-pointer'>
              <Image className="cursor-pointer" src={user_icon} alt="header icon here" />Profile
            </Link>
            <Link href={'/auth'} className='flex items-center gap-[10px] h-[50px] text-[17px] w-full border-b-2 px-[20px] cursor-pointer'>
              <IoLogInOutline cursor={'pointer'} size={28} color='#222' />Login
            </Link>
          </ul>
        </div>
  )
}

export default Burger;
