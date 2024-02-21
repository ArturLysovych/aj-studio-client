'use client'
import { useState, useEffect, FC } from 'react';
import useCartStore from "@/store/cart.store";
import { IProduct } from '@/interfaces';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import usePopupStore from "@/store/popup.store";

const Cart:FC = () => {
  const cart = useCartStore((state: any) => state.cart);
  const isVisible = useCartStore((state: any) => state.isVisible);
  const totalPrice = useCartStore((state: any) => state.totalPrice);
  const clearCart = useCartStore((state: any) => state.clearCart);
  const removeFromCart = useCartStore((state: any) => state.removeFromCart);
  const [token, setToken] = useState('');
  const [responseData, setResponseData] = useState('');
  const setResponse = usePopupStore(state => state.setResponse);
  const res = usePopupStore(state => state.responseData);

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
  };

  return (
    <>
      <div className={`w-[300px] h-[200px] bg-[#ffffff] fixed top-[120px] right-[18%] rounded-xl shadow-[#b4b9be] shadow-md z-30 overflow-y-auto py-[20px] px-[10px] ${isVisible ? 'block' : 'hidden'}`}>
      {cart.length > 0 ?
        <>
          <h2 className='text-center text-lg font-medium'>Your cart:</h2>
          {cart.map((item: IProduct, index: number) => (
            <div key={index} onClick={() => removeFromCart(index)} className='relative w-full h-[60px] flex justify-around items-center border-[5px] border-[#E7E9EB] rounded-md mt-[10px]'>
              <Image width={40} height={40} src={'http://localhost:5000/uploads' + item.image} alt="item image" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p className='line-through text-sm'>${item.oldPrice}</p>
              <div className="opacity-0 transition-all duration-300 hover:opacity-100 cursor-pointer w-full h-full absolute bg-red-500 rounded-sm uppercase flex justify-center items-center text-white text-lg font-medium">Remove</div>
            </div>
          ))}
          <p className='w-full flex justify-start my-[10px] font-medium text-[16px]'>Total price: <span className='ml-[4px] font-semibold text-red-500'>${totalPrice()}</span></p>
          <button className='mt-[10px] bg-[#E7E9EB] h-[40px] w-full font-bold rounded-lg' onClick={createOrder}>Order</button>
        </>
      : <p className='m-[20px] text-center text-lg'>The cart is empty</p>}
      </div>
    </>
  );
}

export default Cart;
