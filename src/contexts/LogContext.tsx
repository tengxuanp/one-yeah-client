'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSocket } from './SocketContext';

interface LogContextType {
  logMessages: string[];
}

const LogContext = createContext<LogContextType | undefined>(undefined);

interface LogProviderProps {
  children: ReactNode;
}

export const LogProvider = ({ children }: LogProviderProps) => {
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const {socket} = useSocket();

  useEffect(() => {
    socket.on('log_message', (data: { message: string }) => {
      setLogMessages((prevMessages: string[]) => [...prevMessages, data.message]);
    });

    return () => {
      socket.off('log_message');
    };
  }, [socket]);


  return (
    <LogContext.Provider value={{ logMessages }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error('useLog must be used within a LogProvider');
  }
  return context;
};
