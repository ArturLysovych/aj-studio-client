import React from 'react'
import hexagon from '../assets/images/Polygon.svg'
import Image from 'next/image'

export default function Counter() {
  return (
    <div className='w-full min-h-[519px] mb-[80px]'>
        <div className="w-full md:min-h-[300px] min-h-[150px] bg-[#E7E9EB] flex flex-col md:items-start md:justify-start items-center justify-center gap-[8px] px-[60px] rounded-3xl">
            <h2 className='md:mt-[64px] text-gray-900 font-bold text-[20px] md:text-[40px] lg:text-[60px]'>Some count that matters</h2>
            <p className='md:text-lg text-gray-900 font-semibold'>Our achievement in the journey depicted in numbers</p>
        </div>
        <div className="w-full min-h-[219px] flex flex-wrap lg:justify-between justify-center gap-[120px] md:gap-[100px] lg:gap-0 mt-[150px] md:mt-0">
            <div className="h-[230px] w-[230px] mt-[-80px] flex justify-center items-center relative transition-all duration-300 cursor-pointer hover:scale-110">
                <Image src={hexagon} alt='bg-icon' />
                <div className="absolute flex flex-col justify-center items-center">
                    <h2 className='text-gray-900 text-[48px] font-bold'>40+</h2>
                    <p className='text-gray-900 text-[20px]'>Happy clients</p>
                </div>
            </div>
            <div className="h-[230px] w-[230px] mt-[-80px] flex justify-center items-center relative transition-all duration-300 cursor-pointer hover:scale-110">
                <Image src={hexagon} alt='bg-icon' />
                <div className="absolute flex flex-col justify-center items-center">
                    <h2 className='text-gray-900 text-[48px] font-bold'>540</h2>
                    <p className='text-gray-900 text-[20px]'>Projects Completed</p>
                </div>
            </div>
            <div className="h-[230px] w-[230px] mt-[-80px] flex justify-center items-center relative transition-all duration-300 cursor-pointer hover:scale-110">
                <Image src={hexagon} alt='bg-icon' />
                <div className="absolute flex flex-col justify-center items-center">
                    <h2 className='text-gray-900 text-[48px] font-bold'>300</h2>
                    <p className='text-gray-900 text-[20px]'>Dedicated Members</p>
                </div>
            </div>
            <div className="h-[230px] w-[230px] mt-[-80px] flex justify-center items-center relative transition-all duration-300 cursor-pointer hover:scale-110">
                <Image src={hexagon} alt='bg-icon' />
                <div className="absolute flex flex-col justify-center items-center">
                    <h2 className='text-gray-900 text-[48px] font-bold'>25+</h2>
                    <p className='text-gray-900 text-[20px]'>Awards Won</p>
                </div>
            </div>
        </div>  
    </div>
  )
}
