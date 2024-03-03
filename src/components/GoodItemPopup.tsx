'use client'
import { IProduct } from '@/interfaces'
import React, { useState, useEffect } from 'react'
import useGoodPopupStore from '@/store/good.store';
import useCartStore from '@/store/cart.store';
import usePopupStore from '@/store/popup.store';
import Image from 'next/image';
import back from '../assets/images/goodPopup/back.svg';
import cart from '../assets/images/goodPopup/cart.svg';
import useSelectStore from '@/store/select.store';
import { localizationConstants } from '@/constants';

export default function GoodItemPopup() {
    const { isShow, good, setIsShow, setGood } = useGoodPopupStore();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const addToTheCart = useCartStore((state: any) => state.addToTheCart);
    const setResponse = usePopupStore(state => state.setResponse);
    const { lang } = useSelectStore();

    const [textData, setTextData] = useState<any>(); 

    useEffect(() => {
        if (lang && lang in localizationConstants) {
            setTextData(localizationConstants[lang]);
        } else {
            console.error(`Localization not found for language '${lang}'`);
        }
    }, [lang]);
    
    const addToCart = (product: any) => {
        if (selectedSize) {
            const productWithSize = { ...product, size: selectedSize };
            addToTheCart(productWithSize);
            setResponse('Added to the cart');
        } else {
            setResponse('Please select a size');
        }
    }
    
    return (
        isShow && good ? (
            <div className="bg-[#F8F9FA] w-full max-w-screen-2xl h-screen fixed top-0 z-50 backdrop-blur-md flex flex-col items-center justify-between overflow-y-auto lg:flex-row">
                <div className='w-full z-50 flex flex-col justify-between items-center relative lg:h-full lg:w-[35%]'>
                    <div className="h-[80px] w-full flex justify-around items-center">
                        <div onClick={setIsShow} className="h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer bg-[#FFFFFF]">
                            <Image src={back} alt='nav icon' />
                        </div>
                        <h2 className='text-lg'>Men`s Shoes</h2>
                        <div className="h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer bg-[#FFFFFF]">
                            <Image src={cart} alt='nav icon' />
                        </div>
                    </div>
                    <Image width={200} height={200} src={'http://localhost:5000/uploads/' + good.image} alt='product image' className='h-auto w-auto md:h-[300px] lg:w-[400px]' />
                    <div className="hidden lg:block"></div>
                </div>

                <div className="w-full min-h-[600px] md:min-h-[700px] text-[#1A2530] bg-white flex flex-col justify-between items-start gap-[16px] rounded-t-3xl overflow-hidden shadow-black shadow-lg lg:shadow-none pt-[20px] lg:h-full lg:w-[65%]">
                    <div className="flex flex-col h-full px-[20px] gap-[16px]">
                        <p className='text-[#5B9EE1] text-[14px] uppercase md:text-[18px]'>{good.tags[0]}, {good.tags[1]}</p>
                        <h3 className='text-[24px] font-medium md:text-[30px]'>{good.name}</h3>
                        <p className='text-[20px] font-medium line-through md:text-[24px]'>${good.oldPrice ? Number(good.oldPrice).toFixed(3) : null}</p>
                        <p className='text-[14px] text-[#707B81] md:text-[18px]'>{good.description }</p>
                        <h3 className='text-[18px] font-medium md:text-[22px]'>{textData?.popup?.gallery}</h3>
                        <div className="flex justify-start gap-[16px]">
                            <div className="w-[56px] h-[56px] md:h-[90px] md:w-[90px] rounded-2xl bg-[#F8F9FA] flex justify-center items-center">
                                <Image width={200} height={200} src={'http://localhost:5000/uploads/' + good.image} alt='product image' className='h-auto w-auto' />
                            </div>
                            <div className="w-[56px] h-[56px] md:h-[90px] md:w-[90px] rounded-2xl bg-[#F8F9FA] flex justify-center items-center">
                                <Image width={200} height={200} src={'http://localhost:5000/uploads/' + good.image} alt='product image' className='h-auto w-auto' />
                            </div>
                            <div className="w-[56px] h-[56px] md:h-[90px] md:w-[90px] rounded-2xl bg-[#F8F9FA] flex justify-center items-center">
                                <Image width={200} height={200} src={'http://localhost:5000/uploads/' + good.image} alt='product image' className='h-auto w-auto' />
                            </div>
                        </div>
                        <h3 className='text-[18px] font-medium md:text-[22px]'>{textData?.popup?.size}</h3>
                        <div className="flex justify-start gap-[16px]">
                            {good.sizes.map((size, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-[45px] h-[45px] text-[16px] md:w-[60px] md:h-[60px] md:text-[20px] cursor-pointer font-medium transition-colors duration-500 rounded-full flex justify-center items-center bg-[${selectedSize === size ? '#5B9EE1' : '#F8F9FA'}] text-[${selectedSize === size ? '#FFFFFF' : '#707B81'}]`}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-[95px] w-full shadow-[#707B81] shadow-lg p-[20px] flex justify-between items-center rounded-t-3xl">
                        <div className="flex flex-col items-start justify-center">
                            <p className='text-[#707B81] text-[16px]'>{textData?.popup?.price}</p>
                            <h2 className='font-medium text-[20px]'>${ good.price.toFixed(3) }</h2>
                        </div>
                        <button className='w-[160px] h-[50px] bg-[#5B9EE1] rounded-[50px] text-[#FFFFFF] font-medium' onClick={() => addToCart(good)}>{textData?.popup?.addToCart}</button>
                    </div>
                </div>
            </div>
        ) : null
    )
}
