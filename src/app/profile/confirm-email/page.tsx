'use client'
import React, { useEffect } from 'react';
import useTokenStore from '@/store/token.store';
import Cookies from 'js-cookie';

export default function ConfirmEmail() {
  const user = useTokenStore(state => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const confirmationCode = urlParams.get('confirmationCode');
    const userId = urlParams.get('userId');
    const email = urlParams.get('email');

    const confirmEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}/confirm-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, confirmationCode })
        });
        
        if (response.ok) {

          const postData = {
            username: user?.username,
            password: user?.password
          }

          const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const responseData = await response.json();
            const responseStatus = response.status;

            if (responseStatus === 200) {
                Cookies.set('access_token', responseData.token);
            } else {
                console.log(responseData.message);
            }
        } else {
          console.error('Failed to confirm email:', response.statusText);
        }
      } catch (error) {
        console.error('Error confirming email:', error);
      }
    };

    confirmEmail();
  }, []);

  return (
    <div className='w-full h-screen flex justify-center items-center text-lg'>EMAIL CONFIRMED!</div>
  );
}
