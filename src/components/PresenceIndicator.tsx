import React from 'react';

interface PresenceIndicatorProps {
    anyoneTyping: boolean;
}

const PresenceIndicator: React.FC<PresenceIndicatorProps> = ({ anyoneTyping }) => {
    return (
        <div className='flex items-center justify-center p-4'>
            {anyoneTyping ? (
                <p className='text-sm text-blue-500 font-medium'>Someone is typing...</p>
            ) : (
                <p className='text-sm text-gray-500'>No one is typing</p>
            )}
        </div>
    );
};

export default PresenceIndicator;
