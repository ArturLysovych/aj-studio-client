import Image from "next/image";
import { ILocalization, IProduct } from "@/interfaces";
import cart from '../assets/images/cart-icon.svg';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { IoHeartCircleSharp } from "react-icons/io5";
import { motion } from 'framer-motion';
import useGoodPopupStore from '@/store/good.store';
import useSelectStore from "@/store/select.store";

interface IProps { 
  product: IProduct; 
  UAH_Value: number;
  textData: ILocalization;
}

const Product = ({ product, UAH_Value, textData }: IProps): JSX.Element => {
  const [userId, setUserId] = useState<string>('');
  const [likes, setLikes] = useState<String[]>([]);
  const { isShow, good, setIsShow, setGood } = useGoodPopupStore();
  const { lang, currency, setCurrency, setLang } = useSelectStore();

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const decodedToken: any = jwtDecode(accessToken);
      const user = decodedToken.user;
      if (user && user._id) setUserId(user._id)
    } else console.log('Please authorize');
  }, []);

  useEffect(() => { if (userId) getLikes(userId) }, [userId]);

  const getLikes = async (userId: string) => {
    try {
      const likesResponse = await fetch(`http://localhost:5000/users/likes/${userId}`);
      const likesData = await likesResponse.json();
      setLikes(likesData);
    } catch (error) {
      console.error('Error fetching likes:', error);
      return [];
    }
  }

  const likeProduct = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/like/${productId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to like product');
  
      getLikes(userId);
    } catch (error) {
      console.error(error);
    }
  }

  const viewProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/view/${product._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to view product');
  
      const res = await response.json();

      // console.log(res);

    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className="h-[481px] w-[245px] flex flex-col justify-between items-start relative">
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
        <p className="flex items-center gap-[5px]">
          <span className='text-red-500'>
            {currency === 'USD' ? `$${Number(product.price).toFixed()}` : currency === 'UAH' ? `${(Number(product.price) * UAH_Value).toFixed()} UAH` : ''}
          </span>
          <span className='line-through'>
            {product.oldPrice !== '' ? 
              currency === 'USD' ? `$${Number(product.oldPrice).toFixed()}` : currency === 'UAH' ? `${(Number(product.oldPrice) * UAH_Value).toFixed()} UAH` : ''
            : ''}
          </span>
        </p>
        <div className="w-full flex justify-between items-center">
          <div className="pb-[10px] pt-[5px] px-[20px] bg-[#458EF6] bg-opacity-25 text-[#458EF6] text-[10px] font-bold rounded-3xl">{textData.product.colors}</div>
        <div className="flex gap-[8px]">
          {product.colors.map((color: string, index: number) => (
            <div key={index} style={{background: color}} className="w-[10px] h-[10px] rounded-full"></div>
          ))}
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <motion.button 
          onClick={() => {
            setIsShow()
            setGood(product)
            viewProduct()
          }} 
            className={`w-full h-[60px] bg-[#E7E9EB] rounded-3xl flex justify-center items-center gap-[12px] text-[20px] text-[#11293B]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={cart} alt='cart icon' />
            {textData.product.view}
        </motion.button>
          {Array.isArray(likes) && likes.some(like => like === product._id) ? (
          <motion.div
            className="like-icon"
            onClick={() => likeProduct(product._id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoHeartCircleSharp
              className="h-[70px] w-[70px] self-end cursor-pointer"
              fill="#ef4444"
              key={product._id}
            />
          </motion.div>
          ) : (
            <motion.div
              className="like-icon"
              onClick={() => likeProduct(product._id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoHeartCircleSharp
                className="h-[70px] w-[70px] self-end cursor-pointer"
                fill="#E7E9EB"
                key={product._id}
              />
            </motion.div>
          )}
        </div>
    </div>
  );
}

export default Product;
