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

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [scaleVal, setScaleVal] = useState(50);
  const responseData = usePopupStore(state => state.responseData);

  useEffect(() => {
    setScaleVal(150);
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center overflow-hidden relative">
      <Popup responseData={responseData} />
      {loading && (
          <div className="w-full h-full bg-white flex justify-center items-center z-50">
            <div className="hover:scale-125 transition-all duration-300 cursor-pointer">
              <Image onClick={() => setLoading(false)} className={`transition-all h-[120px] w-[120px] duration-1000 scale-${scaleVal}`} src={ logo } alt='logo icon' />
            </div>
          </div>
      )}
      {loading ? null: (
        <div className="appContainer px-[10px] flex flex-col justify-center items-center relative">
          {/* Header */}
          <Header />
          {/* Cart */}
          <Cart />        
          {/* Slider */}
          <Slider />
          {/* Catalog */}
          <ProductsContainer />
        </div>
      )}
    </div>
  );
}
