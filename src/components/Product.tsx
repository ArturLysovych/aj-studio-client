import Image from "next/image";
import { IProduct } from "@/interfaces";
import cart from '../assets/images/cart-icon.svg';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface IProps { 
  product: IProduct; 
  addProduct: any;
  updateLikes: any;
}

const Product = ({ product, addProduct, updateLikes }: IProps): JSX.Element => {
  const [token, setToken] = useState('');
  
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

  const likeProduct = async (productId: string) => {
    try {
      const userId = getUserFromToken(token)._id;
      const response = await fetch(`http://localhost:5000/users/${userId}/like/${productId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to like product');
      }
  
      const responseData = await response.json();
      updateLikes();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className="h-[481px] w-[245px] flex flex-col justify-between items-start relative overflow-hidden">
      <div className="absolute flex">
        {product.tags.map((tag: string, index: number) => (
          index === 0 ? (
            <div key={index} className="w-[65px] h-[31px] uppercase text-white font-bold text-[10px] pb-[4px] bg-[#0077FF] rounded-ss-3xl rounded-ee-3xl z-10 flex justify-center items-center">{tag}</div>
          ) : (
            <div key={index} className="w-[70px] ml-[-20px] uppercase text-white font-bold text-[10px] pb-[4px] h-[31px] bg-[#FF5E00] rounded-ss-3xl rounded-ee-3xl z-20 flex justify-center items-center">{tag}</div>
          )
        ))}
      </div>
      <div className="h-[275px] w-full flex justify-center items-center bg-white border-[5px] border-[#E7E9EB] rounded-3xl">
        <Image width={200} height={200} src={'http://localhost:5000/uploads/' + product.image} alt='product image' className='h-auto w-auto' />
      </div>
      <h2 className='font-bold text-[18px]'>{product.name}</h2>
      <p><span className='text-red-500'>${product.price} </span><span className='line-through'>${product.oldPrice}</span></p>
      <div className="w-full flex justify-between items-center">
        <div className="pb-[10px] pt-[5px] px-[20px] bg-[#458EF6] bg-opacity-25 text-[#458EF6] text-[10px] font-bold rounded-3xl">Colors</div>
        <div className="flex gap-[8px]">
          <div className="w-[10px] h-[10px] rounded-full bg-black"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-orange-500"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-yellow-500"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-green-500"></div>
        </div>
      </div>
      
      <button onClick={() => addProduct(product)} className='w-full h-[60px] bg-[#E7E9EB] rounded-3xl flex justify-center items-center gap-[12px] text-[20px] text-[#11293B]'>
        <Image src={cart} alt='cart icon' />
        Add to cart
      </button>
      <button onClick={() => likeProduct(product._id)} className='h-[20px] w-[40px] bg-[#E7E9EB] rounded-3xl flex self-end justify-center items-center gap-[12px] text-[12px] text-[#11293B]'>
        Like
      </button>
    </div>
  );
}

export default Product;