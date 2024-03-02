'use client'
import '../globals.css'
import Header from '@/components/Header';
import Slider from '@/components/Slider';
import ProductsContainer from '@/components/ProductsContainer';
import { useEffect, useState } from 'react';
import Cart from '@/components/Cart';
import logo from '../../assets/images/logo.svg';
import Image from 'next/image';
import usePopupStore from '@/store/popup.store';
import Popup from '@/components/Popup';
import GoodItemPopup from '@/components/GoodItemPopup';
import useGoodPopupStore from '@/store/good.store';
import useCartStore from '@/store/cart.store';
import Saved from '@/components/Saved';
import useSavedStore from '@/store/saved.store';

export default function Home() {
  // const [loading, setLoading] = useState<boolean>(true);
  // const [scaleVal, setScaleVal] = useState(50);
  const responseData = usePopupStore(state => state.responseData);
  const { isShow, good, setIsShow, setGood } = useGoodPopupStore();
  const isVisibleCart = useCartStore((state: any) => state.isVisible);
  const isVisibleSaved = useSavedStore((state: any) => state.isVisible);
  
  // useEffect(() => {
  //   setScaleVal(150);
  // }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-start overflow-hidden relative">
      {/* {loading && (
          <div className="w-full h-full bg-white flex justify-center items-center z-50">
            <div className="hover:scale-125 transition-all duration-300 cursor-pointer">
              <Image onClick={() => setLoading(false)} className={`transition-all h-[120px] w-[120px] duration-1000 scale-${scaleVal}`} src={ logo } alt='logo icon' />
            </div>
          </div>
      )} */}
      {/* {loading ? null: ( */}
      {!isShow && !isVisibleCart && !isVisibleSaved  ? (
        <div className="appContainer px-[10px] flex flex-col justify-center items-center relative">
          {/* Header */}
          <Header />
          {/* Cart */}
          {/* Slider */}
          <Slider />
          {/* Catalog */}
          <ProductsContainer />
        </div>
      ): null}
        
      <Cart />
      <Saved />
      <GoodItemPopup />
      {/* )} */}
      <Popup responseData={responseData} />
    </div>
  );
}
