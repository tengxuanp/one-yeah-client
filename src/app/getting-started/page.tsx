'use client'

import React, { useEffect, useState } from 'react'
import { useUsername } from '../../contexts/UsernameContext';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/contexts/SocketContext';


export default function GettingStarted() {
  const router = useRouter();
  const {socket} = useSocket();

  const { username } = useUsername();
  const [roomID, setRoomID] = useState<string | null>(null);
  const [roomIDInput, setRoomIDInput] = useState<string | null>(null);
  
    const handleRoom = (roomId: string | null) => {
      socket.emit('joinRoom', roomId);
    }

    // Join an existing room
    const joinExistingRoom = () => {
      if (roomIDInput) {
        handleRoom(roomIDInput);
      }
    }

    // Create a new room
    const createNewRoom = () => {
      handleRoom(null);
    }

    // useEffect(()=>{
    //   socket.on('roomID', (data: any) => {
    //     router.push(`/lobby/${data}`);
    //   });

    // },[socket])

    useEffect(() => {
      const handleRoomID = (data: any) => {
        router.push(`/lobby/${data}`);
      };
  
      socket.on('roomID', handleRoomID);
  
      return () => {
        socket.off('roomID', handleRoomID);
      };
    }, [socket, router]);

  return (
    <div>
      <h2>Hi, {username} <br /> You may:</h2>
      <button onClick={createNewRoom}>Create a room</button>
      <p>Join a room</p>
      <input placeholder='Room ID' onChange={(e)=>{ setRoomIDInput(e.target.value) }} />
      <button onClick={joinExistingRoom} >Join</button>
      <br />
      <button>Solo!</button>

    </div>
  )
}
