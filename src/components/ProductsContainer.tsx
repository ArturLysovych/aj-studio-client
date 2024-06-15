'use client'
import { FC, useEffect, useState } from "react";
import { IProduct } from "@/interfaces";
import Product from "./Product";
import useSelectStore from "@/store/select.store";

const ProductsContainer: FC = (): JSX.Element => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [UAH_Value, setUAH_Value] = useState<number>(0);
    const { lang } = useSelectStore();
    const [textData, setTextData] = useState<any>(); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://aj-studio-server.onrender.com/products/');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                
                const productsData = await response.json();
                setProducts(productsData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const getUAH = async () => {
            try {
                const response = await fetch('https://open.er-api.com/v6/latest/USD');
                const data = await response.json();
                const UAH_Value = data.rates.UAH;
                setUAH_Value(UAH_Value);
            } catch (error) {
                console.error('Error fetching UAH:', error);
            }
        };

        fetchProducts();
        getUAH();
    }, []);

    return (
        <div className="mt-[45px] w-full flex justify-center flex-wrap gap-[40px] pb-[50px]">
            {products.map((product: IProduct, key) => 
                <Product product={product} UAH_Value={UAH_Value} key={key} textData={textData} />
            )}
        </div>
    )
}

export default ProductsContainer;
