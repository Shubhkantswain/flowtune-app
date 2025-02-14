import React, { useState } from 'react';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { Switch } from '~/components/ui/switch';
import { useTrackStore } from '~/store/useTrackStore';

interface TrackActionsMenuProps {
    isVisible: boolean;
    onDismiss: () => void;
}

const TrackActionsMenu = ({ isVisible, onDismiss }: TrackActionsMenuProps) => {
    if (!isVisible) return null;
    const { trackDetails } = useTrackStore();
    const [showPlaybackOptions, setShowPlaybackOptions] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState([1]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col h-full text-white">
                {/* Scrollable Section */}
                <div className="flex-1 overflow-y-scroll p-4 mt-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {/* Track Info Section - Now with p-4 to match other items */}
                    <div className="flex items-center space-x-4 p-4">
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

                    {/* Action Buttons */}
                    <div className="space-y-4">
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
                        
                        <button className="flex items-center w-full p-4 rounded-lg transition-transform duration-200 hover:scale-105" onClick={() => setShowPlaybackOptions(!showPlaybackOptions)}>
                            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 3h16v18H4zM16 9H8v2h8zm0 4H8v2h8z" />
                            </svg>
                            Playback
                        </button>
                        {showPlaybackOptions && (
                            <div className="p-4 bg-zinc-900/90 rounded-xl space-y-6 transition-all duration-300 ease-in-out border border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-sm font-medium leading-none text-white">Loop Track</Label>
                                        <p className="text-xs text-gray-400">Repeat this track automatically</p>
                                    </div>
                                    <Switch
                                        checked={isLooping}
                                        onCheckedChange={setIsLooping}
                                        className="data-[state=checked]:bg-green-500"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <Label className="text-sm font-medium leading-none text-white">
                                            Playback Speed: {playbackSpeed[0]}x
                                        </Label>
                                        <p className="text-xs text-gray-400">Adjust the playing speed of the track</p>
                                    </div>
                                    <Slider
                                        value={playbackSpeed}
                                        onValueChange={setPlaybackSpeed}
                                        max={2}
                                        min={0.5}
                                        step={0.25}
                                        className="w-full cursor-grab"
                                        nowPlaying={true}
                                    />
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>0.5x</span>
                                        <span>1x</span>
                                        <span>1.5x</span>
                                        <span>2x</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed Close Button */}
                <div className="p-4 bg-black/5 backdrop-blur-sm text-center">
                    <button
                        onClick={onDismiss}
                        className="text-white text-lg font-medium transition-transform duration-200 hover:scale-110"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackActionsMenu;