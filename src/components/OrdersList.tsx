'use client'
import { IProduct } from '@/interfaces';
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';
import useTokenStore from '@/store/token.store';

interface IOrder {
    _id: string;
    user: {
        username: string;
        password: string;
        _id: string;
        likes: IProduct[];
    };
    cart: IProduct[];
    status: string;
}

export default function OrdersList() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const token = useTokenStore((state: any) => state.token);
    
    const fetchProducts = async () => {
        const response = await fetch('http://localhost:5000/orders/');
        const responseData = await response.json();
        setOrders(responseData);
    }

    const setStatus = async (status: string, orderId: string) => {
        const response = await fetch(`http://localhost:5000/orders/update-status/${orderId}/${status}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const responseStatus = response.status;

        fetchProducts();
    };

    const removeOrder = async (orderId: string) => {
        const response = await fetch(`http://localhost:5000/orders/delete-order/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const responseStatus = response.status;

        fetchProducts();
    }

    useEffect(() => {
        fetchProducts();
        console.log(orders);
    }, []);

    return (
        <div className='w-full mt-[20px]'>
            <h2 className='text-3xl'>Orders</h2>
            <div className='flex flex-col gap-[20px] mt-[20px]'>
                {orders.map((order: IOrder) => (
                 <div key={order._id} className='w-full h-[200px] flex justify-between gap-[10px] bg-red-500 p-[20px]'>
                    <div className='bg-purple-500 w-auto p-[10px]'>
                        <p className='text-xl'>Cart:</p>
                        {order.cart.map((item: IProduct) => (
                            <div className='flex gap-[30px]' key={item._id}>
                                <Image width={40} height={40} src={'http://localhost:5000/uploads' + item.image} alt="item image" />
                                <p>{ item.name }</p>
                                <p>{ item._id }</p>
                            </div>
                        ))} 
                    </div>
                    <div className="w-[400px] flex flex-col gap-[10px] bg-green-500 p-[10px]">
                        <h2 className='text-lg'>Order details:</h2>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='flex gap-[5px]'>Customer: <span className='font-medium flex gap-[5px]'>{order.user.username} { order.user._id }</span></p>
                        <p className='flex gap-[5px]'>Status: <span className='font-medium flex gap-[5px]'>{order.status}</span></p>
                    </div>
                    <div className="w-[200px] flex flex-col justify-center items-center gap-[20px]">
                        <button className='bg-black text-white w-full p-[5px]' onClick={() => setStatus('Accepted', order._id)}>Accept</button>
                        <button className='bg-black text-white w-full p-[5px]' onClick={() => setStatus('Closed', order._id)}>Close</button>
                        <button className='bg-black text-white w-full p-[5px]' onClick={() => removeOrder(order._id)}>Remove</button>  
                    </div>
                </div>   
                ))}
            </div>
        </div>
    )
}
