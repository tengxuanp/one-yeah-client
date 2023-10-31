'use client'

import { useLog } from '@/contexts/LogContext';
import { useSocket } from '@/contexts/SocketContext';
import React, { useState, useEffect } from 'react';

const MessageBox = () => {
    const [messageReceived, setMessageReceived] = useState("")
    const {socket} = useSocket();
    const { logMessages } = useLog();




  return (
    <div>
      <h1>Message:</h1>
      <form className='m-2 p-2 border-2 border-black'>
      <ul>
        {logMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      </form>
    </div>
  );
};

export default MessageBox;
