'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUsername } from '../contexts/UsernameContext';
import { useSocket } from '@/contexts/SocketContext';
import RetroButton from './components/button';

export default function Home() {
  const router = useRouter();
  const { socket } = useSocket();
  const { username, setUsername } = useUsername();
  const [error, setError] = useState('');

  const registerUser = () => {
    if (username.trim() === '') {
      setError('Please fill in username!');
      setTimeout(() => {
        setError('');
      }, 1500);
      return;
    }
    socket.emit("set_username", { username });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      registerUser();
    }
  };

  useEffect(() => {
    socket.on("receive_userdata", (data) => {
      localStorage.setItem('username', data.username);
      localStorage.setItem('userid', data.uniqueIdentifier);
      router.push(`/getting-started`);
    });
  }, [socket]);

  return (
    <main className="flex h-full flex-col items-center self-center">
      <h1 className='my-4 text-2xl font-mono animate-pulse'>Welcome to one-yeah.</h1>
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-between text-sm 
                      lg:flex bg-white p-8 rounded-lg shadow-lg animate-fade-in"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.55)' }}>
        <h1 className="text-4xl font-AmericanCaptain mb-6">Enter your name:</h1>
        <input
          className="outline-none mx-6 py-2 px-1 border-4 border-solid border-gray-400 shadow-lg 
                    focus:shadow-focus focus:ring-2 ring-gray-600 rounded-xl font-bold text-xl"          
          onChange={(e) => {
          setUsername(e.target.value);
          setError('');
          }}
          onKeyDown={handleKeyPress}
        />
        {error && <span className="absolute mt-[4.5rem] ml-2 text-white bg-[#e83030bd] p-2 rounded-2xl shadow-2xl">{error}</span>}
        <RetroButton
          color='red'
          context='Submit'
          onClick={registerUser}
        />
      </div>
      <div></div>
    </main>
  );
}
