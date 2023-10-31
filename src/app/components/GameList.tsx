'use client'

import React, { useState } from 'react';
import gamesData from '../data/game.json'

const GameList = ({onGameSelect}) => {
  const [games] = useState(gamesData);

  const handleGameSelect = (selectedGame) => {
    onGameSelect(selectedGame);
  };

  return (
    <div>
      <form>
        {games.map(game => (
          <div>
          <label key={game.id}>
            <input 
              type="radio" 
              name="game" 
              value={game.id}
              defaultChecked={game.id===1}
              defaultValue={1}
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
