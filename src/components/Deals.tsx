import Image from 'next/image'
import React from 'react'
import icon1 from '../assets/images/deals/Adidas.png';
import icon2 from '../assets/images/deals/Asics.png';
import icon3 from '../assets/images/deals/Champion.png';
import icon4 from '../assets/images/deals/New Balance.png';
import icon5 from '../assets/images/deals/Nike.png';
import icon6 from '../assets/images/deals/Puma.png';
import icon7 from '../assets/images/deals/Reebok.png';
import icon8 from '../assets/images/deals/Umbro.png';
import icon9 from '../assets/images/deals/Under Armour.png';

export default function Deals() {
  return (
    <div className='w-full min-h-[614px] flex justify-center items-center py-[80px]'>
          <div className="appContainer h-full w-full flex flex-wrap justify-center items-center gap-[100px] lg:gap-[0px]">
              <div className="w-auto lg:w-[50%] h-full flex flex-col justify-center items-center lg:items-start">
                  <h2 className='w-full lg:w-[445px] max-w-[400px] lg:max-w-full text-[42px] md:text-[48px] font-bold text-gray-900 text-center lg:text-start'>Get deals from  100+ companies</h2>
                  <p className='w-full lg:w-[445px] max-w-[400px] lg:max-w-full text-lg text-gray-900 text-center lg:text-start'>Subscribe to our application and get deals from top notch companies in the world every month. Be an exclusive member of the team.</p>
              </div>
              <div className="h-[300px] w-[300px] lg:h-[486px] lg:w-[486px] self-center rounded-full border-purple-100 border-[3px] flex justify-center items-center relative">
                  <div className="deal-icon top-[-32px]">
                      <Image className='w-full' height={60} width={60}  src={icon1} alt='deal icon' /> 
                  </div>
                  <div className="deal-icon bottom-[-32px]">
                      <Image className='w-full' height={60} width={60}  src={icon2} alt='deal icon' /> 
                  </div>
                  <div className="deal-icon left-0 bottom-[70%]">
                      <Image className='w-full' height={60} width={60}  src={icon3} alt='deal icon' /> 
                  </div>
                  <div className="deal-icon left-0 top-[70%]">
                      <Image className='w-full' height={60} width={60}  src={icon4} alt='deal icon' /> 
                  </div>
                  <div className="deal-icon right-0 bottom-[70%]">
                      <Image className='w-full' height={60} width={60}  src={icon5} alt='deal icon' /> 
                  </div>
                  <div className="deal-icon right-0 top-[70%]">
                      <Image className='w-full' height={60} width={60}  src={icon6} alt='deal icon' /> 
                  </div>
                  <div className="w-[200px] h-[200px] lg:h-[340px] lg:w-[340px] border-[40px] border-purple-100 lg:border-[70px] rounded-full relative">
                    <div className="deal-icon left-[50%] ml-[-32px] top-[-32px]">
                      <Image className='w-full' height={60} width={60}  src={icon7} alt='deal icon' /> 
                    </div>
                    <div className="deal-icon left-[-25px] bottom-[0%]">
                      <Image className='w-full' height={60} width={60}  src={icon8} alt='deal icon' /> 
                    </div>
                    <div className="deal-icon right-[-25px] bottom-[0%]">
                      <Image className='w-full' height={60} width={60}  src={icon9} alt='deal icon' /> 
                    </div>
                  </div>
              </div>
          </div>
    </div>
  )
}
