import React, { useEffect, useRef, useState } from 'react';
import socketConfig from '../../socket';
import axios from 'axios';

const RealtimeChat = ({ chatId }) => {
  const chatContainerRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [conversation, setConversation] = useState({});
  const [message, setMessage] = useState("");
  const [User, setUser] = useState(null);

  const updateConversation = (id, msgs) => {
    setConversation(prev => {
      let updatedConversations = { ...prev };
      if (!updatedConversations[id]) {
        updatedConversations[id] = [];
      }
      updatedConversations[id] = [...updatedConversations[id], ...msgs];
      return updatedConversations;
    });
  };

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`/getMessagesBetweenTwoParties?partyUsername=${chatId}&currentusername=${User?.username}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(`chatId: ${chatId}`)
    fetchMessages().then(messages => updateConversation(chatId, messages));
  }, [chatId]);


  useEffect(() => {
    const sc = socketConfig();
    setSocket(sc);

    if (User) {
      fetchMessages().then(messages => updateConversation(chatId, messages));
    }

    sc.on('receive-message', message => {
      updateConversation(message.from, [message]);
    });

    return () => {
      sc.disconnect();
    };
  }, [User]);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    if (!userFromStorage) {
      window.location.href = '/signin';
    } else {
      setUser(userFromStorage);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const send = async () => {
    if (!socket || !message || !message.replace(/\s/g, '').length) return;

    const messageObject = {
      content: message,
      from: User.username,
      to: chatId,
      timestamp: new Date().toLocaleString(),
    };

    socket.emit('send-message', messageObject);
    updateConversation(chatId, messageObject);
    setMessage("");
  };

  const currentConversation = conversation[chatId] || [];


  return (
    <div className='h-full w-full mx-auto border border-solid border-white/20 rounded-md p-3 justify-between flex flex-col bg-black/30'>
      <div className='w-full flex justify-between items-center'>
        <div className='text-xl'>
          Realtime Chat with <span className="font-bold">{chatId}</span>
        </div>
      </div>

      <div ref={chatContainerRef} className="flex max-h-[600px] flex-col space-y-2 p-3 h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-w-4">
        {currentConversation.map((message, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 justify-end ${message.from === User.username ? '' : 'flex-row-reverse'}`}
          >
            <div className='max-w-xs px-3 p-2 rounded-lg bg-gray-600 text-end'>
              <p className="text-left">{message.content}</p>
              <span className="text-[10px] w-full text-end text-white">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='flex items-center gap-1'>
        <input
          type="text"
          placeholder="Enter your message"
          className="w-[90%] p-2 rounded-md focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={({ key }) => key === 'Enter' && send()}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}

export default RealtimeChat
