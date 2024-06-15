'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import back from '../../../../assets/images/goodPopup/back.svg';
import useTokenStore from '@/store/token.store';

export default function BindEmail() {
    const { user } = useTokenStore();
    const userId = user?._id;
    const [email, setEmail] = useState('');
    const [isSended, setIsSended] = useState(false);

    const bindEmail = async () => {
        try {
            const response = await fetch(`https://aj-studio-server.onrender.com/users/${userId}/bind-email`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email.toString() })
            });

            console.log(response);
            setIsSended(true);
        } catch (error) {
          console.error('Error confirming email:', error);
        }
      };


    return (
        <div className='w-full h-screen flex justify-center items-center bg-[#F8F9FA]'>
            <div className="appContainer py-[8px] h-full flex flex-col justify-between">
                <div className="w-full flex justify-between items-center">
                    <Link href={'/profile'} className="bg-white h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer">
                        <Image src={back} alt='nav icon' />
                    </Link>
                    <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Binding email</h2>
                    <div className='h-[50px] w-[50px]'></div>
                </div>
                <div className="flex justify-center items-center h-[calc(100%-100px)]">
                <form
                    className='bg-white shadow-[#dbdbdb] w-[230px] shadow-md rounded-xl p-[15px] flex flex-col gap-[20px]'
                    onSubmit={(e) => {
                        e.preventDefault();
                        bindEmail();
                    }}
                    >
                    {!isSended ? (
                        <>
                        <input
                            className='w-full h-[40px] bg-[#f3f3f3] px-[10px] rounded-md outline-none'
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Your email'
                        />
                        <button
                            className='w-full h-[40px] bg-[#f3f3f3] px-[10px] rounded-md outline-none'
                            type='submit'
                        >
                            Bind
                        </button>
                        </>
                    ) : (
                        <p className='text-lg text-center'>A confirmation message has been sent to the <span className='font-medium'>{ email }</span></p>
                    )}
                    </form>
                </div>
            </div>
        </div>
    )
}
