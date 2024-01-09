'use client'

import React, { useEffect, useState } from 'react'
import { useUsername } from '../../contexts/UsernameContext';
import { useSocket } from '@/contexts/SocketContext';
import RetroButton from '../components/button';
import Lobby from '../lobby/page';


export default function GettingStarted() {
  const {socket} = useSocket();

  const { username } = useUsername();
  const [roomIDInput, setRoomIDInput] = useState<string>('');

  const [showLobby, setShowLobby] = useState(false);
  
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

    useEffect(() => {
      const handleRoomID = (data: any) => {
        setRoomIDInput(data)
        
        // <Lobby roomid={data} />
      };
  
      socket.on('roomID', handleRoomID);
  
      return () => {
        socket.off('roomID', handleRoomID);
      };
    }, [socket]);

    useEffect(() => {
      if (roomIDInput) {
        setShowLobby(true);
      }
    }, [roomIDInput]);

  return (
    <div>
      {showLobby ? (
        <Lobby roomid={roomIDInput} />
      ) :
      <>
      <div className='mb-2'>
        <h2 className='text-xl'>Hi, {username} <br /> You may:</h2>
      </div>
      <div className='flex justify-center self-center'>
        <div 
          className='border-black border-2 border-r-4 border-b-4 rounded-xl 
          bg-gradient-to-r from-[#ede593b7] to-[#b5ed93bf] m-2 p-2 
          flex flex-col justify-center self-center w-[16rem] max-w-[16rem]'>
          <p className='flex justify-center'>- Create a room -</p>
          <RetroButton color='red' context='Create' onClick={createNewRoom} />
        </div>
      </div>

      <div className='flex justify-center'>--
        <h2 className='text-xl'>OR</h2>
        --
      </div>

      <div className='flex justify-center self-center'>
        <div 
          className='border-black border-2 border-r-4 border-b-4 rounded-xl 
                      bg-gradient-to-r from-[#edc493e5] to-[#cced93e5] m-2 p-2 
                      flex flex-col justify-center w-[16rem] max-w-[16rem]'>
          <p className='flex justify-center'>- Join a room -</p>
          <input
            className="outline-none mx-6 px-1 border-4 border-solid border-gray-400 shadow-lg 
                        focus:shadow-focus focus:ring-2 ring-gray-600 rounded-lg"
            placeholder='Room ID' 
            onChange={(e)=>{ setRoomIDInput(e.target.value) }} />
          <RetroButton color='red' context='Join' onClick={joinExistingRoom} />
        </div>
        
      </div>
      </>
    }
    </div>
  )
}
