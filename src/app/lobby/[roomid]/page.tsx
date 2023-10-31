'use client'

import GameList from '@/app/components/GameList';
import MessageBox from '@/app/components/MessageBox';
import UserList from '@/app/components/UserList'
import { useSocket } from '@/contexts/SocketContext';
import { useUsername } from '@/contexts/UsernameContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Lobby ({ params }: { params: { roomid: string } }) {
    const {socket} = useSocket();
    const router = useRouter();
    const {roomid} = params

    const { userlist, setUserlist, setHost, host } = useUsername();
    // const [host, setHost] = useState(Boolean)
    const [selectedGame, setSelectedGame] = useState(1);

  useEffect(() => {
    const handleReceive = (data: any) => {
        setUserlist(data);
    };

    // Emit 'usersRoomRequest' first
    socket.emit('usersRoomRequest', roomid);
    // Remove the event listener for 'usersRoomRequest'
    socket.off('usersRoomRequest');

    socket.on('usersRoomReceive', handleReceive);

    return () => {
        socket.off('usersRoomReceive', handleReceive);
    };
}, [socket]);

  useEffect(()=>{
    const handleHost = (data) => {
      setHost(data.host)      
    };
    socket.on('checkHost', handleHost);

    return () => {
      socket.off('checkHost', handleHost);
  };
  },[socket])

  useEffect(()=>{

  },[host])

  const handleStartGame = () => {
    socket.emit('initiate_game',selectedGame);
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  useEffect(() => {
    const handleGameStarted = (gameid) => {
      router.push(`/lobby/${roomid}/${gameid}`)
    };
    
  
    socket.on("game_initiated", handleGameStarted);
  
    return () => {
      socket.off("game_initiated", handleGameStarted);
    };
  }, [socket]);

console.log(selectedGame)

  return (
    <>
    <div>Invitation code: {roomid}</div>
    <UserList userlist={userlist} />
    <div>
      <h2>Choose a Game:</h2>
      <GameList onGameSelect={handleGameSelect} />
    </div>
    <div>
      <MessageBox />
    </div>

    {host?<button onClick={handleStartGame}>Start game</button>:''}
    </>
  )
}
