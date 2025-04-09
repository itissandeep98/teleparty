import { useEffect, useState } from 'react';
import { MessageList, SessionChatMessage, SocketMessageTypes, TelepartyClient } from 'teleparty-client';
import { SocketMessage } from 'teleparty-client/lib/SocketMessage';
import useSessionStorage from './useSessionStorage';

/**
 * A custom hook that manages WebSocket connections and chat functionality for Teleparty
 * Handles room creation, joining, messaging, and typing indicators
 */
const useSocket = () => {
    // Instance of TelepartyClient for managing WebSocket connections
    const [client, setClient] = useState<TelepartyClient | null>(null);
    // Track connection status to the WebSocket server
    const [connected, setConnected] = useState(false);
    // Store chat messages for the current room
    const [messages, setMessages] = useState<SessionChatMessage[]>([]);
    // Track if any users are currently typing
    const [usersTyping, setUsersTyping] = useState(false);
    // Persist current room details in session storage
    const [currentRoom, setCurrentRoom] = useSessionStorage<{ roomId: string; nickname: string; userIcon?: string } | null>(
        'currentRoom',
        null,
        false
    );

    /**
     * Process incoming WebSocket messages and update state accordingly
     */
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

    /**
     * Event handlers for WebSocket connection lifecycle
     */
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

    /**
     * Initialize a new WebSocket connection
     */
    const handleConnection = () => {
        const newClient = new TelepartyClient(eventHandler);
        setClient(newClient);
    };

    /**
     * Clean up WebSocket connection and reset state
     */
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
        // If the client is connected and a room is stored in session storage, join the room
        if (currentRoom) {
            handleJoinRoom(currentRoom.roomId, currentRoom.nickname, currentRoom.userIcon);
        }
    }, [connected, client]);

    /**
     * Send a chat message to the current room
     */
    const handleSendMessage = (message: string) => {
        if (!client || !currentRoom) return;
        client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
            body: message,
        });
    };

    /**
     * Update typing indicator status
     */
    const handleTypingPresence = (data: boolean) => {
        if (!client || !currentRoom) return;

        client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
            typing: data,
        });
    };

    /**
     * Create a new chat room and join it
     */
    const handleCreateRoom = async (nickname: string, userIcon?: string): Promise<void> => {
        if (!client) return;
        if (currentRoom) {
            alert('You are already in a room. Please leave the current room before creating a new one.');
            return;
        }
        const roomId: string = await client.createChatRoom(nickname, userIcon);
        setCurrentRoom({ roomId, nickname, userIcon });
    };

    /**
     * Join an existing chat room
     */
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
            setCurrentRoom(null);
            alert('Error joining room');
        }
    };

    /**
     * Leave the current room and disconnect
     */
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
