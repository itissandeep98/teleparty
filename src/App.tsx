import React from 'react';
import ChatRoom from './components/ChatRoom';
import ConnectionStatus from './components/ConnectionStatus';
import { TabManager } from './components/TabManager';
import useSocket from './hooks/useSocket';

const App: React.FC = () => {
    const { connected, messages, usersTyping, currentRoomid, handleSendMessage, handleTypingPresence, handleCreateRoom, handleJoinRoom } =
        useSocket();

    return (
        <div className='h-full border-2 border-gray-300 bg-gray-100 p-4 w-full'>
            <ConnectionStatus connected={connected} />
            {connected && (
                <>
                    <TabManager handleCreateRoom={handleCreateRoom} handleJoinRoom={handleJoinRoom} />
                    <ChatRoom
                        messages={messages}
                        roomId={currentRoomid}
                        anyoneTyping={usersTyping}
                        sendMessage={handleSendMessage}
                        updateTypingPresence={handleTypingPresence}
                    />
                </>
            )}
        </div>
    );
};

export default App;
