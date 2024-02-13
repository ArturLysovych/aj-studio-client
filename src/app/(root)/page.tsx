import '../globals.css'
import Image from 'next/image';
import sidelist from '../../assets/images/sidelist.svg';
import search from '../../assets/images/search.svg';
import logo from '../../assets/images/logo.svg';
import arrow from '../../assets/images/arrow.svg';
import cart from '../../assets/images/cart-icon.svg';

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div className="container px-[10px] flex flex-col justify-center items-center">
        {/* Header */}
        <div className="w-full h-[60px] mt-[25px] flex justify-between items-center">
          <div className="h-full flex justify-between items-center gap-[10px]">
            <button className='h-[56px] w-[114px] bg-[#E7E9EB] flex justify-between items-center px-[18px] rounded-2xl text-[18px] text-[#11293B] font-normal'>
              <Image src={sidelist} alt='sidelist icon' /> Menu
            </button>
            <div className="hidden">
              <Image src={search} alt='search icon' />
              <input type="text" placeholder='search' />
            </div>
          </div>
          <Image src={logo} alt='logo icon' />
          <div className="flex flex-col justify-center items-center gap-[5px] cursor-pointer">
            <div className="w-[25px] h-[2px] bg-[#11293B]"></div>
            <div className="w-[25px] h-[2px] bg-[#11293B]"></div>
            <div className="w-[25px] h-[2px] bg-[#11293B]"></div>
          </div>
          {/* For LG screens */}
          {/* <div className=""></div> */}
        </div>
        {/* Slider */}
        <div className="lg:h-[441px] h-[250px] bg-red-500 mt-[20px] flex justify-center gap-[20px]">
          <div className="w-[300px] h-full bg-purple-500 rounded-3xl"></div>

          <div className="w-[340px] h-full bg-purple-500 flex px-[10px] rounded-3xl relative">
            <div className="absolute w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center left-[-20px] top-[50%] mt-[-25px] shadow-2xl shadow-black z-30 cursor-pointer">
              <Image src={arrow} alt='arrow icon' />
            </div>
            <div className="h-full w-[50%] flex flex-col items-start justify-center">
              <h2>Are you ready to <span className='font-bold'>lead the way</span></h2>
              <p>Luxury meets ultimate sitting comfort</p>
              <button className='bg-black w-[120px] h-[50px] lg:w-[155px] lg:h-[60px] text-[#D0AD37] text-[20px] rounded-3xl'>Discover </button>
            </div>
            <div className="w-[50%] h-full flex justify-center items-center relative">
              <p className='absolute z-10 text-5xl font-bold text-[#F5CF94]'>HOT</p>
              <Image src='' alt='slide image' className='h-[150px] w-[150px] bg-yellow-200 bg-opacity-50 z-20' />
            </div>
            <div className="absolute w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center right-[-20px] top-[50%] mt-[-25px] shadow-2xl shadow-black rotate-180 z-30 cursor-pointer">
              <Image src={arrow} alt='arrow icon' />
            </div>
          </div>

          <div className="w-[300px] h-full bg-purple-500 rounded-3xl"></div>
        </div>
        {/* Catalog */}
        <div className="mt-[45px] w-full flex justify-center flex-wrap">
          <div className="h-[481px] w-[245px] flex flex-col justify-between items-start">
            <div className="h-[275px] w-full flex justify-center items-center bg-[#7BE498] rounded-3xl">
              <Image src='' alt='product image' className='bg-red-400 h-[200px] w-[200px]' />
            </div>
            <h2 className='font-bold text-[18px]'>Nike Air</h2>
            <p><span className='text-red-500'>$180 </span><span className='line-through'>$289</span></p>
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
            <button className='w-full h-[60px] bg-[#E7E9EB] rounded-3xl flex justify-center items-center gap-[12px] text-[20px] text-[#11293B]'>
              <Image src={cart} alt='cart icon' />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
