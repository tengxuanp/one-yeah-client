import React from 'react'
import GameSession from '@/app/components/GameSession';
import gamesData from '../../../data/game.json'

export default function Lobby ({ params }: { params: { gameid: string; roomid: string } }) {
  const {roomid,gameid} = params
  const game = gamesData.find(game => game.id.toString() === gameid);
  
  return (
    <>
    <div>Welcome to: {game ? game.name : 'Unknown Game'}</div>
    <GameSession gameid={gameid} roomid={roomid} />
    </>
  )
}