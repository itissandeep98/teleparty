import { useEffect, useState } from 'react';
import { SessionChatMessage, SocketMessageTypes, TelepartyClient } from 'teleparty-client';
import { SocketMessage } from 'teleparty-client/lib/SocketMessage';

const useSocket = () => {
    const [client, setClient] = useState<TelepartyClient | null>(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<SessionChatMessage[]>([]);
    const [usersTyping, setUsersTyping] = useState(false);
    const [currentRoomid, setCurrentRoomid] = useState<string | null>(null);

    const processMessage = (message: SocketMessage) => {
        console.log('Received message:', message);
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
        onConnectionReady: () => setConnected(true),
        onClose: () => setConnected(false),
        onMessage: processMessage,
    };

    useEffect(() => {
        const newClient = new TelepartyClient(eventHandler);
        setClient(newClient);
        return () => {
            if (newClient) {
                newClient.teardown();
                setClient(null);
                setConnected(false);
                setMessages([]);
            }
        };
    }, []);

    const handleSendMessage = (message: string) => {
        if (!client || !currentRoomid) return;
        client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
            body: message,
        });
    };

    const handleTypingPresence = (data: boolean) => {
        if (!client || !currentRoomid) return;

        client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
            typing: data,
        });
    };

    const handleCreateRoom = async (nickname: string, userIcon?: string): Promise<void> => {
        if (!client) return;
        const roomId: string = await client.createChatRoom(nickname, userIcon);
        setCurrentRoomid(roomId);
    };

    const handleJoinRoom = async (roomId: string, nickname: string, userIcon?: string): Promise<void> => {
        if (!client) return;
        await client.joinChatRoom(nickname, roomId, userIcon);
        setCurrentRoomid(roomId);
    };

    return {
        client,
        connected,
        messages,
        usersTyping,
        currentRoomid,
        handleTypingPresence,
        handleCreateRoom,
        handleJoinRoom,
        handleSendMessage,
    };
};

export default useSocket;
