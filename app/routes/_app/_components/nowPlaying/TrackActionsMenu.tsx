import { Track } from 'gql/graphql';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { Switch } from '~/components/ui/switch';
import { useQueueStore } from '~/store/useQueueStore';
import { useRepeatableTracksStore } from '~/store/useRepeatableTracksStore';
import { useTrackStore } from '~/store/useTrackStore';
import ShowQueueTracks from './ShowQueueTracks';
import useSleepModeStore from '~/store/useSleepModeStore';

interface TrackActionsMenuProps {
    isVisible: boolean;
    onDismiss: () => void;
    inQueue: boolean;
    setInQueue: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrackActionsMenu = ({ isVisible, onDismiss, inQueue, setInQueue }: TrackActionsMenuProps) => {
    if (!isVisible) return null;
    const { trackDetails, handlePlaybackSpeed } = useTrackStore();
    const [playbackSpeed, setPlaybackSpeed] = useState([1]);
    const { markTrackAsRepeatable, unmarkTrackAsRepeatable, isTrackRepeatable } = useRepeatableTracksStore()
    const [isRepeatable, setIsRepeatable] = useState(isTrackRepeatable(trackDetails.id));
    const [showPlaybackOptions, setShowPlaybackOptions] = useState(false);
    const [showSleepModeOptions, setShowSleepModeOptions] = useState(false);

    const { enqueueTrack, dequeueTrack } = useQueueStore()
    const { startSleepMode, setSleepTimeLeft, sleepTimeLeft, setEndOfTheTrackEnabled } = useSleepModeStore()

    const handleStartSleepMode = (minutes: number) => {
        setSleepTimeLeft(minutes);
        startSleepMode();
    };

    const handlEndOfTheTrack = (enabled: boolean) => {
        setEndOfTheTrackEnabled(enabled)
    }

    useEffect(() => {
        const storedSpeed = Number(localStorage.getItem('speed')) || 1;
        setPlaybackSpeed([storedSpeed]);
    }, []);

    return (
        <>
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
                            <button className="flex items-center w-full gap-3 p-4 rounded-lg transition-transform duration-200 hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                Liked
                            </button>
                            <button className="flex items-center w-full gap-3 p-4 rounded-lg transition-transform duration-200 hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                Add To Playlist
                            </button>
                            <button className="flex items-center w-full gap-3 p-4 rounded-lg transition-transform duration-200 hover:scale-105" onClick={() => {
                                if (inQueue) {
                                    dequeueTrack(trackDetails.id);
                                    toast.success(`"${trackDetails.title}" removed from queue`);
                                } else {
                                    enqueueTrack(trackDetails);
                                    toast.success(`"${trackDetails.title}" added to queue`);
                                }
                                setInQueue(!inQueue)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list-music"><path d="M21 15V6" /><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><path d="M12 12H3" /><path d="M16 6H3" /><path d="M12 18H3" /></svg>
                                {inQueue ? "Remove from queue" : "Add to queue"}
                            </button>
                            <button className="flex items-center w-full gap-3 p-4 rounded-lg transition-transform duration-200 hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-share-2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                                Share
                            </button>
                            <button className="flex items-center w-full gap-3 p-4 rounded-lg transition-transform duration-200 hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-notepad-text"><path d="M8 2v4" /><path d="M12 2v4" /><path d="M16 2v4" /><rect width="16" height="18" x="4" y="4" rx="2" /><path d="M8 10h6" /><path d="M8 14h8" /><path d="M8 18h5" /></svg>
                                View artist
                            </button>


                            <button
                                className="flex items-center w-full gap-3 p-4 rounded-lg transition-transform duration-200 hover:scale-105"
                                onClick={() => setShowSleepModeOptions(!showSleepModeOptions)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon-star"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" /><path d="M20 3v4" /><path d="M22 5h-4" /></svg>
                                Sleep Mode
                            </button>

                            {showSleepModeOptions && (
                                <div className="p-4 bg-zinc-900/90 rounded-xl space-y-4 transition-all duration-300 ease-in-out border border-white/10">

                                    {/* Sleep Mode Title */}
                                    <h3 className="text-lg font-semibold text-white text-center mb-2">Sleep Mode - {sleepTimeLeft} Min Left</h3>

                                    {/* Sleep Mode Options (One per Row) */}
                                    {[5, 10, 15, 30, 45, 60].map((minutes) => (
                                        <button
                                            key={minutes}
                                            className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg text-sm font-medium transition-transform duration-200 hover:scale-105"
                                            onClick={() => handleStartSleepMode(minutes)}
                                        >
                                            {minutes} min
                                        </button>
                                    ))}

                                    <button
                                        className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg text-sm font-medium transition-transform duration-200 hover:scale-105"
                                        onClick={() => handlEndOfTheTrack(true)}
                                    >
                                        End of the Track
                                    </button>
                                </div>
                            )}


                            <button className="flex items-center w-full gap-3 p-4 rounded-lg transition-transform duration-200 hover:scale-105" onClick={() => setShowPlaybackOptions(!showPlaybackOptions)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                                Playback
                            </button>
                            {showPlaybackOptions && (
                                <div className="p-4 bg-zinc-900/90 rounded-xl space-y-6 transition-all duration-300 ease-in-out border border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <Label className="text-sm font-medium leading-none text-white">Repeatable Track</Label>
                                            <p className="text-xs text-gray-400">Repeat this track automatically</p>
                                        </div>
                                        <Switch
                                            checked={isRepeatable}
                                            onCheckedChange={(checked: boolean) => {
                                                if (checked) {
                                                    markTrackAsRepeatable(trackDetails.id)
                                                    toast.success("Track is now set to repeat");
                                                } else {
                                                    unmarkTrackAsRepeatable(trackDetails.id)
                                                    toast.success("Track will no longer repeat");
                                                }

                                                setIsRepeatable(!isRepeatable)
                                            }}
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
                                            onValueChange={(value: number[]) => {
                                                const newValue = handlePlaybackSpeed(value)
                                                setPlaybackSpeed(newValue)
                                            }}
                                            max={2}
                                            min={0.5}
                                            step={0.25}
                                            className="w-full hover:cursor-grab active:cursor-grabbing"
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
            </div >
        </>
    );
};

export default TrackActionsMenu;