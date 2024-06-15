'use client'
import { useState } from 'react';
import Cookies from 'js-cookie';
import '../globals.css';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import usePopupStore from '@/store/popup.store';
import Popup from '@/components/Popup';
import Image from 'next/image';
import back from '../../assets/images/goodPopup/back.svg';

interface IFormInput {
    username: string;
    password: string;
}  

export default function Home() {
    const [formType, setFormType] = useState('login');
    const setResponse = usePopupStore(state => state.setResponse);
    const res = usePopupStore(state => state.responseData);

    const { 
        register, 
        handleSubmit, 
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit = async (data: IFormInput) => {
        if (formType === 'login') {
            const response = await fetch('https://aj-studio-server.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            const responseStatus = response.status;

            if (responseStatus === 200) {
                Cookies.set('access_token', responseData.token);
                setResponse('Succesfully login');
            } else {
                setResponse(responseData.message);
            }
        } else if (formType === 'register') {
            const response = await fetch('https://aj-studio-server.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseStatus = response.status;

            if (responseStatus === 201) {
                setResponse('Succesfully registered');
            } else {
                setResponse('Something went wrong');
            }
        }
    };

    const toggleFormType = () => {
        setFormType(formType === 'login' ? 'register' : 'login');
    };

    return (
        <div className="w-full h-screen flex justify-center bg-[#F8F9FA] items-center overflow-hidden relative">
            <Popup responseData={res} />
            <div className="appContainer w-full h-full flex flex-col justify-between py-[8px]">
                <div className="w-full flex justify-between items-center">
                    <Link className="bg-white h-[50px] w-[50px] shadow-sm rounded-full flex justify-center items-center cursor-pointer" href={'/'}>
                        <Image src={back} alt='nav icon' />
                    </Link>
                    <h2 className='text-[16px] font-medium sm:text-[20px] md:text-[22px]'>Auth / {formType === 'login' ? 'Loggining' : 'Registration'}</h2>
                    <div className='h-[50px] w-[50px]'></div>
                </div>
                <div className="appContainer px-[10px] flex justify-center items-center">
                    <form 
                        className='bg-white w-[300px] shadow-[#dbdbdb] shadow-md rounded-xl p-[15px] flex flex-col gap-[20px]' 
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <p className='w-[230px]'>Enter your details to confirm this form.</p>
                        <input 
                            type="text" 
                            placeholder='username' 
                            className='w-full h-[40px] bg-[#f3f3f3] px-[10px] rounded-md outline-none' 
                            {...register('username', { required: true })} 
                        />
                        <input 
                            type="password" 
                            placeholder='password' 
                            className='w-full h-[40px] bg-[#f3f3f3] px-[10px] rounded-md outline-none' 
                            {...register('password', { required: true })}
                        />

                        <button type="submit" className='w-full h-[40px] bg-[#f3f3f3] px-[10px] rounded-md outline-none '>Submit</button>
                        <span className='w-full flex justify-end text-[13px] cursor-pointer' onClick={toggleFormType}>
                            {formType === 'login' ? 'Switch to Registration' : 'Switch to Loggining'}
                        </span>
                    </form>
                </div>
                <div></div>
            </div>
        </div>
    );
}
