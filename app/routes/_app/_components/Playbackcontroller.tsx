import React, { useEffect, useRef, useState } from 'react'
import { useTrackStore } from '~/store/useTrackStore';
import ProgressBar from './ProgressBar';
import LeftTrackInfo from './LeftTrackInfo';
import RightControllers from './RightControllers';
import NowPlaying from './NowPlaying';
import CenterPlaybackControllers from './CenterPlaybackControllers';

const Playbackcontroller = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
    const { trackDetails, setTrackDetails, togglePlay, handleVolumeChange } = useTrackStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    //     const audio = audioRef.current;
    //     if (!audio) return;

    //     const progressBar = event.currentTarget;
    //     const rect = progressBar.getBoundingClientRect();
    //     const clickPosition = event.clientX - rect.left;
    //     const newProgress = (clickPosition / rect.width) * 100;

    //     // Ensure progress stays within bounds
    //     const boundedProgress = Math.max(0, Math.min(100, newProgress));

    //     // Set the new current time
    //     const newTime = (boundedProgress / 100) * audio.duration;
    //     audio.currentTime = newTime;

    //     // Update progress state
    //     setProgress(boundedProgress);
    // };

    const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
		}
	};

    // Handle 10 second skip forward/backward
    const handleSkip = (direction: 'forward' | 'backward') => {
        const audio = audioRef.current;
        if (!audio) return;

        const skipForward = 30; // seconds for forward skip
        const skipBackward = 15; // seconds for backward skip
        const currentTime = audio.currentTime;

        const newTime = direction === 'forward'
            ? Math.min(currentTime + skipForward, audio.duration)
            : Math.max(currentTime - skipBackward, 0);

        // Update audio time
        audio.currentTime = newTime;
    };

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
        if(trackDetails?.audoRef?.current){
            const storedVolume = Number(localStorage.getItem('volume')) || 0.5;
            handleVolumeChange(storedVolume)
        }
    }, [trackDetails?.audoRef?.current])

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


        // Attach event listeners
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);

        return () => {
            // Clean up event listeners
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('durationchange', handleDurationChange);
        };
    }, [trackDetails, trackDetails.isPlaying, trackDetails.audioFileUrl]);

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-lg">
                {/* Progress Bar */}
                <ProgressBar progress={progress} handleSeek={handleSeek} currentTime={currentTime} duration={duration} />

                <div className="px-4 py-3 flex items-center justify-between">
                    {/* Left: Track Info */}
                    <LeftTrackInfo setIsOpen={setIsOpen} />

                    {/* Center: Playback Controls (Hidden on Small Screens) */}
                    <CenterPlaybackControllers handleSkip={handleSkip} />

                    {/* Right: Play Button and Heart Icon for Small Screens */}
                    <RightControllers />
                </div>
                {
                    trackDetails.id && (
                        <audio ref={audioRef} src={trackDetails.audioFileUrl} />
                    )
                }
            </div>

            <NowPlaying isOpen={isOpen} setIsOpen={setIsOpen} progress={progress} currentTime={currentTime} duration={duration} handleSeek={handleSeek} handleSkip={handleSkip} />
        </>
    )
}

export default Playbackcontroller