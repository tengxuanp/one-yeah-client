'use client'

import React, { useEffect, useState } from 'react';
import GameSession from '@/app/components/GameSession';
import gamesData from '../data/game.json';

interface GameData {
  id: number;
  name: string;
  description: string;
  instruction: {
    step_1: string;
    step_2: string;
    step_3: string;
  };
  status: string;
}

interface LobbySessionProps {
  roomid: string;
  gameid: number;
}

export default function LobbySession({ roomid, gameid }: LobbySessionProps) {
  const [game, setGame] = useState<GameData | null>(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        // Simulate an asynchronous fetch operation
        const fetchedGame = gamesData.find((game) => game.id === gameid) || null;

        // Set the fetched game data to the state
        setGame(fetchedGame);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    // Trigger the fetch operation when the component mounts
    fetchGameData();
  }, [gameid]);

  return (
    <>
      <div>Welcome to: {game ? game.name : 'Unknown Game'}</div>
      <GameSession gameid={gameid} roomid={roomid} />
    </>
  );
}
