'use client'

import React from 'react';
import RetroButton from './button';

interface GameOverProps {
    winner: string;
    onRestart: () => void;
    host: boolean;
    onDisconnectAll: () => void;
    onDisconnectSelf: () => void;
  }

const GameOver: React.FC<GameOverProps> = ({winner,onRestart,host,onDisconnectAll,onDisconnectSelf}) => {

    const handleRestart = () => {
        onRestart(); // Call the onRestart function passed as a prop
    };

    const handleDisconnect = (isHost: boolean) => {
        if (isHost) {
            onDisconnectAll();
        } else {
            onDisconnectSelf();
        }
    }

    return (
        <div className='p-2 py-4 border-2 border-b-4 border-r-4 border-black bg-[#f7f7f7a5]'>
            <div className='grid justify-center self-center'>
                <h1 className='text-4xl mb-2'>Game Over</h1>
                <h2 className='flex justify-center self-center'>Winner is {winner}</h2>
            </div>
            <div className='flex justify-center self-center'>
                {host?
                <div>
                    <RetroButton color='green' context='Restart' onClick={handleRestart} />
                </div>:''}
                <div>
                    <RetroButton color='grey' context='Disconnect' onClick={() => handleDisconnect(host)} />
                </div>
            </div>
        </div>
    );
};

export default GameOver;
