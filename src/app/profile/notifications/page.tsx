'use client'
import React, { useState } from 'react'
import back from '../../../assets/images/goodPopup/back.svg';
import Image from 'next/image'
import useTokenStore from "@/store/token.store";
import { useEffect } from 'react';
import Link from 'next/link';

export default function Notifications() {
    const user = useTokenStore((state: any) => state.user);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user) {
            getNotifications(user._id);
        }
    }, [user]);

    useEffect(() => {
        if (notifications) console.log(notifications);
    }, [notifications]);

    const getNotifications = async (userId: string) => {
        try {
            const response = await fetch(`https://aj-studio-server.onrender.com/notifications/user/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    return (
        <div className='w-full h-screen bg-[#F8F9FA] py-[8px] px-[20px] flex justify-center items-center'>
            <div className="appContainer h-full w-full">
                <div className="w-full flex justify-between items-center">
                    <Link href={'/profile'} className="bg-white h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer">
                        <Image src={back} alt='nav icon' />
                    </Link>
                    <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Notifications</h2>
                    <div className='h-[50px] w-[50px]'></div>
                </div>
                <div className="h-full flex flex-col-reverse gap-[20px] mt-[25px] mb-[25px]">
                    {notifications.length > 0 ? (
                        notifications.map((notification: any, key) => (
                            <div key={key} className="flex flex-col justify-between items-start w-full min-h-[120px] rounded-xl overflow-hidden bg-white">
                                <div className="flex w-full flex-col p-[10px]">
                                    <p className='text-xl font-medium'>Message: { notification.message }.</p>
                                    <p className='text-sm '>Created At: { new Date(notification.createdAt).toLocaleString() }</p>
                                </div>
                                <div className="w-full flex justify-between bg-gray-200 p-[10px]">
                                    <p className=''>Type: { notification.type }</p>
                                    <p className='text-[12px]'>{notification._id}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-lg'>No notifications</p>
                    )}
                </div>
            </div>
        </div>
    )
}
