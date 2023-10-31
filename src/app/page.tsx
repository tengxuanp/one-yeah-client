'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUsername } from '../contexts/UsernameContext';
import { useSocket } from '@/contexts/SocketContext'

export default function Home() {
  const router = useRouter();
  const {socket} = useSocket();

  const { username, setUsername } = useUsername();

  const registerUser = () => {
    socket.emit("set_username", {username})
  }

  useEffect(()=>{
    socket.on("receive_username", () => {
      router.push(`/getting-started`);
    })

  },[socket])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

        <h1>Enter your name:</h1>
        <input onChange={(e)=>{ setUsername(e.target.value) }} />
        <button onClick={registerUser}>Submit</button>

      </div>
      
    </main>
  )
}
