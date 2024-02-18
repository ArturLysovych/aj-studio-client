'use client'
import { useState, useEffect } from 'react';
import useCartStore from "@/store/store";
import { IProduct } from '@/interfaces';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface IProps {
  isCartVisible: boolean;
  toggleCart: () => void;
}

const Cart = ({ isCartVisible, toggleCart }: IProps) => {
  const cart = useCartStore((state: any) => state.cart);
  const clearCart = useCartStore((state: any) => state.clearCart);
  const [token, setToken] = useState('');

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      setToken(accessToken);
      console.log(accessToken);
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

    console.log(JSON.stringify(postData))

    const response = await fetch('http://localhost:5000/orders/make-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });

    const responseData = await response.json();
    const responseStatus = response.status;

    console.log(responseData);

    if (responseStatus === 200) {
      alert('Successfully ordered');
      clearCart();
    } else if (responseStatus === 401 || responseStatus === 403) {
      alert('Please authorize to place an order.');
    }
  }

  return (
    <div className={`w-[300px] h-[200px] bg-[#ffffff] fixed top-[120px] right-[18%] rounded-md shadow-[#b4b9be] shadow-md z-20 overflow-y-auto py-[20px] px-[10px] ${isCartVisible ? 'block' : 'hidden'}`}>
      {cart.length > 0 ?
        <>
          <h2 className='text-center'>Your cart:</h2>
          {cart.map((item: IProduct, index: number) => (
            <div key={index} className='w-full h-[60px] flex justify-around items-center rounded-sm bg-[#E7E9EB] mt-[10px]'>
              <Image width={40} height={40} src={'http://localhost:5000/uploads' + item.image} alt="item image" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p className='line-through text-sm'>${item.oldPrice}</p>
            </div>
          ))}
          
          <button className='mt-[10px] bg-[#E7E9EB] h-[40px] w-full' onClick={createOrder}>Order</button>
        </>
      : <p className='m-[20px] text-center text-lg'>The cart is empty</p>}
    </div>
  );
}

export default Cart;
