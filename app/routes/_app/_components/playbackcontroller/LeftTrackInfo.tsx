import React from 'react';
import { useTrackStore } from '~/store/useTrackStore';
import PlaceholderTrack from '../PlaceholderTrack';

type LeftTrackInfoProps = {
    setIsOpen: (isOpen: boolean) => void;
};

const LeftTrackInfo: React.FC<LeftTrackInfoProps> = ({ setIsOpen }) => {
    const { trackDetails } = useTrackStore();

    const handleExpandClick = () => {
        if (trackDetails.id) {
            setIsOpen(true);
        }
    };

    const isTrackSelected = Boolean(trackDetails.id);
    
    return (
        <article className="flex items-center flex-1 min-w-0 md:w-1/3">
            <button 
                className={`
                    w-12 h-12 bg-gray-800 rounded-md overflow-hidden mr-3 
                    flex-shrink-0 relative group 
                    ${isTrackSelected ? "cursor-pointer" : "cursor-default"}
                `}
                onClick={handleExpandClick}
                disabled={!isTrackSelected}
            >
                {trackDetails.coverImageUrl ? (
                    <img
                        src={trackDetails.coverImageUrl}
                        alt={`${trackDetails.title} album cover`}
                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                    />
                ) : (
                    <PlaceholderTrack index={1} />
                )}
                
                {isTrackSelected && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity bg-black/40 group-hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
                    </div>
                )}
            </button>

            <div className="min-w-0">
                <h2 className="font-medium text-white truncate">
                    {trackDetails.title || "No Track Selected"}
                </h2>
                <p className="text-sm text-gray-400 truncate">
                    {trackDetails.artist || "Artist Name"}
                </p>
            </div>
        </article>
    );
};

export default LeftTrackInfo;

