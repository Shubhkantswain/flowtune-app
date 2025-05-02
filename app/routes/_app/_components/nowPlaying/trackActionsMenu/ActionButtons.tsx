import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useQueueStore } from '~/store/useQueueStore';
import { useTrackStore } from '~/store/useTrackStore';
import ShowPlaybackOptions from './ShowPlaybackOptions';
import ShowSleepModeOptions from './ShowSleepModeOptions';
import { Switch } from '~/components/ui/switch';
import { useLikeTrack } from '~/hooks/track';
import { useAddSongToPlaylist, useGetCurrentUserPlaylists } from '~/hooks/playlist';
import AddToPlaylistDialog from '~/components/AddToPlaylistDialog';
import AddToNewPlaylistDialog from '~/components/AddToNewPlaylistDialog';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useLikedTracksStore } from '~/store/useLikedTracksStore';

interface ActionButtonsProps {
    videoEnabled: boolean;
    setVideoEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}
const ActionButtons: React.FC<ActionButtonsProps> = ({ videoEnabled, setVideoEnabled }) => {
    const { mutateAsync: likeTrackMutation, isPending } = useLikeTrack()

    const { trackDetails, setTrackDetails } = useTrackStore();
    const { enqueueTrack, dequeueTrack, isTrackInQueue } = useQueueStore()

    const [showPlaybackOptions, setShowPlaybackOptions] = useState(false);
    const [showSleepModeOptions, setShowSleepModeOptions] = useState(false);
    const [showTrackInfo, setShowTrackInfo] = useState(false);
    const [inQueue, setInQueue] = useState(false);

    const [isAddToPlaylistOpen, setAddToPlaylistOpen] = useState(false);
    const [isNewPlaylistDialogOpen, setNewPlaylistDialogOpen] = useState(false);

    const { initializePlaylist, setCurrentlyPlayingTrack } = usePlaylistStore()
    const { likeTrack, unlikeTrack, likedTracks } = useLikedTracksStore()


    const handleLike = async () => {
        const like = await likeTrackMutation(trackDetails.id)
        if (like) {
            likeTrack(
                {
                    id: trackDetails.id,
                    title: trackDetails.title,
                    singer: trackDetails.singer,
                    starCast: trackDetails.starCast,
                    duration: trackDetails.duration,
                    coverImageUrl: trackDetails.coverImageUrl,
                    videoUrl: trackDetails.videoUrl,
                    audioFileUrl: trackDetails.audioFileUrl,
                    hasLiked: true,
                    authorId: trackDetails.authorId,
                }
            )
        } else {
            unlikeTrack(trackDetails.id)
        }

    }

    // Check if the current track is in the queue
    useEffect(() => {
        const inQueue = isTrackInQueue(trackDetails.id);
        setInQueue(inQueue);
    }, [trackDetails.id]); // Only run when trackDetails.id changes

    return (
        <div className="space-y-4">
            <button className="flex items-center w-full gap-3 p-4 rounded-lg text-white"
                onClick={handleLike}>
                {trackDetails.hasLiked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_action_favoriteon-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_favoriteon-a" fill="#25d1da"></use></g></svg>
                ) : (

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_action_favorite-a" d="M16,3 C14.499,3 13.092,3.552 12,4.544 C10.908,3.552 9.501,3 8,3 C4.691,3 2,5.691 2,9 C2,14.535 8.379,18.788 11.445,20.832 C11.613,20.944 11.807,21 12,21 C12.193,21 12.387,20.944 12.555,20.832 C15.62,18.788 22,14.535 22,9 C22,5.691 19.309,3 16,3 Z M12,18.797 C9.077,16.832 4,13.186 4,9 C4,6.794 5.794,5 8,5 C9.263,5 10.429,5.592 11.198,6.625 C11.575,7.131 12.425,7.131 12.802,6.625 C13.571,5.592 14.737,5 16,5 C18.206,5 20,6.794 20,9 C20,13.186 14.923,16.832 12,18.797 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_action_favorite-a" fill="currentColor"></use></g></svg>
                )}
                {
                    trackDetails.hasLiked ? "Remove From Your Collection" : "Add To Your Collection"
                }
            </button>

            <button className="flex items-center w-full gap-3 p-4 rounded-lg text-white" onClick={() => setAddToPlaylistOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_action_add-a" d="M21,11 L13,11 L13,3 C13,2.448 12.552,2 12,2 C11.448,2 11,2.448 11,3 L11,11 L3,11 C2.448,11 2,11.448 2,12 C2,12.552 2.448,13 3,13 L11,13 L11,21 C11,21.553 11.448,22 12,22 C12.552,22 13,21.553 13,21 L13,13 L21,13 C21.552,13 22,12.552 22,12 C22,11.448 21.552,11 21,11 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_add-a" fill="currentColor"></use></g></svg>
                Add To Playlist
            </button>

            {
                isAddToPlaylistOpen && (
                    <AddToPlaylistDialog isOpen={isAddToPlaylistOpen} setIsOpen={setAddToPlaylistOpen} setNewPlaylistDialogOpen={setNewPlaylistDialogOpen} trackId={trackDetails.id} />
                )
            }

            <AddToNewPlaylistDialog isOpen={isNewPlaylistDialogOpen} setIsOpen={setNewPlaylistDialogOpen} trackId={trackDetails.id} />

            <button className="flex items-center w-full gap-3 p-4 rounded-lg text-white" onClick={() => {
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
                {inQueue ? "Remove From Queue" : "Add To Queue"}
            </button>

            <button 
                className="flex items-center w-full gap-3 p-4 rounded-lg text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-aperture"><circle cx="12" cy="12" r="10" /><path d="m14.31 8 5.74 9.94" /><path d="M9.69 8h11.48" /><path d="m7.38 12 5.74-9.94" /><path d="M9.69 16 3.95 6.06" /><path d="M14.31 16H2.83" /><path d="m16.62 12-5.74 9.94" /></svg>
                Background Video Enabled
                <Switch
                    disabled={!trackDetails.videoUrl}
                    checked={videoEnabled}
                    onCheckedChange={(checked: boolean) => {
                        if (checked) {
                            if (typeof window !== "undefined") {
                                localStorage.setItem("videoEnabled", "true");
                            }
                            toast.success("Background video is enabled, Enjoy");
                        } else {
                            if (typeof window !== "undefined") {
                                localStorage.setItem("videoEnabled", "false");
                            }
                            toast.success("Background video is disabled");
                        }

                        setVideoEnabled(!videoEnabled);
                    }}
                    className="data-[state=checked]:bg-[#25d1da]"
                />
            </button>

            <button
                className="flex items-center w-full gap-3 p-4 rounded-lg text-white"
                onClick={() => setShowSleepModeOptions(!showSleepModeOptions)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon-star"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" /><path d="M20 3v4" /><path d="M22 5h-4" /></svg>
                Sleep Mode
            </button>

            {showSleepModeOptions && (
                <ShowSleepModeOptions />
            )}

            <button className="flex items-center w-full gap-3 p-4 rounded-lg text-white" onClick={() => setShowPlaybackOptions(!showPlaybackOptions)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10a2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                Playback
            </button>
            {showPlaybackOptions && (
                <ShowPlaybackOptions />
            )}


            <button className="flex items-center w-full gap-3 p-4 rounded-lg text-white" onClick={() => setShowTrackInfo(!showTrackInfo)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-notepad-text"><path d="M8 2v4" /><path d="M12 2v4" /><path d="M16 2v4" /><rect width="16" height="18" x="4" y="4" rx="2" /><path d="M8 10h6" /><path d="M8 14h8" /><path d="M8 18h5" /></svg>
                Track Info
            </button>

            {
                showTrackInfo && (
                    <div className="p-5 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl space-y-4 transition-all duration-300 ease-in-out border border-white/10 max-w-xs mx-auto sm:mx-0 shadow-xl shadow-black/30">
                        {/* Track Info */}
                        <div className="space-y-3 text-white">
                            <p className="text-sm text-gray-300">
                                <strong className="text-white">Album:</strong> {trackDetails.title}
                            </p>
                            <p className="text-sm text-gray-300">
                                <strong className="text-white">Singer:</strong> {trackDetails.singer}
                            </p>
                            <p className="text-sm text-gray-300">
                                <strong className="text-white">Star Cast:</strong> {trackDetails.starCast}
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ActionButtons