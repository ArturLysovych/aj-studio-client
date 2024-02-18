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
  const [isCartVisible, setIsCartVisible] = useState(false);
  const user = useTokenStore((state: any) => state.user);
  const [likes, setLikes] = useState<IProduct[]>([]);

  const fetchLikes = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/users/likes/${userId}`);
      const responseData = await response.json();
      setLikes(responseData);
    } catch (error) {
      console.error("Помилка отримання лайків:", error);
      return [];
    }
  }

  useEffect(() => {
    if (user) {
      fetchLikes(user._id);
    }
  }, [user]);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  }

  const updateLikes = async () => {
    if (user) {
      const likesData = await fetchLikes(user._id);
      if (likesData !== undefined) {
        setLikes(likesData);
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div className="appContainer px-[10px] flex flex-col justify-center items-center relative">
        {/* Header */}
        <Header toggleCart={toggleCart} />
        {/* Cart */}
        <div className='w-[300px] h-[200px] bg-red-500 fixed z-30 top-[50px]'>
          <h2>Saved products</h2>
          {likes.map((like: IProduct) => (
            <div key={like._id}>
              {like.name}
            </div>
          ))}
        </div>
        <Cart isCartVisible={isCartVisible} toggleCart={toggleCart} />
        {/* Slider */}
        <Slider />
        {/* Catalog */}
        <ProductsContainer updateLikes={updateLikes} />
      </div>
    </div>
  );
}
