import React from 'react';
import { SessionChatMessage } from 'teleparty-client';

interface ChatMessageProps {
    message: SessionChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    return (
        <div className='p-4'>
            {message.isSystemMessage ? (
                <div className='text-gray-500 text-sm italic'>
                    <strong className='font-semibold'>System:</strong> {message.userNickname} {message.body}
                </div>
            ) : (
                <div className='flex items-start space-x-3'>
                    {message.userIcon && <img src={message.userIcon} alt='User Icon' className='w-8 h-8 rounded-full' />}
                    <div>
                        <strong className='text-blue-600'>{message.userNickname}:</strong>
                        <span className='text-gray-400 text-xs ml-2'>
                            {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                            })}
                        </span>
                        <p className='text-gray-800'>{message.body}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
