'use client'
import { IProduct } from '@/interfaces';
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';
import useTokenStore from '@/store/token.store';
import usePopupStore from '@/store/popup.store';

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
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const setResponse = usePopupStore(state => state.setResponse);

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

        setResponse('Order status changed!');
    };

    const removeOrder = async (orderId: string) => {
        const response = await fetch(`http://localhost:5000/orders/delete-order/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const responseStatus = response.status;

        setResponse('Order deleted!');
        fetchProducts();
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredOrders = selectedStatus === 'all' ? orders : orders.filter(order => order.status === selectedStatus);

    return (
        <div className='w-full my-[20px] px-[25px]'>
            <h2 className='text-3xl'>Orders</h2>
            <div className="flex w-full justify-center gap-[20px]">
                <button className='bg-white px-[10px] py-[5px] rounded-lg' onClick={() => setSelectedStatus('all')}>All</button>
                <button className='bg-white px-[10px] py-[5px] rounded-lg' onClick={() => setSelectedStatus('accepted')}>Accepted</button>
                <button className='bg-white px-[10px] py-[5px] rounded-lg' onClick={() => setSelectedStatus('closed')}>Closed</button>
                <button className='bg-white px-[10px] py-[5px] rounded-lg' onClick={() => setSelectedStatus('pending')}>Pending</button>
            </div>
            <div className='flex flex-col gap-[20px] mt-[20px]'>
                {filteredOrders.map((order: IOrder) => (
                 <div key={order._id} className='w-full scale-50 md:scale-90 lg:scale-100 h-[200px] flex justify-between gap-[10px] bg-white p-[20px] rounded-lg shadow-sm'>
                    <div className='w-auto p-[10px]'>
                        <p className='text-xl font-medium'>Cart:</p>
                        {order.cart.map((item: IProduct) => (
                            <div className='flex gap-[30px]' key={item._id}>
                                <Image width={40} height={40} src={'http://localhost:5000/uploads' + item.image} alt="item image" />
                                <p>{ item.name }</p>
                                <p>{ item._id }</p>
                            </div>
                        ))} 
                    </div>
                    <div className="w-[400px] flex flex-col gap-[10px] p-[10px]">
                        <h2 className='text-lg'>Order details:</h2>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                        <p className='flex gap-[5px]'>Customer: <span className='font-medium flex gap-[5px]'>{order.user.username} { order.user._id }</span></p>
                        <p className='flex gap-[5px]'>Status: <span className='font-medium flex gap-[5px]'>{order.status}</span></p>
                    </div>
                    <div className="w-[200px] flex flex-col justify-center items-center gap-[20px]">
                        <button className='bg-green-600 text-white w-full p-[5px] rounded-lg' onClick={() => setStatus('accepted', order._id)}>Accept</button>
                        <button className='bg-[#E2EAF8] text-black == w-full p-[5px] rounded-lg' onClick={() => setStatus('closed', order._id)}>Close</button>
                        <button className='bg-red-500 text-white w-full p-[5px] rounded-lg' onClick={() => removeOrder(order._id)}>Remove</button>  
                    </div>
                </div>   
                ))}
            </div>
        </div>
    )
}
