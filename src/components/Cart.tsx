'use client'
import { useState, useEffect, FC } from 'react';
import useCartStore from "@/store/cart.store";
import { IProduct } from '@/interfaces';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import usePopupStore from "@/store/popup.store";
import back from '../assets/images/goodPopup/back.svg';
import remove from '../assets/images/cart/remove.svg';
import useSelectStore from '@/store/select.store';

const Cart: FC = () => {
  const cart = useCartStore((state: any) => state.cart);
  const isVisible = useCartStore((state: any) => state.isVisible);
  const totalPrice = useCartStore((state: any) => state.totalPrice);
  const clearCart = useCartStore((state: any) => state.clearCart);
  const removeFromCart = useCartStore((state: any) => state.removeFromCart);
  const toggleVisible = useCartStore((state: any) => state.toggleVisible);
  const [token, setToken] = useState('');
  const setResponse = usePopupStore(state => state.setResponse);
  const { lang } = useSelectStore();

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      setToken(accessToken);
    } else if (!accessToken) {
      console.log('Please authorize');
    }
  }, []);

  const getUserFromToken = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.user;
    } catch (error) {
      return null;
    }
  };
    
  const createOrder = async () => {
    if (cart.length > 0) {
      const postData = {
        user: getUserFromToken(token),
        cart: cart
      };

      const response = await fetch('http://localhost:5000/orders/make-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });
  
      // const responseData = await response.json();
      const responseStatus = response.status;
  
      if (responseStatus === 200) {
        setResponse('Successfully ordered')
        clearCart();
      } else if (responseStatus === 401 || responseStatus === 403) {
        setResponse('Please authorize to place an order.')
        clearCart();
      }  
    } else {
      setResponse('The cart is empty');
    }
  };

  return (
    <div className={`w-full h-screen max-w-screen-2xl bg-[#F8F9FA] fixed flex flex-col justify-between items-center shadow-[#b4b9be] shadow-md z-30 top-0 overflow-y-auto pt-[20px] ${isVisible ? 'block' : 'hidden'}`}>
      <div className="w-full px-[10px] max-w-screen-lg">
        <div className="w-full flex justify-between items-center">
          <div onClick={toggleVisible} className="h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer bg-[#FFFFFF]">
            <Image src={back} alt='nav icon' />
          </div>
          <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>My cart</h2>
          <div className='h-[50px] w-[50px]'></div>
        </div>
        <div className="h-[370px] overflow-auto pr-[20px] pb-[30px]">
        {cart.length > 0 ?
          <>
            {/* <h2 className='text-center text-lg font-medium'>Your cart:</h2> */}
            {cart.map((item: IProduct, index: number) => (
              <div key={index}
                className='relative w-full h-[90px] sm:h-[150px] flex justify-between items-center rounded-md mt-[30px]'
              >
                <div className="h-full flex gap-[16px] items-center">
                  <div className="h-[85px] w-[85px] flex justify-center items-center bg-[white] rounded-2xl shadow-gray-100 shadow-lg sm:h-[150px] sm:w-[150px]">
                    <Image width={85} height={85} src={'http://localhost:5000/uploads' + item.image} className='sm:w-full' alt="item image" />
                  </div>
                  <div className="h-full flex flex-col justify-start gap-[4px] text-[#1A2530]">
                    <p className='text-[16px] font-medium sm:text-[22px]'>{item.name}</p>
                    <p className='text-[14px] font-medium sm:text-[18px]'>${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="h-full flex flex-col justify-between items-end text-[#1A2530]">
                  <p className='text-[14px] font-medium sm:text-[18px]'>{lang === 'EN'? 'Size' : 'Розмір'}: {item.size}</p>
                  <Image onClick={() => removeFromCart(index)} width={20} height={20} src={remove} className='cursor-pointer sm:h-[30px] sm:w-[30px]' alt="remove icon" />
                </div>
              </div>
            ))}
          </> : <p className='mt-[40px] text-center text-xl'>The cart is empty</p>}
        </div>
      </div>
      <div className="w-full bg-white shadow-[#707B81] shadow-lg p-[20px] flex justify-center items-center gap-[25px] rounded-t-3xl">
        <div className="w-full h-full max-w-screen-lg flex flex-col lg:flex-row justify-between items-center lg:gap-[40px]">  
          <div className="w-full h-full flex items-start lg:items-center justify-between">
            <p className='text-[#1A2530] text-[16px] font-medium'>Total Cost</p>
            <h2 className='font-medium text-[20px]'>${ totalPrice().toFixed(2) }</h2>
          </div>
          <button className='w-full h-[50px] bg-[#5B9EE1] rounded-[50px] text-[#FFFFFF] font-medium lg:w-[300px]' onClick={() => createOrder()}>Order</button>
        </div>
      </div>      
    </div>
  );
}

export default Cart;
