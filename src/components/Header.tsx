'use client'
import { FC, useEffect, useState } from "react";
import Image from 'next/image';
import sidelist from '../assets/images/sidelist.svg';
import search from '../assets/images/search.svg';
import logo from '../assets/images/logo.svg';
import user_icon from '../assets/images/header/User.svg';
import cart_icon from '../assets/images/header/cart.svg'; 
import heart_icon from '../assets/images/header/heart.svg'; 
import arrow_icon from '../assets/images/header/arrow.svg';
import useCartStore from "@/store/cart.store";
import useTokenStore from "@/store/token.store";
import useSavedStore from "@/store/saved.store";
import useSelectStore from "@/store/select.store";
import { localizationConstants } from "@/constants";
import { text } from "stream/consumers";

const Header: FC = (): JSX.Element => {
  const cart = useCartStore((state: any) => state.cart);
  const user = useTokenStore((state: any) => state.user);
  const [userName, setUserName] = useState('');
  const changeCartVisible = useCartStore((state: any) => state.toggleVisible);
  const toggleVisible = () => changeCartVisible();
  const toggleSavedVisible = useSavedStore((state: any) => state.toggleVisible);
  const { setCurrency, setLang } = useSelectStore();
  const { lang } = useSelectStore();
  
  const [textData, setTextData] = useState<any>(); 

  useEffect(() => {
      if (lang && lang in localizationConstants) {
        setTextData(localizationConstants[lang]);
      } else {
        console.error(`Localization not found for language '${lang}'`);
      }
  }, [lang]);

  useEffect(() => {
    if (user) setUserName(user.username);
  }, [user]);

  return (
    <div className="w-full h-[60px] mt-[25px] flex justify-between items-center">
          <div className="h-full flex justify-between items-center gap-[10px]">
            <button className='h-[56px] w-[114px] bg-[#E7E9EB] flex justify-between items-center px-[18px] rounded-3xl text-[18px] text-[#11293B] font-normal'>
              <Image src={sidelist} alt='sidelist icon' /> {textData?.header?.menu}
            </button>
            <div className="hidden w-[200px] h-[56px] px-[19px] gap-[5px] bg-[#E7E9EB] rounded-3xl items-center md:flex">
              <Image src={search} alt='search icon' />
              <input className="bg-transparent w-full h-[30px] outline-none border-none" type="text" placeholder={textData?.header?.input} />
            </div>
          </div>
          <Image src={logo} alt='logo icon' onDoubleClick={() => {
            window.location.href = '';
            window.location.href = '/admin';
          }}/>
          <div className="hidden md:flex justify-center items-center gap-[29px]">
            <div className="flex justify-center items-center gap-[15px]">
              <p className="text-md font-medium">{ userName? userName : '' }</p>
              <Image className="cursor-pointer" src={user_icon} alt="header icon here" onClick={() => {
                window.location.href = '';
                window.location.href = '/profile';
              }} />
            </div>
            <Image className="cursor-pointer" src={heart_icon} alt="header icon here" onClick={toggleSavedVisible} />
            <div className="flex items-center gap-[6px] cursor-pointer" onClick={toggleVisible}>
              <Image src={cart_icon} alt="header icon here" />
              <span className="h-[28px] w-[28px] rounded-full bg-[#F67280] shadow-sm shadow-[#F67280] text-white text-[16px] flex justify-center items-center">{ cart.length }</span>
            </div>
      </div>  
      <div className="hidden md:flex justify-center items-center gap-[10px]">
        <select
          onChange={(e) => setLang(e.target.value)}
          className="w-[70px] h-[30px] outline-none bg-[#E7E9EB] rounded-2xl text-[12px] font-normal flex justify-center items-center gap-[6px] px-[10px]">
          <option value="EN">EN</option>
          <option value="UA">UA</option>
        </select>
        <select
          onChange={(e) => setCurrency(e.target.value)}
          className="w-[70px] h-[30px] outline-none bg-[#E7E9EB] rounded-2xl text-[12px] font-normal flex justify-center items-center gap-[6px] px-[10px]">
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
        </select>
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
