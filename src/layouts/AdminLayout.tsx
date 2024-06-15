'use client'
import { ReactNode, useEffect, useState } from "react";
import '../app/globals.css'
import useTokenStore from "@/store/token.store";
// import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { IoCubeSharp } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { IoPower } from "react-icons/io5";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Image from "next/image";
import search_icon from '../assets/images/admin/search.svg';
import { MdOutlineRequestPage } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import usePopupStore from "@/store/popup.store";
import Popup from "@/components/Popup";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const AdminLayout = ({ children }: { children?: ReactNode }): JSX.Element => {
    const user = useTokenStore((state: any) => state.user); 
    const token = useTokenStore((state: any) => state.token); 
    const [adminName, setAdminName] = useState('');
    const [dashboardIconColor, setDashboardIconColor] = useState('#000');
    const [cubeIconColor, setCubeIconColor] = useState('#000');
    const [createIconColor, setCreateIconColor] = useState('#000');
    const [powerIconColor, setPowerIconColor] = useState('#000');
    const [orderIconColor, setOrderIconColor] = useState('#000');
    const setResponse = usePopupStore(state => state.setResponse);
    const res = usePopupStore(state => state.responseData);

    useEffect(() => {
        const isAdmin = async () => {
            try {
                const response = await fetch('https://aj-studio-server.onrender.com/admin/is-admin', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const responseData = await response.json();
                if (response.status === 200) console.log('succesfully login')
                else {
                    setResponse('You are not admin!');
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000)
                }
                console.log(responseData);
            } catch (error) {
                console.error(error);
                setResponse('You are not admin!');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000)
            }
        }

        isAdmin();
    }, []);

    const handleMouseEnter = (setIconColor: any) => {
        setIconColor('#4379EE');
    };

    const handleMouseLeave = (setIconColor: any) => {
        setIconColor('#000');
    };

    useEffect(() => {
        if (user) setAdminName(user.username);
    }, [user]);

    return (
        <div className="w-full h-auto flex justify-between items-center bg-[#F5F6FA] relative">
            <Popup responseData={res} />
            <div className="h-full w-[75px] relative">
                <div className="w-[72px] h-screen fixed top-0 p-[25px] flex flex-col items-center gap-[25px] bg-white border-r border-[#E0E0E0]">
                    <RxDashboard onClick={() => window.location.href = '/admin/'} className="text-2xl transition-color duration-300 cursor-pointer" style={{ color: dashboardIconColor }} onMouseEnter={() => handleMouseEnter(setDashboardIconColor)} onMouseLeave={() => handleMouseLeave(setDashboardIconColor)} />
                    <IoCubeSharp onClick={() => window.location.href = '/admin/products'} className="text-2xl transition-color duration-300 cursor-pointer" style={{ color: cubeIconColor }} onMouseEnter={() => handleMouseEnter(setCubeIconColor)} onMouseLeave={() => handleMouseLeave(setCubeIconColor)} />
                    <IoCreateOutline onClick={() => window.location.href = '/admin/create'} className="text-2xl transition-color duration-300 cursor-pointer" style={{ color: createIconColor }} onMouseEnter={() => handleMouseEnter(setCreateIconColor)} onMouseLeave={() => handleMouseLeave(setCreateIconColor)} />
                    <MdOutlineRequestPage onClick={() => window.location.href = '/admin/orders'} className="text-2xl transition-color duration-300 cursor-pointer" style={{ color: powerIconColor }} onMouseEnter={() => handleMouseEnter(setPowerIconColor)} onMouseLeave={() => handleMouseLeave(setPowerIconColor)}  />
                    <IoPower onClick={() => window.location.href = '/'} className="text-2xl transition-color duration-300 cursor-pointer" style={{ color: orderIconColor }} onMouseEnter={() => handleMouseEnter(setOrderIconColor)} onMouseLeave={() => handleMouseLeave(setOrderIconColor)} />
                </div>
            </div>
            <div className="w-full min-h-screen flex flex-col ">
                  <div className="w-full h-[75px] bg-white flex justify-between items-center p-[25px] border-b border-[#E0E0E0]">
                      <div className="flex items-center justify-center gap-[5px]">
                          <Image src={search_icon} alt="search icon" />
                          <input type="text" placeholder="Search" className="w-[120px] p-[5px] outline-none border-none" />
                      </div>
                      <div className="flex gap-[5px]">
                          <div className="w-[50px] h-[50px] bg-[#E0E0E0] flex justify-center items-center rounded-full">
                            <RiAdminLine className="text-black text-3xl" />
                          </div>
                          <div className="flex flex-col">
                              <h2 className="font-medium">{adminName? adminName: 'Loading...'}</h2>
                              <p>Admin</p>
                          </div>
                      </div>
                  </div>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout;
