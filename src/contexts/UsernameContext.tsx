'use client'

import React, { ReactNode, createContext, useContext, useState } from 'react';

interface UsernameContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userlist: string[];
  setUserlist: React.Dispatch<React.SetStateAction<string[]>>;
  host:boolean;
  setHost:React.Dispatch<React.SetStateAction<boolean>>
}
interface UsernameProviderProps {
  children: ReactNode;
}

const UsernameContext = createContext<UsernameContextType | undefined>(undefined);

export const UsernameProvider: React.FC<UsernameProviderProps> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userlist, setUserlist] = useState<string[]>([]);
  const [host, setHost] = useState(Boolean);

  return (
    <UsernameContext.Provider value={{ username, setUsername, userlist, setUserlist, host, setHost}}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => {
  const context = useContext(UsernameContext);
  if (context === undefined) {
    throw new Error('useUsername must be used within a UsernameProvider');
  }
  return context;
};
