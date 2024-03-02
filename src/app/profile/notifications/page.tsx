'use client'
import React, { useState } from 'react'
import back from '../../../assets/images/goodPopup/back.svg';
import Image from 'next/image'
import useTokenStore from "@/store/token.store";
import { useEffect } from 'react';

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
            const response = await fetch(`http://localhost:5000/notifications/user/${userId}`);
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
        <div className='w-full h-screen bg-[#F8F9FA] py-[8px] px-[20px]'>
            <div className="w-full flex justify-between items-center">
                <div onClick={() => window.location.href = '/profile'} className="bg-white h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer">
                    <Image src={back} alt='nav icon' />
                </div>
                <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Notifications</h2>
                <div className='h-[50px] w-[50px]'></div>
            </div>
            <div className="flex flex-col-reverse gap-[10px] mt-[25px]">
                {notifications.length > 0 ? (
                    notifications.map((notification: any, key) => (
                        <div key={key} className="flex flex-col justify-between items-start p-[10px] w-full h-[120px] bg-green-500">
                            <div className="flex flex-col">
                                <p>Type: { notification.type }</p>
                                <p>Message: { notification.message }</p>
                                <p>Created At: { new Date(notification.createdAt).toLocaleString() }</p>
                            </div>
                            <p className='text-[12px] w-full text-end'>{notification._id}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-lg'>No notifications</p>
                )}
            </div>
        </div>
    )
}
