'use client'

import React, { useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useUsername } from '@/contexts/UsernameContext';

const initialState={
  question:'',
  started:false,
}

const GameSession = ({ gameid,roomid }) => {
  const {socket} = useSocket();
  const { host } = useUsername();
  const [state,setState] = useState(initialState);

  // const [question, setQuestion] = useState(null);


  const startQuestion = () =>{
    socket.emit('start_game_session',{roomid,gameid})
    // socket.off('start_game_session',setState(prevState =>({...prevState,startBtn:false})))
  }

  useEffect(() => {
    socket.on('game_started', () => {
      setState(prevState =>({...prevState,started:true}))
    });
  }, [socket]);


  useEffect(() => {
    socket.on('current_question',(data)=>{
      setState(prevState =>({...prevState,question:data.question}))
    })
  }, [socket]);

  const handleReloadYes = () =>{
    socket.emit('start_game_session',{roomid,gameid})
  }
  
  const handleReloadNo = () =>{
    socket.emit('start_game_session',{roomid,gameid})
  }

  return (
    <div>
      <h1>{state.question}</h1>

    <div>
    <p>Instruction</p>
    {/* {host&&state.started==false?<button id='startBtn' onClick={startQuestion}>Start</button>
    :host==false&&state.started==false?<button id='startBtn' disabled>Get ready and wait for host to start</button>:''} */}
    
    {!state.started && (
      <button
        id='startBtn'
        onClick={startQuestion}
        disabled={!host}
      >
        {host ? 'Start' : 'Get ready and wait for host to start'}
      </button>
    )}

    </div>
      <div>  
        <button id='yes' className='bg-green' onClick={handleReloadYes}>Yes</button><br />
        <button id='no' className='bg-red' onClick={handleReloadNo}>No</button>
      </div>
    </div>
  );
};

export default GameSession;
