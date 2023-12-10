'use client'

import React, { ReactNode, createContext, useContext } from 'react';
import io,{ Socket } from 'socket.io-client';
interface SocketContextProps {
  socket: Socket;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

if (!serverUrl) {
  throw new Error('SERVER_URL is not defined in the environment variables.');
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = io(serverUrl) as Socket;

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
