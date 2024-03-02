'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import back from '../../assets/images/goodPopup/back.svg';
import { LuHistory } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { TbDiscount2 } from "react-icons/tb";
import arrow from '../../assets/images/profile/right-arrow.svg'
import { IoMdNotificationsOutline } from "react-icons/io";

export default function profile() {
    const router = useRouter();

    return (
        <div className='w-full h-screen py-[8px] px-[20px] flex flex-col justify-between items-center bg-[#F8F9FA]'>
            <div className="w-full flex flex-col">
                <div className="w-full flex justify-between items-center">
                    <div onClick={() => router.push('/')} className="bg-white h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer">
                        <Image src={back} alt='nav icon' />
                    </div>
                    <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Profile</h2>
                    <div onClick={() => router.push('/profile/notifications')} className='bg-white h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer'>
                        <IoMdNotificationsOutline size={24} />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-[20px] mt-[25px]">
                    <div className="flex gap-[12px]">
                        <div className="w-[60px] h-[60px] bg-[#333] rounded-full flex justify-center items-center">
                            <FaUser size={28} color='white' />
                        </div>
                        <div className="flex flex-col">
                            <h2 className='text-lg'>user name</h2>
                            <h2 className='text-sm text-gray-400'>username@gmail.com</h2>            
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-[16px] mt-[25px]">
                        <div className="h-[40px] border-b flex justify-between items-start cursor-pointer" onClick={() => router.push('/profile/history')}>
                            <div className="flex items-center justify-center gap-[20px]">
                                <LuHistory />
                                <p>Orders history</p>
                            </div>
                            <Image src={arrow} alt='nav icon' />
                        </div>
                        <div className="h-[40px] border-b flex justify-between items-start cursor-pointer" onClick={() => router.push('/profile/viewed')}>
                            <div className="flex items-center justify-center gap-[20px]">
                                <GrView />
                                <p>You viewed</p>
                            </div>
                            <Image src={arrow} alt='nav icon' />
                        </div>
                        <div className="h-[40px] border-b flex justify-between items-start cursor-pointer">
                            <div className="flex items-center justify-center gap-[20px]">
                                <TbDiscount2 />
                                <p>Discounts and bonuses</p>
                            </div>
                            <Image src={arrow} alt='nav icon' />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="h-[40px] w-full border-t flex justify-between items-center cursor-pointer" onClick={() => router.push('/profile/settings')}>
                <div className="flex items-center justify-center gap-[20px]">
                    <LuHistory />
                    <p>Settings</p>
                </div>
                <Image src={arrow} alt='nav icon' />
            </div>
        </div>
    )
}
