'use client'
import '../globals.css'
import Header from '@/components/Header';
import Slider from '@/components/Slider';
import ProductsContainer from '@/components/ProductsContainer';
import { useState } from 'react';
import Cart from '@/components/Cart';

export default function Home() {
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
        <Cart isCartVisible={isCartVisible} toggleCart={toggleCart} />
        {/* Slider */}
        <Slider />
        {/* Catalog */}
        <ProductsContainer />
      </div>
    </div>
  );
}
