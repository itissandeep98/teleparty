import clsx from 'clsx';
import { useState } from 'react';
import { AvatarSelector } from './AvatarSelector';

interface TabManagerProps {
    isJoined: boolean;
    handleCreateRoom: (nickname: string, userIcon?: string) => void;
    handleJoinRoom: (roomId: string, nickname: string, userIcon?: string) => void;
}

export const TabManager: React.FC<TabManagerProps> = ({ isJoined, handleCreateRoom, handleJoinRoom }) => {
    const [formData, setFormData] = useState({
        nickname: '',
        roomId: '',
        userIcon: undefined as string | undefined,
    });
    const [tabState, setTabState] = useState<number>(0);

    const handleCreateRoomClick = () => {
        handleCreateRoom(formData.nickname, formData.userIcon);
        setFormData({ nickname: '', roomId: '', userIcon: undefined });
    };

    const handleJoinRoomClick = () => {
        handleJoinRoom(formData.roomId, formData.nickname, formData.userIcon);
        setFormData({ nickname: '', roomId: '', userIcon: undefined });
    };

    if (isJoined) {
        return null;
    }

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
                    <AvatarSelector setuserIcon={(icon) => setFormData((prev) => ({ ...prev, userIcon: icon }))} />
                    {formData.userIcon && (
                        <img
                            src={formData.userIcon}
                            alt={formData.userIcon}
                            className='w-12 h-12 m-2 cursor-pointer hover:scale-110 transition-transform'
                        />
                    )}
                    <input
                        type='text'
                        placeholder='Enter your nickname'
                        value={formData.nickname}
                        onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
                        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        onClick={handleCreateRoomClick}
                        disabled={formData.nickname.trim() === ''}
                        className={clsx('px-6 py-2 text-white bg-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400', {
                            'hover:bg-green-600': formData.nickname.trim() !== '',
                            'opacity-50 cursor-not-allowed': formData.nickname.trim() === '',
                        })}>
                        Create Room
                    </button>
                </div>
            ) : (
                <div className='flex items-center gap-4'>
                    <AvatarSelector setuserIcon={(icon) => setFormData((prev) => ({ ...prev, userIcon: icon }))} />
                    {formData.userIcon && (
                        <img
                            src={formData.userIcon}
                            alt={formData.userIcon}
                            className='w-12 h-12 m-2 cursor-pointer hover:scale-110 transition-transform'
                        />
                    )}
                    <input
                        type='text'
                        placeholder='Enter your nickname'
                        value={formData.nickname}
                        onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
                        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type='text'
                        placeholder='Enter room ID'
                        value={formData.roomId}
                        onChange={(e) => setFormData((prev) => ({ ...prev, roomId: e.target.value }))}
                        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        onClick={handleJoinRoomClick}
                        disabled={formData.nickname.trim() === '' || formData.roomId.trim() === ''}
                        className={clsx('px-6 py-2 text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400', {
                            'hover:bg-blue-600': formData.nickname.trim() !== '' && formData.roomId.trim() !== '',
                            'opacity-50 cursor-not-allowed': formData.nickname.trim() === '' || formData.roomId.trim() === '',
                        })}>
                        Join Room
                    </button>
                </div>
            )}
        </div>
    );
};
