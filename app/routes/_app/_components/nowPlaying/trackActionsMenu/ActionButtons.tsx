import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useQueueStore } from '~/store/useQueueStore';
import { useTrackStore } from '~/store/useTrackStore';
import ShowPlaybackOptions from './ShowPlaybackOptions';
import ShowSleepModeOptions from './ShowSleepModeOptions';

const ActionButtons = () => {
    const { trackDetails } = useTrackStore();
    const [showPlaybackOptions, setShowPlaybackOptions] = useState(false);
    const [showSleepModeOptions, setShowSleepModeOptions] = useState(false);

    const { enqueueTrack, dequeueTrack, isTrackInQueue } = useQueueStore()

    const [inQueue, setInQueue] = useState(false);

    // Check if the current track is in the queue
    useEffect(() => {
        const inQueue = isTrackInQueue(trackDetails.id);
        setInQueue(inQueue);
    }, [trackDetails.id]); // Only run when trackDetails.id changes

    return (
        <div className="space-y-4">
            <button className="flex items-center w-full gap-3 p-4 rounded-lg hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                Liked
            </button>
            <button className="flex items-center w-full gap-3 p-4 rounded-lg hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                Add To Playlist
            </button>
            <button className="flex items-center w-full gap-3 p-4 rounded-lg hover:text-blue-500" onClick={() => {
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
            <button className="flex items-center w-full gap-3 p-4 rounded-lg hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-share-2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                Share
            </button>
            <button className="flex items-center w-full gap-3 p-4 rounded-lg hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-notepad-text"><path d="M8 2v4" /><path d="M12 2v4" /><path d="M16 2v4" /><rect width="16" height="18" x="4" y="4" rx="2" /><path d="M8 10h6" /><path d="M8 14h8" /><path d="M8 18h5" /></svg>
                View artist
            </button>

            <button
                className="flex items-center w-full gap-3 p-4 rounded-lg hover:text-blue-500"
                onClick={() => setShowSleepModeOptions(!showSleepModeOptions)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon-star"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" /><path d="M20 3v4" /><path d="M22 5h-4" /></svg>
                Sleep Mode
            </button>

            {showSleepModeOptions && (
                <ShowSleepModeOptions/>
            )}

            <button className="flex items-center w-full gap-3 p-4 rounded-lg hover:text-blue-500" onClick={() => setShowPlaybackOptions(!showPlaybackOptions)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10a2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                Playback
            </button>
            {showPlaybackOptions && (
                <ShowPlaybackOptions/>
            )}
        </div>
    )
}

export default ActionButtons