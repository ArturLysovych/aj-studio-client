'use client'
import '../globals.css'
import Header from '@/components/Header';
import Slider from '@/components/Slider';
import ProductsContainer from '@/components/ProductsContainer';
import { useEffect, useState } from 'react';
import Cart from '@/components/Cart';
import useTokenStore from '@/store/token.store';
import { IProduct } from '@/interfaces';

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div className="appContainer px-[10px] flex flex-col justify-center items-center relative">
        {/* Header */}
        <Header />
        {/* Cart */}
        {/* <div className='w-[300px] h-[200px] bg-red-500 fixed z-30 top-[50px]'>
          <h2>Saved products</h2>
          {likes.map((like: IProduct) => (
            <div key={like._id}>
              {like.name}
            </div>
          ))}
        </div> */}
        <Cart />
        {/* Slider */}
        <Slider />
        {/* Catalog */}
        <ProductsContainer />
      </div>
    </div>
  );
}
