// GameDataContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import gamesData from '../app/data/game.json';

export type Game = {
  id: number;
  name: string;
  description: string;
  instruction: {
    step_1: string;
    step_2: string;
    step_3: string;
  };
  status: "AVAILABLE" | "UNAVAILABLE";
};

type GameDataContextProps = {
  children: ReactNode;
};

const GameDataContext = createContext<Game[] | undefined>(undefined);

export const useGameData = (): Game[] => {
  const context = useContext(GameDataContext);
  if (context === undefined) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};

const GameDataProvider: React.FC<GameDataContextProps> = ({ children }) => (
  <GameDataContext.Provider value={gamesData as Game[]}>
    {children}
  </GameDataContext.Provider>
);

export default GameDataProvider;
