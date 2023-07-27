import React, { useEffect } from 'react';
import Conversation from './RealtimeChats';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Base = () => {
  const [User, setUser] = React.useState("");
  const [chats, setChats] = React.useState([]);
  const [SelectedChat, setSelectedChat] = React.useState(null);

  useEffect(() => {
    let userFromStorage = localStorage.getItem('user');
    if (!userFromStorage) {
      window.location.href = '/signin'
      return;
    }
    userFromStorage = JSON.parse(userFromStorage);
    setUser(userFromStorage);

    axios.get('/users?username=' + userFromStorage.username).then(({ data }) => {
      setChats(data);
    })
  }, []);



  const SelectChat = chat => {
    setSelectedChat(chat);
    if (!chat.isRead) {
      const chatsCopy = [...chats];
      const chatIndex = chatsCopy.findIndex(c => c.username === chat.username);
      chatsCopy[chatIndex].isRead = true;
      setChats(chatsCopy);
    }
  }

  return (
    <>
      <div>
        <div className='flex gap-2 items-center'>
          Logged in as: {User?.username}

          <Link to='/logout'>
            <button className='text-red-500 font-normal'>
              Logout
            </button>
          </Link>
        </div>
        <div className='flex justify-start h-full'>
          {/* Chat List */}
          <div className='w-full lg:w-1/4'>
            {chats.map((chat) => (
              <div
                onClick={() => SelectChat(chat)}
                key={chat.username}
                className={`p-2 cursor-pointer ${chat.isRead ? 'bg-gray-800 font-normal' : 'bg-gray-900 font-bold'
                  } text-white`}
              >
                <div className='text-lg font-semibold'>{chat.username}</div>
              </div>
            ))}
          </div>

          {/* Detailed Chat */}
          <div className='w-full lg:w-3/4'>
            {/* Content of the detailed chat */}
            {
              !SelectedChat && <div className='text-center text-gray-400'>Select a chat</div>
            }
            {
              SelectedChat && <Conversation chatId={SelectedChat.username} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Base