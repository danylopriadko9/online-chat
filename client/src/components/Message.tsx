import React from 'react';

interface IMessage {
  roomID: string;
  message: string;
  userName: string;
  time: string;
  user: string;
}

const Message: React.FC<IMessage> = ({
  roomID,
  message,
  userName,
  time,
  user,
}): JSX.Element => {
  console.log(user, userName);
  return (
    <div
      className={` mt-2 w-[100%] flex flex-col ${
        userName === user ? 'items-end' : 'items-start'
      }`}
    >
      <p
        className={`rounded-lg w-fit max-w-[350px] p-3 ${
          userName === user
            ? 'bg-blue-400 text-white '
            : 'bg-slate-500 text-slate-300'
        }   break-words`}
      >
        {message}
      </p>
      <span className={`mt-1 text-xs px-2 text-slate-500`}>{time}</span>
    </div>
  );
};

export default Message;
