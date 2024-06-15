'use client'
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import usePopupStore from '@/store/popup.store';
import { IProduct } from "@/interfaces";
import GoodItemPopup from "@/components/GoodItemPopup";

export default function Product() {
    const pathname = usePathname();
    const productId = pathname.split('/').pop();
    const setResponse = usePopupStore(state => state.setResponse);

    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products/${productId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                
                const productData = await response.json();

                setProduct(productData);
            } catch (error) {
                setResponse('Error fetching product');
                console.error('Error:', error);
            }
        };

        fetchProduct();
    }, [productId, setResponse]);

    return (
        product && (
            <GoodItemPopup good={product} /> 
        )
    )
}
