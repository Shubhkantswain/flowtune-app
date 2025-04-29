import React from 'react';
import { useTrackStore } from '~/store/useTrackStore';
import PlaceholderTrack from '../PlaceholderTrack';
import { ExpandIcon } from '~/Svgs';

interface LeftTrackInfoProps {
    setIsOpen: (isOpen: boolean) => void;
};

const LeftTrackInfo: React.FC<LeftTrackInfoProps> = ({ setIsOpen }) => {
    const { trackDetails } = useTrackStore();

    const isTrackSelected = Boolean(trackDetails.id);

    const handleExpandClick = () => {
        if (trackDetails.id) {
            setIsOpen(true);
        }
    };

    return (
        <article className="flex items-center flex-1 min-w-0 md:w-1/3">
            <button
                className={`
                    w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm overflow-hidden mr-3 
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
                    <PlaceholderTrack width='35' height='35' />
                )}

                {isTrackSelected && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity bg-black/40 group-hover:opacity-100">
                        <ExpandIcon width="24" height="24"/>
                    </div>
                )}
            </button>

            <div className="min-w-0">
                <div className="relative group">
                    {trackDetails.id && (
                        <div className="absolute -top-10 left-0 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            {trackDetails.title}
                        </div>
                    )}

                    <div className="font-medium text-white truncate">
                        {trackDetails.title || "No Track Selected"}
                    </div>
                </div>

                <div className="relative group">
                    {trackDetails.id && (
                        <div className="absolute -top-10 left-0 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
                            {trackDetails.singer}
                        </div>
                    )}

                    <div className="text-sm text-gray-400 truncate">
                        {trackDetails.singer || "Artist Name"}
                    </div>
                </div>
            </div>


        </article>
    );
};

export default LeftTrackInfo;

