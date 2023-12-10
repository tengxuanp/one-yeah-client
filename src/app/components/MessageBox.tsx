'use client'

import { useLog } from '@/contexts/LogContext';
import React, { useEffect, useRef } from 'react';

const MAX_MESSAGES = 2;

const MessageBox = () => {

    const { logMessages } = useLog();
    const messageContainerRef = useRef<HTMLUListElement | null>(null);
    const displayMessages = logMessages.slice(-MAX_MESSAGES);

    useEffect(() => {
      // Scroll to the bottom when new messages are added
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }
    }, [logMessages]);

  return (
    <div className=''>
     <form className='m-2 p-2 '>
      <ul ref={messageContainerRef} className='max-h-48 overflow-y-auto'>
        {displayMessages.map((message, index) => (
          <li className='m-2 p-2 bg-[#f5f5f5f8] rounded-2xl text-sm' key={index}>
            {message}
          </li>
        ))}
      </ul>
      </form>
    </div>
  );
};

export default MessageBox;
