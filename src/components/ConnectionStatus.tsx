/**
 * A component that displays the current connection status and provides a reload button when disconnected.
 */

import clsx from 'clsx';

/**
 * Props interface for the ConnectionStatus component
 * @property {boolean} connected - Indicates whether the connection is active
 */
interface ConnectionStatusProps {
    connected: boolean;
}

/**
 * ConnectionStatus component displays a status indicator and conditional reload button
 * When connected, shows 'Live' in green
 * When disconnected, shows 'Reconnecting...' in red with a reload button
 */
const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ connected }) => {
    return (
        <div className='flex items-center justify-between p-4 mb-4 bg-white shadow-md rounded-lg'>
            <p>
                Connection Status:
                <span className={clsx(' mx-4 font-semibold', { 'text-green-500': connected, 'text-red-500': !connected })}>
                    {connected ? 'Live' : 'Reconnecting ...'}
                </span>
            </p>
            {!connected && (
                <button
                    onClick={() => window.location.reload()}
                    className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                    Reload
                </button>
            )}
        </div>
    );
};

export default ConnectionStatus;
