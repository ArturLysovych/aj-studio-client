'use client'
import { useState, useEffect, FC } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import back from '../assets/images/goodPopup/back.svg';
import { IoMdHeartEmpty } from "react-icons/io";
import useSelectStore from '@/store/select.store';
import Link from 'next/link';

const Saved: FC = () => {
    const [token, setToken] = useState('');
    const [likes, setLikes] = useState([]); 

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            setToken(accessToken);
            const decodedUser = getUserFromToken(accessToken);
            if (decodedUser) {
                getLikes(decodedUser._id);
            }
        } else {
            console.log('Please authorize');
        }
    }, []);

    const getUserFromToken = (token: string) => {
        try {
            const decodedToken: any = jwtDecode(token);
            return decodedToken.user;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const getLikes = async (userId: string) => {
        try {
            const response = await fetch(`https://aj-studio-server.onrender.com/users/liked/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log(response)
            // console.log(data)
            console.log(data)
            setLikes(data);
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    };

    return (
        <div className={`w-full h-screen max-w-screen-2xl bg-[#F8F9FA] fixed flex flex-col justify-between items-center z-30 top-0 overflow-y-auto pt-[20px]`}>
            <div className="w-full px-[10px] max-w-screen-lg">
                <div className="w-full flex justify-between items-center">
                    <Link href={'/'} className="h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer bg-[#FFFFFF]">
                        <Image src={back} alt='nav icon' />
                    </Link>
                    <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Saved</h2>
                    <div className='h-[50px] w-[50px]'></div>
                </div>
                <div className="pr-[20px] pb-[30px] mt-[25px] text-[#1A2530] flex flex-wrap gap-[20px]">
                    {likes.length === 0 ? 
                        <p className='w-full text-center text-lg'>No saved products</p> : null
                    }
                    {likes.map((like: any, index: number) => (
                        like ? (
                            <Link href={`/products/${like._id}`}>
                                <div key={index} className="p-[10px] border-b border-gray-200 w-[170px] h-[223px] bg-white rounded-xl flex flex-col justify-between">
                                    <div className="mr-4 flex flex-col justify-between items-start">
                                        <div className="w-[28px] h-[28px] rounded-full bg-[#F8F9FA] flex justify-center items-center">
                                            <IoMdHeartEmpty color='#F87265' />
                                        </div>
                                        <Image width={100} height={100} src={'https://aj-studio-server.onrender.com/uploads/' + like.image} className='w-[200px]' alt='product image' />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-semibold overflow-hidden h-[23px]">{like.name}</h3>
                                        <p className="font-medium">${like.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ) : null
                    ))}
                </div>
            </div>    
        </div>
    );
}

export default Saved;
