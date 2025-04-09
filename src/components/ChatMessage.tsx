/**
 * ChatMessage component displays either a system message or a user message
 * with different styling based on the message type.
 */
import React from 'react';
import { SessionChatMessage } from 'teleparty-client';

// Props interface for the ChatMessage component
interface ChatMessageProps {
    message: SessionChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    return (
        <div className=''>
            {/* Conditional rendering based on message type */}
            {message.isSystemMessage ? (
                // System message with gray background and italic text
                <div className='text-gray-500 text-sm italic p-2 bg-gray-100 rounded-lg shadow-sm'>
                    <strong className='font-semibold'>System:</strong> {message.userNickname} {message.body}
                </div>
            ) : (
                // User message with avatar, username, timestamp, and message body
                <div className='flex items-start space-x-3 bg-white p-2 rounded-lg shadow-sm'>
                    {/* User avatar if available */}
                    {message.userIcon && <img src={message.userIcon} alt='User Icon' className='w-8 h-8 rounded-full' />}
                    <div>
                        {/* Username and timestamp */}
                        <strong className='text-blue-600'>{message.userNickname}:</strong>
                        <span className='text-gray-400 text-xs ml-2'>
                            {/* Format timestamp to show hours, minutes, and seconds */}
                            {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                            })}
                        </span>
                        {/* Message content */}
                        <p className='text-gray-800'>{message.body}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
