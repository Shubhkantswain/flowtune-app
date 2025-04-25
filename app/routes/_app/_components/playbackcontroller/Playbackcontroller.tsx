import React, { useEffect, useRef, useState } from 'react'
import { useTrackStore } from '~/store/useTrackStore';
import ProgressBar from './ProgressBar';
import LeftTrackInfo from './LeftTrackInfo';
import RightControllers from './RightControllers';
import NowPlaying from '../nowPlaying/NowPlaying';
import CenterPlaybackControllers from './CenterPlaybackControllers';
import { useRepeatableTracksStore } from '~/store/useRepeatableTracksStore';
import { useQueueStore } from '~/store/useQueueStore';
import Swal from 'sweetalert2'
import useSleepModeStore from '~/store/useSleepModeStore';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useLikedTracksStore } from '~/store/useLikedTracksStore';

const Playbackcontroller = () => {
    const { trackDetails, setTrackDetails, handleVolumeChange, handlePlaybackSpeed } = useTrackStore();
    const { isTrackRepeatable } = useRepeatableTracksStore()
    const { dequeueFirstTrack } = useQueueStore()
    const { isSleepModeComplete, endOfTheTrackEnabled } = useSleepModeStore()
    const { hasNextTrack, playNextTrack, setCurrentlyPlayingTrack } = usePlaylistStore()

    const {isTrackLiked} = useLikedTracksStore()

    const [isOpen, setIsOpen] = useState(false)
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

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
            let storedVolume = localStorage.getItem('volume');

            if (storedVolume === null) {
                storedVolume = '0.5'; // Default volume if null
            }

            handleVolumeChange(Number(storedVolume));

            const storedSpeed = Number(localStorage.getItem('speed')) || 1;
            handlePlaybackSpeed([storedSpeed]);

            // Store last 3 track IDs in localStorage
            if (trackDetails?.id) {
                const storedTracks: (string)[] = JSON.parse(localStorage.getItem("recentTracks") || "[]");

                // Ensure it's an array and keep only last 3 unique track IDs
                const updatedTracks = [
                    trackDetails.id,
                    ...storedTracks.filter((id: string) => id !== trackDetails.id)
                ].slice(0, 3);

                localStorage.setItem("recentTracks", JSON.stringify(updatedTracks));
            }
        }
    }, [trackDetails]);

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


        const handleAudioEnd = () => {
            if (endOfTheTrackEnabled) {
                Swal.fire({
                    title: "Sleep Mode Completed",
                    text: "Your sleep timer has ended. It's time to rest and recharge. Goodnight Dear!",
                    icon: "success",
                    background: "#1f2937", // Custom dark background
                });
                return
            }

            if (isTrackRepeatable(trackDetails.id)) {
                setTrackDetails({ isPlaying: true })
                return
            }

            const track = dequeueFirstTrack()
            if (track) {
                setTrackDetails({
                    id: track.id,
                    title: track.title,
                    singer: track.singer,
                    starCast: track.starCast,
                    duration: track.duration,
                    coverImageUrl: track.coverImageUrl || "",
                    videoUrl: track.videoUrl,
                    audioFileUrl: track.audioFileUrl,
                    hasLiked: track.hasLiked,
                    authorId: track.authorId,
                    isPlaying: true,
                });
                setCurrentlyPlayingTrack(track.id)
                return
            }

            if (hasNextTrack()) {
                const nextTrack = playNextTrack()
                if (nextTrack) {
                    setTrackDetails({
                        id: nextTrack.id,
                        title: nextTrack.title,
                        singer: nextTrack.singer,
                        starCast: nextTrack.starCast,
                        duration: nextTrack.duration,
                        coverImageUrl: nextTrack.coverImageUrl || "",
                        videoUrl: nextTrack.videoUrl,
                        audioFileUrl: nextTrack.audioFileUrl,
                        hasLiked: nextTrack.hasLiked,
                        authorId: nextTrack.authorId,
                        isPlaying: true,
                    })
                }
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


    useEffect(() => {
        if (isSleepModeComplete) {
            Swal.fire({
                title: "Sleep Mode Completed",
                text: "Your sleep timer has ended. It's time to rest and recharge. Goodnight Dear!",
                icon: "success",
            });

            setTrackDetails({ isPlaying: false })
        }
    }, [isSleepModeComplete])

    // useEffect(() => {
    //     const isLiked = isTrackLiked(trackDetails.id)
    
    //     // Only update if the value actually changed
    //     if (isLiked && !trackDetails.hasLiked) {
    //         setTrackDetails({
    //             hasLiked: true
    //         });
    //     } 
    //     if(!isLiked && trackDetails.hasLiked){
    //         setTrackDetails({
    //             hasLiked: false
    //         });
    //     }
    // }, [trackDetails]);
    
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

            {isOpen && (
                <NowPlaying isOpen={isOpen} onClose={() => setIsOpen(false)} progress={progress} currentTime={currentTime} duration={duration} />
            )}
        </>
    )
}

export default Playbackcontroller