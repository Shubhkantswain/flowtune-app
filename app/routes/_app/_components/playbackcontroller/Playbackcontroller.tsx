import React, { useEffect, useRef, useState } from 'react'
import { useTrackStore } from '~/store/useTrackStore';
import ProgressBar from './ProgressBar';
import LeftTrackInfo from './LeftTrackInfo';
import RightControllers from './RightControllers';
import NowPlaying from '../nowPlaying/NowPlaying';
import CenterPlaybackControllers from './CenterPlaybackControllers';
import { useRepeatableTracksStore } from '~/store/useRepeatableTracksStore';

const Playbackcontroller = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const { trackDetails, setTrackDetails, togglePlay, handleVolumeChange, handlePlaybackSpeed } = useTrackStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isTrackRepeatable } = useRepeatableTracksStore()

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !trackDetails.audioFileUrl) return;

        if ((trackDetails.isPlaying && audio.paused)) {

            setTrackDetails({ audoRef: audioRef })
            audio.play();
        } else if (!trackDetails.isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [trackDetails, trackDetails.isPlaying]);


    useEffect(() => {
        if (trackDetails?.audoRef?.current) {
            const storedVolume = Number(localStorage.getItem('volume')) || 0.5;
            handleVolumeChange(storedVolume)

            const storedSpeed = Number(localStorage.getItem('speed')) || 1;
            handlePlaybackSpeed([storedSpeed])
        }
    }, [trackDetails])

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !trackDetails.audioFileUrl) return;

        // Handle browser media control events
        const handlePlay = () => {
            if (!trackDetails.isPlaying) {
                setTrackDetails({ isPlaying: true })
            }
        };

        const handlePause = () => {
            console.log("handlePause");
            
            if (trackDetails.isPlaying) {
                setTrackDetails({ isPlaying: false })
            }
        };



        const handleTimeUpdate = () => {
            setProgress((audio.currentTime / audio.duration) * 100);
            setCurrentTime(audio.currentTime);
        };

        const handleDurationChange = () => {
            setDuration(audio.duration);
        };


        const handleAudioEnd = () => {
            console.log("handleAudioEnd");
            if(isTrackRepeatable(trackDetails.id)){
                setTrackDetails({isPlaying: true})
            }
        }

        // Attach event listeners
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('ended', handleAudioEnd);

        return () => {
            // Clean up event listeners
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('durationchange', handleDurationChange);
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [trackDetails, trackDetails.isPlaying, trackDetails.audioFileUrl]);

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-lg">
                {/* Progress Bar */}
                <ProgressBar progress={progress} currentTime={currentTime} duration={duration} />

                <div className="px-4 py-3 flex items-center justify-between">
                    {/* Left: Track Info */}
                    <LeftTrackInfo setIsOpen={setIsOpen} />

                    {/* Center: Playback Controls (Hidden on Small Screens) */}
                    <CenterPlaybackControllers />

                    {/* Right: Play Button and Heart Icon for Small Screens */}
                    <RightControllers />
                </div>
                {
                    trackDetails.id && (
                        <audio ref={audioRef} src={trackDetails.audioFileUrl} />
                    )
                }
            </div>

            <NowPlaying isOpen={isOpen} onClose={() => setIsOpen(false)} progress={progress} currentTime={currentTime} duration={duration} />
        </>
    )
}

export default Playbackcontroller