import React, { useEffect } from 'react';
import { useTrackStore } from '~/store/useTrackStore';

interface TrackMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const TrackMenu = ({ isOpen, onClose }: TrackMenuProps) => {
    const { trackDetails } = useTrackStore()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="min-h-screen pb-20 relative mt-8"  // Added mt-8 here
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 text-white">
                    {/* Track header section */}
                    <div className="flex items-center gap-4 mb-8 mt-4">
                        <img
                            src={trackDetails.coverImageUrl || ""}
                            alt="Track artwork"
                            className="w-16 h-16 rounded-lg shadow-lg"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{trackDetails.title}</h2>
                            <p className="text-gray-300">{trackDetails.artist}</p>
                        </div>
                    </div>

                    {/* Track options */}
                    <div className="space-y-2">
                        <div className="p-3 cursor-pointer rounded-lg flex items-center gap-3 group">
                            <svg className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            <span className="group-hover:scale-105 transition-transform">Play Now</span>
                        </div>
                        <div className="p-3 cursor-pointer rounded-lg flex items-center gap-3 group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            <span className="group-hover:scale-105 transition-transform">Add to Queue</span>
                        </div>
                        <div className="p-3 cursor-pointer rounded-lg flex items-center gap-3 group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span className="group-hover:scale-105 transition-transform">Like</span>
                        </div>
                        <div className="p-3 cursor-pointer rounded-lg flex items-center gap-3 group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                            <span className="group-hover:scale-105 transition-transform">Share</span>
                        </div>
                        <div className="p-3 cursor-pointer rounded-lg flex items-center gap-3 group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15V6" />
                                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                <path d="M12 12H3" />
                                <path d="M16 6H3" />
                                <path d="M12 18H3" />
                            </svg>
                            <span className="group-hover:scale-105 transition-transform">Add to Playlist</span>
                        </div>
                        <div className="p-3 cursor-pointer rounded-lg flex items-center gap-3 group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span className="group-hover:scale-105 transition-transform">View Album</span>
                        </div>
                        <div className="p-3 cursor-pointer rounded-lg flex items-center gap-3 group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span className="group-hover:scale-105 transition-transform">View Artist</span>
                        </div>
                    </div>
                </div>

                {/* Close button fixed at bottom */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white">
                    <button
                        onClick={onClose}
                        className="text-center group flex flex-col items-center gap-2"
                    >
                        <span className="group-hover:scale-110 transition-transform">Close</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackMenu;