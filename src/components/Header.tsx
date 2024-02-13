import { FC } from "react"
import Image from 'next/image'
import sidelist from '../assets/images/sidelist.svg';
import search from '../assets/images/search.svg';
import logo from '../assets/images/logo.svg';

const Header:FC = ():JSX.Element => {
  return (
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
  )
}

export default Header;