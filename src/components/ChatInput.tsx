import React, { useState } from 'react';

/**
 * Props interface for the ChatInput component
 * @param sendMessage - Function to send the chat message
 * @param updateTypingPresence - Function to update typing status
 */
interface ChatInputProps {
    sendMessage: (message: string) => void;
    updateTypingPresence: (typing: boolean) => void;
}

/**
 * ChatInput component that handles message input and sending
 * Includes typing indicator functionality
 */
const ChatInput: React.FC<ChatInputProps> = ({ sendMessage, updateTypingPresence }) => {
    // State to manage input field value
    const [input, setInput] = useState<string>('');

    /**
     * Handles input changes and updates typing presence
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        updateTypingPresence(e.target.value.length > 0);
    };

    /**
     * Handles sending the message when send button is clicked or enter is pressed
     */
    const handleSendMessage = () => {
        if (input.trim() !== '') {
            sendMessage(input);
            setInput('');
            updateTypingPresence(false);
        }
    };

    return (
        // Chat input container with input field and send button
        <div className='flex items-center space-x-2 p-2 bg-gray-100 rounded'>
            <input
                type='text'
                value={input}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                    }
                }}
                className='flex-1 px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
