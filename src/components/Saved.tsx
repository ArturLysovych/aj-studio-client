'use client'
import { useState, useEffect, FC } from 'react';
import { IProduct } from '@/interfaces';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import back from '../assets/images/goodPopup/back.svg';
import remove from '../assets/images/cart/remove.svg';
import useSavedStore from '@/store/saved.store';

const Saved:FC = () => {
  const isVisible = useSavedStore((state: any) => state.isVisible);
  const toggleVisible = useSavedStore((state: any) => state.toggleVisible);
  const [token, setToken] = useState('');

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      setToken(accessToken);
    } else if (!accessToken) {
      console.log('Please authorize');
    }
  }, []);

  const getUserFromToken = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.user;
    } catch (error) {
      return null;
    }
  };

    return (
        <div className={`w-full h-screen max-w-screen-2xl bg-[#F8F9FA] fixed flex flex-col justify-between items-center shadow-[#b4b9be] shadow-md z-30 top-0 overflow-y-auto pt-[20px] ${isVisible ? 'block' : 'hidden'}`}>
            <div className="w-full px-[10px] max-w-screen-lg">
                <div className="w-full flex justify-between items-center">
                <div onClick={toggleVisible} className="h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer bg-[#FFFFFF]">
                    <Image src={back} alt='nav icon' />
                </div>
                <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>My cart</h2>
                <div className='h-[50px] w-[50px]'></div>
                </div>
                <div className="h-[370px] overflow-auto pr-[20px] pb-[30px]">
                
                </div>
            </div>
            <div className="w-full bg-white shadow-[#707B81] shadow-lg p-[20px] flex justify-center items-center gap-[25px] rounded-t-3xl">
                <div className="w-full h-full max-w-screen-lg flex flex-col lg:flex-row justify-between items-center lg:gap-[40px]">  
                <div className="w-full h-full flex items-start lg:items-center justify-between">
                    <p className='text-[#1A2530] text-[16px] font-medium'>Total Cost</p>
                    <h2 className='font-medium text-[20px]'></h2>
                </div>
                <button className='w-full h-[50px] bg-[#5B9EE1] rounded-[50px] text-[#FFFFFF] font-medium lg:w-[300px]'>Order</button>
                </div>
            </div>      
        </div>
    );
}

export default Saved;
