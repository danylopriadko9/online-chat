import React from 'react';
import io, { Socket } from 'socket.io-client';
import Chat from './components/Chat';

const socket: Socket = io('http://localhost:3001');

const App: React.FC = (): JSX.Element => {
  const [roomID, setRoomID] = React.useState<string>('');
  const [userName, setUserName] = React.useState<string>('');
  const [chatStatus, setChatStatus] = React.useState<boolean>(false);

  const handleJoin = () => {
    if (!roomID) return alert('RoomID dont have to be empty...');
    socket.emit('join', roomID);
    setChatStatus(true);
  };

  return (
    <div className='flex w-100 h-screen justify-center items-center bg-slate-700'>
      {chatStatus ? (
        <Chat socket={socket} userName={userName} roomID={roomID} />
      ) : (
        <div className='flex flex-col gap-5'>
          <h3 className='text-white text-2xl font-bold text-center'>
            Join to chat
          </h3>
          <input
            className='bg-slate-500 border-solid border-[3px] border-slate-600 px-3 py-2 rounded-md outline-none'
            type='text'
            placeholder='Username'
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            className='bg-slate-500 border-solid border-[3px] border-slate-600 px-3 py-2 rounded-md outline-none'
            type='number'
            placeholder='Room ID'
            onChange={(e) => setRoomID(e.target.value)}
            value={roomID}
          />
          <button
            className='px-3 py-2 text-white bg-green-700 rounded-md mt-5'
            onClick={handleJoin}
          >
            Join the Room
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
