'use client'

import GameList from '@/app/components/GameList';
import MessageBox from '@/app/components/MessageBox';
import UserList from '@/app/components/UserList'
import RetroButton from '@/app/components/button';
import { useSocket } from '@/contexts/SocketContext';
import { useUsername } from '@/contexts/UsernameContext';
import React, { useEffect, useState } from 'react'
import copy from 'clipboard-copy';
import LobbySession from '../../lobbysession/page';

export default function Lobby ({ roomid }: { roomid: string }) {
    const {socket} = useSocket();

    const { userlist, setUserlist, setHost, host } = useUsername();
    const [selectedGame, setSelectedGame] = useState(1);
    const [copiedMessageVisible, setCopiedMessageVisible] = useState(false);
    const [showLobbySession,setShowLobbySession] = useState(false)

    const handleCopyClick = () => {
      copy(roomid);
      setCopiedMessageVisible(true);

      setTimeout(() => {
        setCopiedMessageVisible(false);
      }, 1500);

    };

    useEffect(() => {
      // Define the event handler
      const handleReceive = (data:any) => {
        console.log('Received userlist:', data);
        setUserlist(data);


      };
      // Emit 'usersRoomRequest' when the component mounts
      socket.emit('usersRoomRequest', roomid);

      // Add the event listener for 'usersRoomReceive'
      socket.on('usersRoomReceive', handleReceive);
    
      // Cleanup function: Remove the event listener when the component unmounts or 'socket' changes
      return () => {
        socket.off('usersRoomReceive', handleReceive);
      };
    }, [socket]); // Ensure that 'socket' and 'roomid' are stable dependencies

  useEffect(()=>{
    const handleHost = (data:any) => {
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

  const handleGameSelect = (game:any) => {
    setSelectedGame(game);
  };

  useEffect(() => {
    const handleGameStarted = (gameid:any) => {
      // router.push(`/lobby/${roomid}/${gameid}`)
      setSelectedGame(gameid)
      setShowLobbySession(true);
    };
    
    socket.on("game_initiated", handleGameStarted);
  
    return () => {
      socket.off("game_initiated", handleGameStarted);
    };
  }, [socket]);

  return (
    showLobbySession ? (<LobbySession roomid={roomid} gameid={selectedGame} />):(
    <>
    <div className='flex justify-center items-center'>
      <p>Invitation code: </p>
      <div className='text-xl'>{roomid}</div>
      {copiedMessageVisible && <span className="absolute mt-16 ml-2 text-white bg-[#5fc769bd] p-2 rounded-2xl shadow-2xl">Copied!</span>}
      <RetroButton color='green' context='copy' onClick={handleCopyClick} />      
    </div>
    <div className='flex justify-left self-center'>
      <UserList userlist={userlist} />
    </div>
    {host?
    <div>
      <h2>Pick a Game:</h2>
      <GameList onGameSelect={handleGameSelect} />
    </div>:''}
    <div className='fixed bottom-0'>
      <div >
        <MessageBox />
      </div>
      {host? <RetroButton color='red' context='Start game' onClick={handleStartGame} />:''}
    </div>
    </>)
  )
}
