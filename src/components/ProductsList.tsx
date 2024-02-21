'use client'
import { IProduct } from '@/interfaces';
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';
import ProductAdmin from './ProductAdmin';

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
        <div className='flex flex-wrap justify-center gap-[20px] my-[20px]'>
            {products.map((product: IProduct) => (
                <ProductAdmin product={product}  />
            ))}
        </div>
    )
}
