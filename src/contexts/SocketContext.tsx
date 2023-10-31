'use client'

import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

// interface SocketContextProps {
//   socket: string;
// }

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC = ({ children }) => {
  const socket = io.connect('http://localhost:3001');

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
