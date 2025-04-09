import React, { useState } from 'react';
import { SessionChatMessage } from 'teleparty-client';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import PresenceIndicator from './PresenceIndicator';

interface ChatRoomProps {
    roomId: string | null;
    messages: SessionChatMessage[];
    anyoneTyping: boolean;
    sendMessage: (message: string) => void;
    updateTypingPresence: (isTyping: boolean) => void;
    handleLeaveRoom: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ messages, roomId, sendMessage, anyoneTyping, updateTypingPresence, handleLeaveRoom }) => {
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = () => {
        if (roomId) {
            navigator.clipboard.writeText(roomId);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };
    if (!roomId) {
        return null;
    }
    return (
        <>
            <div className='flex items-center w-max gap-2 my-4 justify-between mb-4 bg-white p-2 rounded shadow'>
                <p className='text-sm font-medium text-gray-700'>
                    Room: <span className='font-bold'>{roomId}</span>
                </p>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleCopy();
                    }}
                    className='text-blue-500 text-sm border px-2 py-1 rounded cursor-pointer  hover:underline'>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleLeaveRoom();
                    }}
                    className='text-red-500 border px-2 py-1 cursor-pointer rounded text-sm hover:underline'>
                    Leave Room
                </button>
            </div>
            <div className='flex flex-col h-full bg-gray-100 p-4 rounded-lg shadow-md'>
                <div className='flex-1 overflow-y-auto space-y-2 mb-4'>
                    {messages.map((message, i) => (
                        <ChatMessage key={i} message={message} />
                    ))}
                </div>
                <PresenceIndicator anyoneTyping={anyoneTyping} />
                <ChatInput sendMessage={sendMessage} updateTypingPresence={updateTypingPresence} />
            </div>
        </>
    );
};

export default ChatRoom;
