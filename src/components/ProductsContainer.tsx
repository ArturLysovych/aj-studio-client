'use client'
import { FC } from "react"
import { useEffect, useState } from 'react';
import { IProduct } from "@/interfaces";
import Product from "./Product";

const ProductsContainer: FC = (): JSX.Element => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cart, setCart] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products/');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                
                const productsData = await response.json();
                setProducts(productsData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProducts();
    }, []);
    
    const addProduct = (product: IProduct) => {
        setCart(prevCart => [...prevCart, product]);
    }

    return (
        <div className="mt-[45px] w-full flex justify-center flex-wrap gap-[40px]">
            {products.map((product: IProduct, key) => 
                <Product product={product} key={key} addProduct={addProduct} />
            )}
        </div>
    )
}

export default ProductsContainer;
