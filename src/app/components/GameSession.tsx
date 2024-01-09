'use client'

import React, { useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useUsername } from '@/contexts/UsernameContext';
import GameInstruction from './GameInstruction';
import GameOver from './GameOver';
import RetroButton from './button';
interface GameSessionProps {
  gameid: number;
  roomid: string;
}

interface GameState {
  question: string;
  started: boolean;
  currentPlayerTurn: boolean;
  scores: Record<string, number>; // Assuming scores is an object with string keys and number values
  end: boolean;
  winner: string;
  qsLoading: boolean;
}

const initialState={
  question:'',
  started:false,
  currentPlayerTurn:false,
  scores: {},
  end:false,
  winner:'',
  qsLoading:false
}

const GameSession: React.FC<GameSessionProps>  = ({ gameid,roomid }) => {
  const { socket } = useSocket();
  const { host } = useUsername();
  const [state,setState] = useState<GameState>(initialState);

  const startQuestion = () =>{
    socket.emit('request_start_game_session', ({ roomid, gameid }));
  }

  useEffect(() => {
    const handleStartGameSession = ({ roomid, gameid }: { roomid: string; gameid: string }) => {
      socket.off('start_game_session', handleStartGameSession);
      socket.emit('game_session', { roomid, gameid });
    };
  
    socket.on('start_game_session', handleStartGameSession);
  
    return () => {
      socket.off('start_game_session', handleStartGameSession);
    };
  }, [socket]);


  useEffect(() => {
    const handleGameStarted = () => {
      setState(prevState =>({...prevState,started:true}))

    };
  
    socket.on('game_started', handleGameStarted);
  
    return () => {
      socket.off('game_started', handleGameStarted);
    };
  }, [socket]);

  useEffect(() => {
    const handleCurrentPlayerTurn = (isCurrentPlayer: boolean) => {
      setState(prevState =>({...prevState,currentPlayerTurn:isCurrentPlayer}))
    }

    socket.on('current_player_turn',handleCurrentPlayerTurn);
    
    return () => {
      socket.off('current_player_turn',handleCurrentPlayerTurn);
    };

  }, [socket]);

  useEffect(() => {
    const handleCurrentQuestion = (data:{ question: string }) => {
      setState(prevState => ({
        ...prevState,
        question: data.question,
        qsLoading: false,
      }));
    }

    setState((prevState) => ({ ...prevState, qsLoading: true }));
    
    socket.on('current_question', handleCurrentQuestion);
  
    return () => {
      socket.off('current_question', handleCurrentQuestion);
    };
  }, [socket]);

  const handleAnswerYes = () =>{
    const socketid = socket.id
    const answer = 1
    socket.emit('handleAnswer',{socketid,answer,roomid})
  }
  
  const handleAnswerNo = () =>{
    const socketid = socket.id
    const answer = 0
    socket.emit('handleAnswer',{socketid,answer,roomid})
    
  }

  const restartGame = () => {
    socket.emit('clear_scores', { roomid });
    // setState(prevState =>({...prevState,end:false,winner: '',scores:{}}))
  };

  const disconnectGameAll = () => {
    socket.emit('disconnect_all_users');
  }

  const disconnectGameSelf = () => {
    socket.emit('disconnect_user');
  }

  useEffect(() => {
    socket.on('updated_scores', (scores: { [player: string]: number }) => {
      setState(prevState => ({
        ...prevState,
        scores: {
          ...prevState.scores,
          ...scores,
        },
      }));
    });
  }, [socket]);

  useEffect(()=>{
    socket.on('game_over',({ winner }: { winner: string }) => {
      setState(prevState =>({...prevState,end:true,winner:winner}))
    })
    handleAnswerNo()

  },[socket])

  useEffect(()=>{
    socket.on('game_restarted', () => {
      // Reset the local state for other clients
      setState((prevState) => ({
        ...prevState,
        end: false,
        winner: '',
        scores: {},
      }));
      
    });
  }, [socket]);

  useEffect(() => {
    const handleDisconnectAllUsers = () => {
      // Redirect to the homepage or perform any other actions
      window.location.href = '/'; // Update the URL based on your routing
    };
  
    socket.on('disconnect_all_users', handleDisconnectAllUsers);
  
    return () => {
      socket.off('disconnect_all_users', handleDisconnectAllUsers);
    };
  }, [socket]);

  useEffect(() => {
    const handleDisconnectUser = () => {
      window.location.href = '/';
    };
  
    socket.on('disconnect_user', handleDisconnectUser);
  
    return () => {
      socket.off('disconnect_user', handleDisconnectUser);
    };
  }, [socket]);

  return (
    <div>

      {!state.started && (
        <div>
          <div className='flex justify-center self-center mb-2'>
            <GameInstruction gameid={gameid} />
          </div>
          <div className='flex justify-center self-center'>
          {host ?
          
          <RetroButton
            color='red'
            context='Start'
            onClick={startQuestion}
            />
            :<p>Get ready and wait for host to start</p>
          }
          </div>
        </div>
        )}

    {state.started && (      
      <div className='flex justify-center items-center bg-[#3d6531] h-40 px-4
                      border-2 before:border-[#000] drop-shadow-xl'>
          <h1 className='font-bold text-white'>{state.question}</h1>
      </div>)}



    {
      state.started && state.currentPlayerTurn ? (
        <div className='flex justify-center self-center'>  
          <button
            id='yes' 
            className={`text-[black] m-4 p-2 self-start inline border-black border-t-2 border-l-2 border-r-4 border-b-4
            hover:text-black hover:bg-[#57ba72] hover:border-r-2 hover:border-b-2 duration-300 
            ${state.qsLoading == true ? 'bg-gray-400' : 'bg-[#6de38c] active:bg-[#3d824f]'}`} 
            disabled={state.qsLoading == true}
            onClick={handleAnswerYes}>
              {state.qsLoading == true ? 'Please wait...' : 'Yes & Answer'}
          </button>
          <br />
          <button 
            id='no' 
            className={`'text-[black] m-4 p-2 self-start inline border-black border-t-2 border-l-2 border-r-4 border-b-4
            hover:text-black hover:bg-[#b36868] hover:border-r-2 hover:border-b-2 duration-300
            ${state.qsLoading == true ? 'bg-gray-400' : 'bg-[#e38181] active:bg-[#874e4e]'}`}
            disabled={state.qsLoading == true}
            onClick={handleAnswerNo}>
              {state.qsLoading == true ? 'Please wait...' : 'No / Pass'}
          </button>
        </div>
      ) : state.started && !state.currentPlayerTurn ? (
        <div>
          <p>Wait for other player to answer</p>
        </div>
      ) : null
    }
    <div className='fixed bottom-0 m-4 ml-0 p-2 border-2 border-b-4 border-r-2 border-black bg-[#fff7bd]'>
      <h2 className='underline decoration-double'>Player Scores</h2>
      <ul>
        {Object.entries(state.scores).map(([player, score]) => (  
          <li key={player}>
            {player}: {score}
          </li>
        ))}
      </ul>
    </div>

    {state.end && <GameOver winner={state.winner} onRestart={restartGame} host={host} onDisconnectAll={disconnectGameAll} onDisconnectSelf={disconnectGameSelf} />}

    </div>
  );
};

export default GameSession;
