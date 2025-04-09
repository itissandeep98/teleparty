import React, { useState } from 'react';
import { SessionChatMessage } from 'teleparty-client';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import PresenceIndicator from './PresenceIndicator';

// Props interface for the ChatRoom component
interface ChatRoomProps {
    roomId: string | null; // Unique identifier for the chat room
    messages: SessionChatMessage[]; // Array of chat messages
    anyoneTyping: boolean; // Flag indicating if any user is typing
    sendMessage: (message: string) => void; // Function to send a new message
    updateTypingPresence: (isTyping: boolean) => void; // Function to update typing status
    handleLeaveRoom: () => void; // Function to handle room exit
}

/**
 * ChatRoom component that displays messages, typing indicators, and chat input
 * Allows users to copy room ID and leave the room
 */
const ChatRoom: React.FC<ChatRoomProps> = ({ messages, roomId, sendMessage, anyoneTyping, updateTypingPresence, handleLeaveRoom }) => {
    // State to manage the copy button text
    const [isCopied, setIsCopied] = useState(false);

    // Handler to copy room ID to clipboard
    const handleCopy = () => {
        if (roomId) {
            navigator.clipboard.writeText(roomId);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };

    // Return null if no room ID is provided
    if (!roomId) {
        return null;
    }

    return (
        <>
            {/* Room information and action buttons */}
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
            {/* Chat container with messages and input */}
            <div className='flex flex-col h-full bg-gray-100 p-4 rounded-lg shadow-md'>
                {/* Messages container with scroll */}
                <div className='flex-1 overflow-y-auto space-y-2 mb-4 max-h-[500px] overflow-auto'>
                    {messages.map((message, i) => (
                        <ChatMessage key={i} message={message} />
                    ))}
                </div>
                {/* Typing indicator */}
                <PresenceIndicator anyoneTyping={anyoneTyping} />
                {/* Message input field */}
                <ChatInput sendMessage={sendMessage} updateTypingPresence={updateTypingPresence} />
            </div>
        </>
    );
};

export default ChatRoom;
