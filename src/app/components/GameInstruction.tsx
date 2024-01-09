import React from 'react'
import gamesData from '../data/game.json'

const GameInstruction = ( { gameid }: { gameid: number } ) => {
    const game = gamesData.find(game => game.id === gameid);


  return (
    <div className='grid justify-center items-center border-black border-2 border-b-4 border-r-4 px-2 pb-2
                    bg-[#80d188]'>
      <h1 className='flex justify-center my-2 underline decoration-dotted underline-offset-4' >Game Instruction</h1>
        <p>{game?.instruction.step_1}</p>
        <br />
        <p>{game?.instruction.step_2}</p><br />
        <p>{game?.instruction.step_3}</p>
    </div>
  )
}

export default GameInstruction