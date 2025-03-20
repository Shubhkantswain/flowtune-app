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
import MusicPreferencesModal from '../header/MusicPreference';
import useMusicPreferenceStore from '~/store/useMusicPreferenceStore';

const Playbackcontroller = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const { trackDetails, setTrackDetails, togglePlay, handleVolumeChange, handlePlaybackSpeed } = useTrackStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isTrackRepeatable } = useRepeatableTracksStore()
    const { dequeueFirstTrack } = useQueueStore()
    const { isSleepModeComplete, endOfTheTrackEnabled } = useSleepModeStore()

    const { hasNext, hasPrev, next, setCurrentTrack } = usePlaylistStore()


    const { musicPreferencesOpen, setMusicPreferencesOpen } = useMusicPreferenceStore()

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

            console.log("store volume", storedVolume);

            const storedSpeed = Number(localStorage.getItem('speed')) || 1;
            handlePlaybackSpeed([storedSpeed]);
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
                    artist: track.artist,
                    duration: track.duration,
                    coverImageUrl: track.coverImageUrl || "",
                    audioFileUrl: track.audioFileUrl,
                    videoUrl: track.videoUrl,
                    hasLiked: track.hasLiked,
                    authorName: track.authorName,
                    isPlaying: true,
                    fromClick: false
                });
                setCurrentTrack(track.id)
                return
            }

            if (hasNext()) {
                const nextTrack = next()
                if (nextTrack) {
                    setTrackDetails({
                        id: nextTrack.id,
                        title: nextTrack.title,
                        artist: nextTrack.artist,
                        duration: nextTrack.duration,
                        coverImageUrl: nextTrack.coverImageUrl || "",
                        audioFileUrl: nextTrack.audioFileUrl,
                        videoUrl: nextTrack.videoUrl,
                        hasLiked: nextTrack.hasLiked,
                        authorName: nextTrack.authorName,
                        isPlaying: true,
                        fromClick: true
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

            <MusicPreferencesModal isOpen={musicPreferencesOpen} onClose={() => { setMusicPreferencesOpen(false) }} />

        </>
    )
}

export default Playbackcontroller