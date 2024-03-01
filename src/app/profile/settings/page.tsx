'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import back from '../../../assets/images/goodPopup/back.svg';
import Image from 'next/image';
import notify from '../../../assets/images/profile/notify.svg';
import remove from '../../../assets/images/profile/delete.svg';
import ship from '../../../assets/images/profile/Shopping.svg';
import arrow from '../../../assets/images/profile/right-arrow.svg';

export default function account() {
    const router = useRouter();
    return (
        <div className='h-screen w-full bg-[#F8F9FA] py-[8px] px-[20px]'>
            <div className="w-full flex justify-between items-center">
                <div onClick={() => router.push('/profile')} className="bg-white h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer">
                    <Image src={back} alt='nav icon' />
                </div>
                <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Account & Settings</h2>
                <div className='h-[50px] w-[50px]'></div>
            </div>
            <h2 className='mt-[25px] font-semibold text-[18px]'>Account</h2>
            <div className="w-full flex flex-col gap-[16px] mt-[25px]">
                <div className="h-[40px] border-b flex justify-between items-start cursor-pointer">
                    <div className="flex items-center justify-center gap-[20px]">
                        <Image src={notify} alt='nav icon' />
                        <p>Notification Setting</p>
                    </div>
                    <Image src={arrow} alt='nav icon' />
                </div>
                <div className="h-[40px] border-b flex justify-between items-start cursor-pointer">
                    <div className="flex items-center justify-center gap-[20px]">
                        <Image src={ship} alt='nav icon' />
                        <p>Shipping Address</p>
                    </div>
                    <Image src={arrow} alt='nav icon' />
                </div>
                <div className="h-[40px] border-b flex justify-between items-start cursor-pointer">
                    <div className="flex items-center justify-center gap-[20px]">
                        <Image src={remove} alt='nav icon' />
                        <p>Delete Account</p>
                    </div>
                </div>
            </div>
            <h2 className='mt-[25px] font-semibold text-[18px]'>App Settings</h2>
            <div className="w-full flex flex-col gap-[16px] mt-[25px]">
                <div className="h-[40px] border-b flex justify-between items-center cursor-pointer">
                    <div className="flex items-center justify-center gap-[20px]">
                        <p>Eneble Push Notifications</p>
                    </div>
                    <input type="checkbox" />
                </div>
                <div className="h-[40px] border-b flex justify-between items-center cursor-pointer">
                    <div className="flex items-center justify-center gap-[20px]">
                        <p>Dark Mode</p>
                    </div>
                    <input type="checkbox" />
                </div>
            </div>
        </div>
    )
}
