'use client'
import { IProduct } from '@/interfaces';
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';

export default function ProductsList() {
    const [products, setProducts] = useState<IProduct[]>([]);
    
    const fetchProducts = async () => {
        const response = await fetch('http://localhost:5000/products/');
        const responseData = await response.json();
        setProducts(responseData);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className='flex flex-col gap-[20px] mt-[20px]'>
            <h2 className='text-3xl'>Products</h2>
            {products.map((product: IProduct) => (
                <div key={product._id} className='flex justify-between gap-[40px] bg-red-500'>
                    <Image width={40} height={40} src={'http://localhost:5000/uploads' + product.image} alt="item image" />
                    <p>{product.name}</p>
                    <p>{product._id}</p>
                    <p>{product.price}</p>
                    <button className='bg-black text-white ml-[50px]'>Remove</button>
                </div>
            ))}
        </div>
    )
}
