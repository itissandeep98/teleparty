import { useState } from 'react';

// Base URL for generating avatar images using DiceBear API
const ImgBaseURL = 'https://api.dicebear.com/9.x/miniavs/svg?seed=';

// List of avatar names used to generate unique avatars
const AVATAR_LIST = [
    'Jude',
    'Robert',
    'Mackenzie',
    'Katherine',
    'Aidan',
    'Riley',
    'Kimberly',
    'Oliver',
    'Valentina',
    'Eliza',
    'Easton',
    'Emery',
    'Aiden',
    'Vivian',
    'Christian',
    'Caleb',
];

// Props interface for AvatarSelector component
interface AvatarSelectorProps {
    setuserIcon: (icon: string) => void; // Function to update the selected avatar in parent component
}

/**
 * AvatarSelector Component
 * Provides a dropdown menu with a grid of selectable avatar images
 * Uses DiceBear API to generate unique avatars based on predefined names
 */
export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ setuserIcon }) => {
    // State to control dropdown visibility
    const [open, setOpen] = useState(false);

    // Handler for avatar selection
    const handleSelect = (name: string) => {
        setuserIcon(name);
        setOpen(false);
    };

    return (
        <div className='relative'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none' onClick={() => setOpen(!open)}>
                Select Avatar
            </button>
            {open && (
                <div className='absolute mt-2 w-48 h-60 overflow-auto bg-white border border-gray-300 grid grid-cols-2 rounded shadow-lg'>
                    {AVATAR_LIST.map((name) => (
                        <img
                            key={name}
                            src={`${ImgBaseURL}${name}`}
                            alt={name}
                            className='w-12 h-12 m-2 cursor-pointer hover:scale-110 transition-transform'
                            onClick={() => handleSelect(`${ImgBaseURL}${name}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
