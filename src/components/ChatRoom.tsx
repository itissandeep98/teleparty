import React from 'react';
import { SessionChatMessage } from 'teleparty-client';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import PresenceIndicator from './PresenceIndicator';

interface ChatRoomProps {
    roomId: string | null;
    messages: SessionChatMessage[];
    sendMessage: (message: string) => void;
    anyoneTyping: boolean;
    updateTypingPresence: (isTyping: boolean) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ messages, roomId, sendMessage, anyoneTyping, updateTypingPresence }) => {
    if (!roomId) {
        return null;
    }
    return (
        <>
            <div className='flex items-center w-max gap-2 my-4 justify-between mb-4 bg-white p-2 rounded shadow'>
                <span className='text-sm font-medium text-gray-700'>Room ID: {roomId}</span>
                <button onClick={() => navigator.clipboard.writeText(roomId)} className='text-blue-500 text-sm hover:underline'>
                    Copy
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
