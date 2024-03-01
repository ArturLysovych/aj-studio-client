'use client'
import React, { useEffect } from 'react'
import back from '../../../assets/images/goodPopup/back.svg';
import useTokenStore from "@/store/token.store";
import { useState } from 'react';
import { IProduct } from '@/interfaces';
import Image from 'next/image';

export default function History() {
    const user = useTokenStore((state: any) => state.user);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            getOrders(user._id);
        }
    }, [user]);

    useEffect(() => {
        if (orders) console.log(orders);
    }, [orders]);

    const getOrders = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/orders/user-orders/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOrders(data);
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
                <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Orders History</h2>
                <div className='h-[50px] w-[50px]'></div>
            </div>
            <div className="flex flex-col">
            {orders.map((order: any, key) => (
                <div key={key}
                    className='bg-red-500 relative w-full h-[200px] sm:h-[150px] flex justify-between items-center rounded-md mt-[30px]'
                >
                    <div className="h-[200px] overflow-y-auto w-[50%] gap-[16px] justify-start bg-green-500 p-[10px]">
                      {/* <div className="h-[85px] w-[85px] flex justify-center items-center bg-[white] rounded-2xl shadow-gray-100 shadow-lg sm:h-[150px] sm:w-[150px]">
                        <Image width={85} height={85} src={'http://localhost:5000/uploads' + order.image} className='sm:w-full' alt="item image" />
                      </div> */}
                        {order.cart.map((product: any, key: number) => (
                            <div key={key} className="w-full h-[50px] mt-[10px] bg-yellow-500 flex justify-between items-center p-[5px]">
                                <Image width={50} height={50} src={'http://localhost:5000/uploads' + product.image} alt='product icon' />
                                <p>{ product.name }</p>
                            </div>
                        ))}
                    </div>
                    <div className="h-full w-[50%] flex flex-col justify-center gap-[20px] p-[10px] items-start bg-purple-500 text-[#1A2530]">
                      <p className='text-[14px] font-medium sm:text-[18px]'>Created: {new Date(order.createdAt).toLocaleString()}</p>
                      <p className='text-[16px] font-medium sm:text-[22px]'>{order.status}</p>
                      <p className='text-[14px] w-[50px] font-medium sm:text-[18px]'>{order._id}</p>
                        {/* <Image width={20} height={20} className='cursor-pointer sm:h-[30px] sm:w-[30px]' alt="remove icon" /> */}
                    </div>
                  </div>
                ))}
            </div>
        </div>
    )
}
