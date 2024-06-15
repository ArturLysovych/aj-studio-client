import React from 'react'
import { FaUserAlt } from "react-icons/fa";

export default function Customers() {
  return (
      <div className='w-full min-h-[663px] flex justify-center items-center py-[64px] mb-[80px]'>
          <div className="appContainer h-full flex flex-col justify-between items-center gap-[40px]">
              <h2 className='text-[48px] font-bold text-center'>Our Clients Speak</h2>
              <p className='text-[20px] text-center'>We have been working with clients around the world</p>
              <div className="w-full flex justify-around flex-wrap min-h-[337px] gap-[20px]">
                  <div className="h-[337px] w-[350px] flex flex-col justify-between items-center">
                      <div className="h-[200px] w-full rounded-xl bg-gray-100 flex flex-col justify-center items-center gap-[8px] text-center p-[40px] relative">
                            <h2 className='text-2xl font-medium'>Efficient Collaborating</h2>
                            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.</p>
                            <div className="h-[20px] w-[20px] bg-gray-100 rounded-md absolute bottom-[-5px] left-[50%] ml-[-10px] rotate-45"></div>
                      </div>
                      <div className="w-[56px] h-[56px] rounded-full bg-gray-100 flex justify-center items-center">
                        <FaUserAlt size={30} color='#333' />
                      </div>
                      <h2 className='text-gray-900 font-bold'>Jane Cooper</h2>
                      <p className='text-gray-800'>CEO at ABC Corporation</p>
                  </div>
                  <div className="h-[337px] w-[350px] flex flex-col justify-between items-center">
                      <div className="h-[200px] w-full rounded-xl bg-gray-100 flex flex-col justify-center items-center gap-[8px] text-center p-[40px] relative">
                            <h2 className='text-2xl font-medium'>Intuitive Design</h2>
                            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.</p>
                            <div className="h-[20px] w-[20px] bg-gray-100 rounded-md absolute bottom-[-5px] left-[50%] ml-[-10px] rotate-45"></div>
                      </div>
                      <div className="w-[56px] h-[56px] rounded-full bg-gray-100 flex justify-center items-center">
                        <FaUserAlt size={30} color='#333' />
                      </div>
                      <h2 className='text-gray-900 font-bold'>Jane Cooper</h2>
                      <p className='text-gray-800'>CEO at ABC Corporation</p>
                  </div>
                  <div className="h-[337px] w-[350px] flex flex-col justify-between items-center">
                      <div className="h-[200px] w-full rounded-xl bg-gray-100 flex flex-col justify-center items-center gap-[8px] text-center p-[40px] relative">
                            <h2 className='text-2xl font-medium'>Mindblowing Service</h2>
                            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.</p>
                            <div className="h-[20px] w-[20px] bg-gray-100 rounded-md absolute bottom-[-5px] left-[50%] ml-[-10px] rotate-45"></div>
                      </div>
                      <div className="w-[56px] h-[56px] rounded-full bg-gray-100 flex justify-center items-center">
                        <FaUserAlt size={30} color='#333' />
                      </div>
                      <h2 className='text-gray-900 font-bold'>Jane Cooper</h2>
                      <p className='text-gray-800'>CEO at ABC Corporation</p>
                  </div>
              </div>
              <div className="w-full flex justify-center items-center gap-[12px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[#2EC5CE] border-[5px] transition-all duration-300 cursor-pointer hover:scale-150 hover:border-[2px]"></div>
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[#2EC5CE] border-[5px] transition-all duration-300 cursor-pointer hover:scale-150 hover:border-[2px]"></div>
                  <div className="w-[10px] h-[10px] rounded-full bg-white border-[#2EC5CE] border-[5px] transition-all duration-300 cursor-pointer hover:scale-150 hover:border-[2px]"></div>
              </div>
          </div>
    </div>
  )
}
