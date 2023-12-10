'use client'

import React, { useState } from 'react';
import gamesData from '../data/game.json'

const GameList = ({ onGameSelect }: { onGameSelect: any }) => {
  const [games] = useState(gamesData);

  const handleGameSelect = (selectedGame: any) => {
    onGameSelect(selectedGame);
  };

  return (
    <div>
      <form>
        {games.map(game => (
          <div className='m-4 mb-8 ' key={game.id}>
          {/* <label className='border-2 border-black m-2 flex justify-center items-center px-10 py-8 bg-[#ce7e2c] shadow-lg	'> */}
            <label className='text-[black] m-4 p-2 self-start inline border-black border-t-2 border-l-2 border-r-4 border-b-4 cursor-pointer
              hover:text-black hover:bg-[#ffdede] hover:border-r-2 hover:border-b-2 duration-300 bg-[#f3a658] active:bg-[#ce7e2c]'>
            <input 
              type="radio"
              className='radioGame'
              name="game"
              value={game.id}
              defaultChecked={game.id===1}
              // defaultValue={1}
              onChange={()=>handleGameSelect(game.id)} />
            {game.name}
          </label><br />
          </div>
        ))}
      </form>
    </div>
  );
};

export default GameList;
