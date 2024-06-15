'use client'
import React, { useEffect } from 'react'
import back from '../../../assets/images/goodPopup/back.svg';
import useTokenStore from "@/store/token.store";
import { useState } from 'react';
import { IProduct } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className='w-full min-h-screen bg-[#F8F9FA] pt-[8px] pb-[40px] px-[20px] flex justify-center'>
            <div className="appContainer w-full h-full">
                <div className="w-full flex justify-between items-center">
                    <Link href={'/profile'} className="bg-white h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer">
                        <Image src={back} alt='nav icon' />
                    </Link>
                    <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Orders History</h2>
                    <div className='h-[50px] w-[50px]'></div>
                </div>
                {orders.length === 0 ?
                    <p className='w-full text-center text-lg mt-[50px]'>Empty history</p> : null
                }
                <div className="flex flex-col-reverse px-[50px]">
                {orders.map((order: any, key) => (
                    <div key={key}
                        className='bg-white relative w-full h-[200px] sm:h-[150px] flex justify-between items-center rounded-md mt-[30px] overflow-hidden'
                    >
                        <div className="h-full overflow-y-auto w-[50%] px-[10px]">
                        {/* <div className="h-[85px] w-[85px] flex justify-center items-center bg-[white] rounded-2xl shadow-gray-100 shadow-lg sm:h-[150px] sm:w-[150px]">
                            <Image width={85} height={85} src={'http://localhost:5000/uploads' + order.image} className='sm:w-full' alt="item image" />
                        </div> */}
                            {order.cart.map((product: any, key: number) => (
                                <div key={key} className="w-full min-h-[50px] mt-[10px] bg-gray-100 rounded-lg flex flex-wrap justify-between items-center p-[5px]">
                                    <div className="flex justify-center items-center gap-[20px]">
                                        <Image width={50} height={50} src={'http://localhost:5000/uploads' + product.image} alt='product icon' />
                                        <p>{product.name}</p>
                                    </div>
                                    <p className='font-bold'>${product.price}</p>
                                    <p className='text-sm text-gray-500'>{product._id}</p>
                                </div>
                            ))}
                        </div>
                        <div className="h-full w-[50%] flex flex-col justify-center gap-[20px] p-[10px] items-start bg-gray-200 text-[#1A2530]">
                        <p className='text-[18px] font-medium md:text-[20px]'>Created: {new Date(order.createdAt).toLocaleString()}</p>
                        <p className='text-[16px] font-medium md:text-[18px]'>Status: {order.status}</p>
                        <p className='text-[16px] md:text-[18px] text-gray-400'>ID: {order._id}</p>
                            {/* <Image width={20} height={20} className='cursor-pointer sm:h-[30px] sm:w-[30px]' alt="remove icon" /> */}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
