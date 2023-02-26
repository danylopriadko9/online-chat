import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Socket } from 'socket.io-client';
import Message from './Message';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface ChatProps {
  socket: Socket;
  userName: string;
  roomID: string;
}

interface IMessages {
  roomID: string;
  message: string;
  userName: string;
  time: string;
}

const Chat: React.FC<ChatProps> = ({
  socket,
  userName,
  roomID,
}): JSX.Element => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<IMessages[]>([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        roomID,
        userName,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };

      await socket.emit('send', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className='w-[400px] h-[600px] bg-slate-800 rounded-md flex flex-col justify-between py-3'>
      <div className='w-100'>
        <div
          className={`${
            messageList.length
              ? ''
              : 'flex justify-center items-center h-[500px]'
          }`}
        >
          {messageList.length > 0 ? (
            <ScrollToBottom className='max-w-100 w-100 px-4 flex flex-col h-[500px]'>
              {messageList.map((el) => (
                <Message
                  roomID={el.roomID}
                  message={el.message}
                  userName={el.userName}
                  user={userName}
                  time={el.time}
                />
              ))}
            </ScrollToBottom>
          ) : (
            <span className='text-slate-500'>No messages...</span>
          )}
        </div>
      </div>
      <div className=' w-100 flex justify-evenly'>
        <input
          className='rounded-lg w-[80%] px-4 py-2 outline-none bg-slate-500'
          type='text'
          value={currentMessage}
          placeholder='Message...'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button
          className='w-[50px] h-[50px] flex items-center justify-center bg-blue-400 rounded-lg text-white'
          onClick={sendMessage}
        >
          <ArrowUpwardIcon />
        </button>
      </div>
    </div>
  );
};

export default Chat;
