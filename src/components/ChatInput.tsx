import React, { useState } from 'react';

interface ChatInputProps {
    sendMessage: (message: string) => void;
    updateTypingPresence: (typing: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage, updateTypingPresence }) => {
    const [input, setInput] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        updateTypingPresence(e.target.value.length > 0);
    };

    const handleSendMessage = () => {
        if (input.trim() !== '') {
            sendMessage(input);
            setInput('');
            updateTypingPresence(false);
        }
    };

    return (
        <div className='flex items-center space-x-2 p-2 bg-gray-100 rounded-md shadow-md'>
            <input
                type='text'
                value={input}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                    }
                }}
                className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Type your message...'
            />
            <button
                onClick={handleSendMessage}
                className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                Send
            </button>
        </div>
    );
};

export default ChatInput;
