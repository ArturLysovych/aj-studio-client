'use client'
import Image from "next/image";
import { IProduct } from "@/interfaces";
import cart from '../assets/images/cart-icon.svg';
import Link from "next/link";

interface IProps { 
    product: IProduct; 
}

const ProductAdmin = ({ product }: IProps): JSX.Element => {

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
            <Image width={200} height={200} src={'https://aj-studio-server.onrender.com/uploads/' + product.image} alt='product image' className='h-auto w-auto' />
            </div>
            <h2 className='font-bold text-[18px]'>{product.name}</h2>
            <p><span className='text-red-500'>${product.price} </span><span className='line-through'>{product.oldPrice !== ''? `$${product.oldPrice}` : '' }</span></p>
            <div className="w-full flex justify-between items-center">
            <div className="pb-[10px] pt-[5px] px-[20px] bg-[#458EF6] bg-opacity-25 text-[#458EF6] text-[10px] font-bold rounded-3xl">Colors</div>
            <div className="flex gap-[8px]">
            {product.colors.map((color: string, index: number) => (
                <div key={index} style={{ background: color || 'black'}} className="w-[10px] h-[10px] rounded-full"></div>
            ))}
            </div>
            </div>
            <div className="w-full flex items-center justify-between">
            <Link href={`products/edit/${product._id}`} className='w-full h-[60px] bg-[#E7E9EB] rounded-3xl flex justify-center items-center gap-[12px] text-[20px] text-[#11293B]'>
                <Image src={cart} alt='cart icon' />
                Edit product
            </Link>
            </div>
        </div>
  );
}

export default ProductAdmin;
