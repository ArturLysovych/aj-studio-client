'use client'
import { useState } from 'react';
import Cookies from 'js-cookie';
import '../globals.css';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

interface IFormInput {
    username: string;
    password: string;
}  

export default function Home() {
    const [formType, setFormType] = useState('login');

    const { 
        register, 
        handleSubmit, 
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit = async (data: IFormInput) => {
        if (formType === 'login') {
            const response = await fetch('http://localhost:5000/auth/login', {
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
                alert('Succesfully login');
            } else {
                alert(responseData.message);
            }
        } else if (formType === 'register') {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseStatus = response.status;

            if (responseStatus === 201) {
                alert('Succesfully registered');
            } else {
                alert('Something went wrong');
            }
        }
    };

    const toggleFormType = () => {
        setFormType(formType === 'login' ? 'register' : 'login');
    };

    return (
        <div className="w-full h-screen flex justify-center items-center overflow-hidden relative">
            <Link href={"/"} className='absolute top-[25px] left-[25px] p-[5px] bg-[#E7E9EB] rounded-xl cursor-pointer'>Back to Home</Link>
            <div className="appContainer px-[10px] flex justify-center items-center">
                <form 
                    className='flex flex-col bg-[#E7E9EB] p-[15px] gap-[10px] rounded-xl w-[270px]' 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2 className='font-medium text-center text-lg'>{formType === 'login' ? 'Loggining' : 'Registration'}</h2>
                    <input 
                        type="text" 
                        placeholder='username' 
                        className='py-[5px] px-[8px] outline-none' 
                        {...register('username', { required: true })} 
                    />
                    <input 
                        type="text" 
                        placeholder='password' 
                        className='py-[5px] px-[8px] outline-none' 
                        {...register('password', { required: true })} 
                    />

                    <button type="submit" className='p-[5px] bg-white font-medium'>Submit</button>
                    <span className='w-full flex justify-end text-[13px] cursor-pointer' onClick={toggleFormType}>
                        {formType === 'login' ? 'Switch to Registration' : 'Switch to Loggining'}
                    </span>
                </form>
            </div>
        </div>
    );
}
