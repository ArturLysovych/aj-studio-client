'use client'
import React, { useEffect } from 'react'
import back from '../../../assets/images/goodPopup/back.svg';
import useTokenStore from "@/store/token.store";
import { useState } from 'react';
import { IProduct } from '@/interfaces';
import Image from 'next/image';

export default function Viewed() {
    const user = useTokenStore((state: any) => state.user);
    const [viewed, setViewed] = useState([]);

    useEffect(() => {
        if (user) {
            getViewed(user._id);
        }
    }, [user]);

    useEffect(() => {
        if (viewed) console.log(viewed);
    }, [viewed]);

    const getViewed = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/users/viewed/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setViewed(data);
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
                <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Viewed products</h2>
                <div className='h-[50px] w-[50px]'></div>
            </div>
            <div className="flex flex-col-reverse">
            {viewed.map((product: any, key) => (
                <div key={key}
                    className='bg-purple-500 overflow-hidden relative w-full h-[150px] sm:h-[150px] flex justify-between items-center rounded-md mt-[30px]'
                >
                    <div className="h-full overflow-y-auto w-[50%] gap-[16px] flex justify-center items-center p-[10px]">
                        <Image width={150} height={150} src={'http://localhost:5000/uploads' + product.image} alt='product icon' />
                    </div>
                    <div className="h-full w-[50%] flex flex-col justify-center gap-[10px] p-[10px] items-start text-[#1A2530]">
                      <p className='text-[14px] font-medium sm:text-[18px]'>Created: {new Date(product.createdAt).toLocaleString()}</p>
                      <p className='text-[16px] font-medium sm:text-[22px]'>{product.name}</p>
                      <p className='text-[16px] font-medium sm:text-[22px]'>{product.title}</p>
                      <p className='text-[12px] w-[50px] font-medium sm:text-[14px]'>{product._id}</p>
                        {/* <Image width={20} height={20} className='cursor-pointer sm:h-[30px] sm:w-[30px]' alt="remove icon" /> */}
                    </div>
                  </div>
            ))}
            </div>
        </div>
    )
}
