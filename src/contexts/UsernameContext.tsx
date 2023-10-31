'use client'

import React, { createContext, useContext, useState } from 'react';

interface UsernameContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userlist: never[];
  setUserlist: React.Dispatch<React.SetStateAction<never[]>>;
  host:boolean;
  setHost:React.Dispatch<React.SetStateAction<boolean>>
}

const UsernameContext = createContext<UsernameContextType | undefined>(undefined);

export const UsernameProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userlist, setUserlist] = useState([]);
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
