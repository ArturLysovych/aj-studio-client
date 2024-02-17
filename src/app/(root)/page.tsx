'use client'
import '../globals.css'
import Header from '@/components/Header';
import Slider from '@/components/Slider';
import ProductsContainer from '@/components/ProductsContainer';
import { useState } from 'react';
import useCartStore from "@/store/store";
import { IProduct } from '@/interfaces';
import Image from 'next/image';

export default function Home() {
  const cart = useCartStore((state: any) => state.cart);
  
  const [isCartVisible, setIsCartVisible] = useState(false);
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  }

  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div className="appContainer px-[10px] flex flex-col justify-center items-center relative">
        {/* Header */}
        <Header toggleCart={toggleCart} />
        {/* Cart */}
        {isCartVisible &&
          <div className='w-[300px] h-[200px] bg-[#ffffff] fixed top-[50px] right-[50px] rounded-md shadow-[#E7E9EB] shadow-md z-20 overflow-y-auto py-[20px] px-[10px]'>
            {cart.length > 0 ?
              <>
                <h2 className='text-center'>Your cart:</h2>
                {cart.map((item: IProduct, index: number) => (
                  <div className='w-full h-[60px] flex justify-around items-center rounded-sm bg-[#E7E9EB] mt-[10px]'>
                    <Image width={40} height={40} src={'http://localhost:5000/uploads' + item.image} alt="item image" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p className='line-through text-sm'>${item.oldPrice}</p>
                  </div>
                ))}
                
                <button className='mt-[10px] bg-[#E7E9EB] h-[40px] w-full'>Order</button>
              </>
            : <p className='m-[20px] text-center'>The cart is empty</p>}
          </div>
        }

        {/* Slider */}
        <Slider />
        {/* Catalog */}
        <ProductsContainer />
      </div>
    </div>
  );
}
