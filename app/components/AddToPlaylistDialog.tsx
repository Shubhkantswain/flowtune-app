import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { useAddSongToPlaylist, useGetCurrentUserPlaylists } from '~/hooks/playlist'
import { useTrackStore } from '~/store/useTrackStore';

// Define the props
interface AddToPlaylistDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNewPlaylistDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddToPlaylistDialog: React.FC<AddToPlaylistDialogProps> = ({
    isOpen,
    setIsOpen,
    setNewPlaylistDialogOpen
}) => {
    const { data: playlists } = useGetCurrentUserPlaylists()
    const { mutateAsync: addSongToPlaylist } = useAddSongToPlaylist()
    const { trackDetails } = useTrackStore()

    return (
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
                        className="p-2 rounded-md flex items-center justify-center gap-2 bg-[#1a1a1a] cursor-pointer transition-colors hover:bg-[#1c1c1c] border border-transparent hover:border-[#25d1da] hover:shadow-md hover:shadow-[#25d1da]/30 duration-200 ease-in-out"
                    onClick={() => setNewPlaylistDialogOpen(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><path id="ic_action_add-a" d="M21,11 L13,11 L13,3 C13,2.448 12.552,2 12,2 C11.448,2 11,2.448 11,3 L11,11 L3,11 C2.448,11 2,11.448 2,12 C2,12.552 2.448,13 3,13 L11,13 L11,21 C11,21.553 11.448,22 12,22 C12.552,22 13,21.553 13,21 L13,13 L21,13 C21.552,13 22,12.552 22,12 C22,11.448 21.552,11 21,11 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_action_add-a" fill="currentColor"></use></g></svg>

                        <span className="text-white text-sm">New Playlist</span>
                    </div>
                    {/* Other Playlists */}
                    {playlists?.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="p-2 rounded-md hover:bg-[#1c1c1c] bg-[#1a1a1a] cursor-pointer transition-colors flex items-center gap-2 border border-transparent hover:border-[#25d1da] hover:shadow-md hover:shadow-[#25d1da]/30 duration-200 ease-in-out"
                            onClick={() => { addSongToPlaylist({ existingPlaylistId: playlist.id, trackIds: [trackDetails.id], isNewPlaylist: false }) }}
                        >
                            <h3 className="font-medium text-xs text-white">{playlist.name}</h3>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddToPlaylistDialog