import React from 'react';

/**
 * Props interface for the PresenceIndicator component
 * @interface PresenceIndicatorProps
 * @property {boolean} anyoneTyping - Flag indicating if any user is currently typing
 */
interface PresenceIndicatorProps {
    anyoneTyping: boolean;
}

/**
 * Component that displays a message indicating whether someone is typing
 * @param {PresenceIndicatorProps} props - Component props
 * @returns {JSX.Element} Rendered presence indicator
 */
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
