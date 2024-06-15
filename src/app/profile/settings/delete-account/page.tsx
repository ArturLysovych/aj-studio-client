'use client'
import React, { FormEvent, useState } from 'react';
import usePopupStore from '@/store/popup.store';
import Popup from '@/components/Popup';
import useTokenStore from '@/store/token.store';
import Cookies from 'js-cookie';
import back from '../../../../assets/images/goodPopup/back.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function DeleteAccount() {
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState('');
    const { setResponse, responseData } = usePopupStore();
    const { user } = useTokenStore();
    const username = user?.username;

    const handleDeleteAccount = async (e: FormEvent) => {
        e.preventDefault();

        if (!isChecked) {
            setResponse('You must agree to the deletion of your account');
            return;
        }

        try {
            const postData = { username, password };
            console.log(postData)
            const response = await fetch('http://localhost:5000/auth/delete/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                setResponse('Succesfully removed!');
                Cookies.remove('access_token');
            } else {
                const data = await response.json();
                setResponse(data.message);
            }
        } catch (error) {
            setResponse('Something went wrong');
            console.error(error);
        }
    };

    return (
        <div className='w-full h-screen flex flex-col justify-between items-center bg-[#F8F9FA] relative px-[20px] py-[8px]'>
            <div className="w-full appContainer flex justify-between items-center">
                <Link className="bg-white h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer" href={'/profile'}>
                    <Image src={back} alt='nav icon' />
                </Link>
                <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Deleting account</h2>
                <div className='h-[50px] w-[50px]'></div>
            </div>
            <form onSubmit={handleDeleteAccount} className='w-[300px] bg-white shadow-[#dbdbdb] shadow-md rounded-xl p-[15px] flex flex-col gap-[20px]'>
                <p className='w-[230px]'>Enter your details to confirm this form.</p>
                <input type="text" className='w-full h-[40px] bg-[#f3f3f3] px-[10px] rounded-md outline-none text-gray-500' placeholder='username' value={username} disabled />
                <input type="password" className='w-full h-[40px] bg-[#f3f3f3] px-[10px] rounded-md outline-none' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="flex items-center gap-[10px]">
                    I agree to delete my account
                    <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                </div>
                <button type='submit' className='bg-red-500 text-white h-[30px] rounded-md'>Delete</button>
            </form>
            <div></div>
            <Popup responseData={responseData} />
        </div>
    );
}
