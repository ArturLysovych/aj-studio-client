'use client'
import { FC, useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import Product from "./Product";
import useCartStore from "@/store/store";

const ProductsContainer: FC = (): JSX.Element => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const cart = useCartStore((state: any) => state.cart);
    const addToTheCart = useCartStore((state: any) => state.addToTheCart); 
    
    useEffect(() => {
        console.log(cart);      
    }, [cart]);

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
        addToTheCart(product);
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
