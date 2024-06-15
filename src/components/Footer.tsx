'use client'
import React from 'react'
import Image from 'next/image';
import logo from '../assets/images/footer/logo.svg';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className='w-full min-h-[490px] flex justify-center items-center bg-[#212121] py-[100px]'>
      <div className="appContainer px-[20px] h-full flex flex-col justify-center text-white gap-[20px]">
        <div className='min-h-[220px] flex flex-wrap justify-around items-center gap-[20px]'>
          <div className="flex flex-col items-center w-full gap-[30px] sm:w-[154px]">
            <Image src={logo} alt='logo' />
            <p className='font-medium text-[16px]'>+1 (7635) 547-12-97</p>
            <p className='text-[16px]'>pjstudio@gmail.com</p>
          </div>
          <div className="flex flex-col items-center w-full gap-[30px] sm:w-[160px]">
            <h2 className='text-[18px] font-semibold'>Quick links</h2>
            <a className='text-gray-200 text-[16px]'>Product</a>
            <a className='text-gray-200 text-[16px]'>Information</a>
          </div>
          <div className="flex flex-col items-center w-full gap-[30px] sm:w-[160px]">
            <a className='text-gray-200 text-[16px]'>Company</a>
            <a className='text-gray-200 text-[16px]'>Lift media</a>
          </div>
          <div className="flex flex-col items-center w-full gap-[30px] sm:w-[248px]">
            <p className='text-[18px] font-semibold'>Subscribe</p>
            <div className="flex items-center justify-between h-[50px] w-[248px] bg-white rounded-lg overflow-hidden">
              <input className='h-[50px] w-[198px] px-[15px] outline-none text-[#212121]' placeholder='Get product updates' type="text" />
              <button className='w-[50px] h-[50px] bg-[#478EFF] flex justify-center items-center text-white'><FaArrowRightLong /></button>
            </div>
          </div>
        </div>
        <div className="min-h-[70px] flex flex-wrap gap-[20px] justify-center sm:justify-between items-center border-t border-white py-[35px]">
          <div className="flex gap-[15px] items-center">
            <div className="w-[35px] h-[35px] rounded-full border-[2px] border-gray-200 flex justify-center items-center"><FaLinkedinIn color='white' /></div>
            <div className="w-[35px] h-[35px] rounded-full border-[2px] border-gray-200 flex justify-center items-center"><FaFacebookF color='white' /></div>
            <div className="w-[35px] h-[35px] rounded-full border-[2px] border-gray-200 flex justify-center items-center"><FaTwitter color='white' /></div>
          </div>
          <p className='text-[16px]'>A Product of PJ Studio</p>
          <p className='text-[16px]'>© { new Date().getFullYear() } PJ Studio. All rights reserved</p>
        </div>
      </div>
    </div>
  )
}
