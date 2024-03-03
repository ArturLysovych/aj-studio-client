'use client'
import Image from 'next/image'
import firstImage from '../assets/images/slider/slider-1.svg'
import exampleItem from '../assets/images/PngItem_4881188.webp';
import { localizationConstants } from '@/constants';
import useSelectStore from '@/store/select.store';
import { useEffect, useState } from 'react';
import { ILocalization } from '@/interfaces';

const SliderItem = ({ className }: { className: string }): JSX.Element => {
    const { lang } = useSelectStore();
    const [textData, setTextData] = useState<ILocalization>(); 

    useEffect(() => {
        if (lang && lang in localizationConstants) {
            setTextData(localizationConstants[lang]);
        } else {
            console.error(`Localization not found for language '${lang}'`);
        }
    }, [lang]);

    return (
        <div className={`w-fullx h-full ${className} flex flex-col p-[30px] rounded-3xl sm:px-[40px] sm:py-[44px] lg:px-[73px]`}>
            <div className="h-full w-full flex justify-between items-center">
                <div className="h-full w-[50%] flex flex-col items-start justify-start sm:justify-center gap-[10px]">
                    <h2 className='text-[16px] sm:text-[32px] lg:text-[52px]'>{ textData?.swiper.main } <span className='font-bold'>{ textData?.swiper.bold }</span></h2>
                    <p className='text-[12px] sm:text-[16px] lg:text-[20px]'>{ textData?.swiper.description }</p>
                    <button className='bg-black px-[20px] py-[8px] sm:text-[16px] lg:text-[20px] text-[#D0AD37] text-[14px] lg:rounded-[30px] rounded-3xl shadow-black shadow-2xl'>{ textData?.swiper.button }</button>
                </div>
                <div className="w-[50%] h-full flex justify-center items-center relative">
                    <p className='absolute z-10 text-[90px] sm:text-[120px] bottom-0 right-0 lg:text-[240px] lg:bottom-auto lg:right-auto font-bold text-[#000000] text-opacity-15'>HOT</p>
                </div>
                <Image src={firstImage} alt='slide image' className='bg-opacity-50 h-[150px] z-20 absolute bottom-0 right-[-75px] sm:h-[270px] lg:h-[400px] lg:right-0' />
            </div>
            {/* md:flex */}
            <div className="justify-center items-center gap-[10px] absolute bottom-[30px] left-[50%] ml-[-85px] lg:ml-[-130px] z-20 hidden">
                <div className="w-[50px] h-[50px] flex justify-center items-center border-[2px] border-white rounded-lg cursor-pointer lg:h-[80px] lg:w-[80px]">
                    <Image src={exampleItem} alt="example icon" />
                </div>
                <div className="w-[50px] h-[50px] flex justify-center items-center border-[2px] border-white rounded-lg cursor-pointer lg:h-[80px] lg:w-[80px]">
                    <Image src={exampleItem} alt="example icon" />
                </div>
                <div className="w-[50px] h-[50px] flex justify-center items-center border-[2px] border-white rounded-lg cursor-pointer lg:h-[80px] lg:w-[80px]">
                    <Image src={exampleItem} alt="example icon" />
                </div>
            </div>
        </div>
    )
}

export default SliderItem;