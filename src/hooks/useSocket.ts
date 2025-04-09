import { useEffect, useState } from 'react';
import { MessageList, SessionChatMessage, SocketMessageTypes, TelepartyClient } from 'teleparty-client';
import { SocketMessage } from 'teleparty-client/lib/SocketMessage';
import useSessionStorage from './useSessionStorage';

const useSocket = () => {
    const [client, setClient] = useState<TelepartyClient | null>(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<SessionChatMessage[]>([]);
    const [usersTyping, setUsersTyping] = useState(false);
    const [currentRoom, setCurrentRoom] = useSessionStorage<{ roomId: string; nickname: string; userIcon?: string } | null>(
        'currentRoom',
        null,
        false
    );

    const processMessage = (message: SocketMessage) => {
        switch (message.type) {
            case SocketMessageTypes.SEND_MESSAGE:
                setMessages((prevMessages) => [...prevMessages, message.data]);
                break;
            case SocketMessageTypes.SET_TYPING_PRESENCE:
                setUsersTyping(message.data.anyoneTyping);
                break;
        }
    };

    const eventHandler = {
        onConnectionReady: () => {
            setConnected(true);
        },
        onClose: () => {
            setConnected(false);
            handleConnection();
        },
        onMessage: processMessage,
    };

    const handleConnection = () => {
        const newClient = new TelepartyClient(eventHandler);
        setClient(newClient);
    };

    const handleDisconnect = () => {
        if (client) {
            client.teardown();
            setClient(null);
            setConnected(false);
            setMessages([]);
        }
    };

    useEffect(() => {
        handleConnection();
        return () => handleDisconnect();
    }, []);

    useEffect(() => {
        if (currentRoom) {
            handleJoinRoom(currentRoom.roomId, currentRoom.nickname, currentRoom.userIcon);
        }
    }, [connected, client]);

    const handleSendMessage = (message: string) => {
        if (!client || !currentRoom) return;
        client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
            body: message,
        });
    };

    const handleTypingPresence = (data: boolean) => {
        if (!client || !currentRoom) return;

        client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
            typing: data,
        });
    };

    const handleCreateRoom = async (nickname: string, userIcon?: string): Promise<void> => {
        if (!client) return;
        if (currentRoom) {
            alert('You are already in a room. Please leave the current room before creating a new one.');
            return;
        }
        const roomId: string = await client.createChatRoom(nickname, userIcon);
        setCurrentRoom({ roomId, nickname, userIcon });
    };

    const handleJoinRoom = async (roomId: string, nickname: string, userIcon?: string): Promise<void> => {
        if (!(client && connected)) return;
        try {
            const response: MessageList = await client.joinChatRoom(nickname, roomId, userIcon);
            if (!currentRoom) {
                setCurrentRoom({ roomId, nickname, userIcon });
            }
            setMessages(response.messages);
        } catch (error) {
            console.log('Error joining room:', error);
            alert('Error joining room');
        }
    };

    const handleLeaveRoom = () => {
        handleDisconnect();
        setCurrentRoom(null);
    };

    return {
        connected,
        messages,
        usersTyping,
        currentRoom: currentRoom,
        handleTypingPresence,
        handleCreateRoom,
        handleJoinRoom,
        handleSendMessage,
        handleLeaveRoom,
    };
};

export default useSocket;
