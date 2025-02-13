import React from 'react';
import { useTrackStore } from '~/store/useTrackStore';

const TrackMenu = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const { trackDetails } = useTrackStore();

    return (
        <div className="fixed inset-0 z-50">
            {/* Gradient Background */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/95 via-black/90 to-black" /> */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />
            {/* Content Container */}
            <div className="relative z-10 h-full text-white">
                {/* Track Info Section */}
                <div className="p-4 mt-6"> {/* Added top margin for spacing */}
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                            <img
                                src={trackDetails.coverImageUrl || ""}
                                alt="Track artwork"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-xl font-bold">{trackDetails.title}</h2>
                            <p className="text-gray-400">{trackDetails.artist}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 space-y-4">
                    <button className="flex items-center w-full p-4 rounded-lg transition-transform duration-200 hover:scale-105">
                        <svg className="w-6 h-6 text-green-500 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        Liked
                    </button>

                    <button className="flex items-center w-full p-4 rounded-lg transition-transform duration-200 hover:scale-105">
                        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 16v-2h-5V9h5V7l4 4-4 4zM2 19h14v2H2z" />
                        </svg>
                        Share
                    </button>

                    <button className="flex items-center w-full p-4 rounded-lg transition-transform duration-200 hover:scale-105">
                        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3v10.55a4 4 0 1 0 2 3.45V3h-2z" />
                        </svg>
                        View track
                    </button>

                    <button className="flex items-center w-full p-4 rounded-lg transition-transform duration-200 hover:scale-105">
                        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 14a4 4 0 1 0-4-4" />
                        </svg>
                        View artist
                    </button>

                    <button className="flex items-center w-full p-4 rounded-lg transition-transform duration-200 hover:scale-105">
                        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 3h16v18H4zM16 9H8v2h8zm0 4H8v2h8z" />
                        </svg>
                        View album
                    </button>
                </div>

                {/* Bottom Close Button */}
                <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                    <button
                        onClick={onClose}
                        className="text-white text-lg font-medium transition-transform duration-200 hover:scale-110"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackMenu;
