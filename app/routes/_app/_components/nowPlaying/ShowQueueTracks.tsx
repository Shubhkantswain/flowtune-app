import React, { useState, useEffect } from 'react';
// import { X, Play } from 'lucide-react';
import { Button } from '~/components/ui/button';

interface ShowQueueTracksProps {
    isQueueTrackVisible?: boolean;
    onHideQueueTrack?: () => void;
}

interface Track {
    id: string;
    title: string;
    artist: string;
    duration: string;
    imageUrl?: string;
}

const sampleQueueTracks: Track[] = [
    {
        id: '1',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        duration: '5:55',
        imageUrl: '/api/placeholder/80/80'
    },
    {
        id: '2',
        title: 'Hotel California',
        artist: 'Eagles',
        duration: '6:30',
        imageUrl: '/api/placeholder/80/80'
    },
    {
        id: '3',
        title: 'Sweet Child O\' Mine',
        artist: 'Guns N\' Roses',
        duration: '5:56',
        imageUrl: '/api/placeholder/80/80'
    },
    {
        id: '4',
        title: 'Billie Jean',
        artist: 'Michael Jackson',
        duration: '4:54',
        imageUrl: '/api/placeholder/80/80'
    }
];

const ShowQueueTracks: React.FC<ShowQueueTracksProps> = ({
    isQueueTrackVisible = false,
    onHideQueueTrack,
}) => {
    return (
        <div
            className={`fixed inset-0 bg-black z-50 flex flex-col transition-transform duration-300 ease-in-out
        ${isQueueTrackVisible ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-white">Queue</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onHideQueueTrack}
                    className="rounded-full text-white hover:bg-gray-800"
                >
                    {/* <X className="h-6 w-6" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </Button>
            </div>

            <div className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                    {sampleQueueTracks.map((track, index) => (
                        <div 
                            key={track.id}
                            className="flex items-center gap-4 p-4 border border-gray-800 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex-shrink-0"
                            >
                                {/* <Play className="h-5 w-5" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                            </Button>
                            
                            <div className="h-20 w-20 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                    src={track.imageUrl} 
                                    alt={track.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="flex flex-col min-w-0">
                                <span className="text-lg font-semibold text-white truncate">
                                    {track.title}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {track.artist}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowQueueTracks;