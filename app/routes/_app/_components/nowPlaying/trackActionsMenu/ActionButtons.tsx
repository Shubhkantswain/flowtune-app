import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useQueueStore } from '~/store/useQueueStore';
import { useTrackStore } from '~/store/useTrackStore';
import ShowPlaybackOptions from './ShowPlaybackOptions';
import ShowSleepModeOptions from './ShowSleepModeOptions';
import { Switch } from '~/components/ui/switch';
import { useLikeTrack } from '~/hooks/track';
import { Label } from '~/components/ui/label';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import { useAddSongToPlaylist, useGetCurrentUserPlaylists } from '~/hooks/playlist';
import AddSongToPlaylistDialog from '~/components/AddSongToPlaylistDialog';

interface ActionButtonsProps {
    videoEnabled: boolean;
    setVideoEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ videoEnabled, setVideoEnabled }) => {
    const { trackDetails, setTrackDetails } = useTrackStore();
    const [showPlaybackOptions, setShowPlaybackOptions] = useState(false);
    const [showSleepModeOptions, setShowSleepModeOptions] = useState(false);
    const [showTrackInfo, setShowTrackInfo] = useState(false);

    const { enqueueTrack, dequeueTrack, isTrackInQueue } = useQueueStore()

    const [inQueue, setInQueue] = useState(false);

    const { mutateAsync: likeTrack, isPending } = useLikeTrack()
    const { mutateAsync: addSongToPlaylist } = useAddSongToPlaylist()

    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [show, setShow] = useState(false)

    const { data: playlists } = useGetCurrentUserPlaylists()

    // Check if the current track is in the queue
    useEffect(() => {
        const inQueue = isTrackInQueue(trackDetails.id);
        setInQueue(inQueue);
    }, [trackDetails.id]); // Only run when trackDetails.id changes

    return (
        <div className="space-y-4">
            <button className="flex items-center w-full gap-3 p-4 rounded-lg text-white" onClick={async () => {
                await likeTrack(trackDetails.id)
                setTrackDetails({ hasLiked: !trackDetails.hasLiked })
            }}>
                {trackDetails.hasLiked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fa586a" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
                )}
                {
                    trackDetails.hasLiked ? "Remove From Your Favourite" : "Add To Your Favourite"
                }
            </button>
            <button className="flex items-center w-full gap-3 p-4 rounded-lg text-white" onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                Add To Playlist
            </button>

            <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                <DialogContent className="max-w-sm max-h-[75vh] overflow-y-auto bg-[#111111] border-zinc-700 text-white [&::-webkit-scrollbar]:hidden p-4 space-y-3">

                    <DialogHeader>
                        <DialogTitle className="text-white text-base">Tracks</DialogTitle>
                        <DialogDescription className="text-gray-400 text-xs">Here are all the tracks:</DialogDescription>
                    </DialogHeader>

                    {/* Search Bar */}
                    <Input
                        placeholder="Search tracks..."
                        className="bg-[#1a1a1a] text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm w-full"
                    />

                    {/* Playlist Tracks */}
                    <div className="space-y-2">
                        {/* "+ New Playlist" Button */}
                        <div
                            className="p-2 rounded-md flex items-center justify-center gap-2 bg-[#1a1a1a] cursor-pointer transition-colors hover:bg-[#1c1c1c] border border-transparent hover:border-[#fa586a] hover:shadow-md hover:shadow-[#fa586a]/30 duration-200 ease-in-out"
                            onClick={() => { setShow(true) }}
                        >
                            <Plus className="text-[#fa586a] text-sm" />
                            <span className="text-white text-sm">New Playlist</span>
                        </div>
                        {/* Other Playlists */}
                        {playlists?.map((playlist) => (
                            <div
                                key={playlist.id}
                                className="p-2 rounded-md hover:bg-[#1c1c1c] bg-[#1a1a1a] cursor-pointer transition-colors flex items-center gap-2 border border-transparent hover:border-[#fa586a] hover:shadow-md hover:shadow-[#fa586a]/30 duration-200 ease-in-out"
                                onClick={() => { addSongToPlaylist({ existingPlaylistId: playlist.id, trackIds: [trackDetails.id], isNewPlaylist: false }) }}
                            >
                                <h3 className="font-medium text-xs text-white">{playlist.name}</h3>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {
                show && <AddSongToPlaylistDialog songDialogOpen={show} setSongDialogOpen={setShow} trackId={trackDetails.id} />
            }

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
                {inQueue ? "Remove from queue" : "Add to queue"}
            </button>

            <button
                className="flex items-center w-full gap-3 p-4 rounded-lg text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-aperture"><circle cx="12" cy="12" r="10" /><path d="m14.31 8 5.74 9.94" /><path d="M9.69 8h11.48" /><path d="m7.38 12 5.74-9.94" /><path d="M9.69 16 3.95 6.06" /><path d="M14.31 16H2.83" /><path d="m16.62 12-5.74 9.94" /></svg>
                Background Video Enabled
                <Switch
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
                    className="data-[state=checked]:bg-[#fa586a]"
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