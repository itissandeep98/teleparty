import clsx from 'clsx';
import { useState } from 'react';
import { AvatarSelector } from './AvatarSelector';

interface TabManagerProps {
    handleCreateRoom: (nickname: string, userIcon?: string) => void;
    handleJoinRoom: (roomId: string, nickname: string, userIcon?: string) => void;
}

export const TabManager: React.FC<TabManagerProps> = ({ handleCreateRoom, handleJoinRoom }) => {
    const [nickname, setNickname] = useState<string>('');
    const [roomId, setRoomId] = useState<string>('');
    const [userIcon, setUserIcon] = useState<string | undefined>(undefined);
    const [tabState, setTabState] = useState<number>(0);

    const handleCreateRoomClick = () => {
        handleCreateRoom(nickname, userIcon);
        setNickname('');
        setRoomId('');
        setUserIcon(undefined);
    };

    const handleJoinRoomClick = () => {
        handleJoinRoom(roomId, nickname, userIcon);
        setNickname('');
        setRoomId('');
        setUserIcon(undefined);
    };

    return (
        <div className='p-6 bg-white shadow-md rounded-lg'>
            <div className='flex border-b mb-4'>
                <button
                    className={clsx(
                        'px-4 py-2 font-semibold cursor-pointer',
                        { 'border-b-2 border-blue-500 text-blue-500': tabState === 0 },
                        { 'text-gray-500': tabState === 1 }
                    )}
                    onClick={() => setTabState(0)}>
                    Create Room
                </button>
                <button
                    className={clsx(
                        'px-4 py-2 font-semibold cursor-pointer',
                        { 'border-b-2 border-blue-500 text-blue-500': tabState === 1 },
                        { 'text-gray-500': tabState === 0 }
                    )}
                    onClick={() => setTabState(1)}>
                    Join Room
                </button>
            </div>
            {tabState === 0 ? (
                <div className='flex items-center gap-4'>
                    <AvatarSelector setuserIcon={setUserIcon} />
                    {userIcon && <img src={userIcon} alt={userIcon} className='w-12 h-12 m-2 cursor-pointer hover:scale-110 transition-transform' />}
                    <input
                        type='text'
                        placeholder='Enter your nickname'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        onClick={handleCreateRoomClick}
                        disabled={nickname.trim() === ''}
                        className={clsx('px-6 py-2 text-white bg-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400', {
                            'hover:bg-green-600': nickname.trim() !== '',
                            'opacity-50 cursor-not-allowed': nickname.trim() === '',
                        })}>
                        Create Room
                    </button>
                </div>
            ) : (
                <div className='flex items-center gap-4'>
                    <AvatarSelector setuserIcon={setUserIcon} />
                    {userIcon && <img src={userIcon} alt={userIcon} className='w-12 h-12 m-2 cursor-pointer hover:scale-110 transition-transform' />}
                    <input
                        type='text'
                        placeholder='Enter your nickname'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type='text'
                        placeholder='Enter room ID'
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        onClick={handleJoinRoomClick}
                        disabled={nickname.trim() === '' || roomId.trim() === ''}
                        className={clsx('px-6 py-2 text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400', {
                            'hover:bg-blue-600': nickname.trim() !== '' && roomId.trim() !== '',
                            'opacity-50 cursor-not-allowed': nickname.trim() === '' || roomId.trim() === '',
                        })}>
                        Join Room
                    </button>
                </div>
            )}
        </div>
    );
};
