import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { useAddSongToPlaylist, useGetCurrentUserPlaylists } from '~/hooks/playlist'
import { useTrackStore } from '~/store/useTrackStore';
import { Playlist } from 'gql/graphql';
import { LoadingSpinnerIcon, PlusIcon } from '~/Svgs';

// Define the props
interface AddToPlaylistDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNewPlaylistDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    trackId: string
}

const AddToPlaylistDialog: React.FC<AddToPlaylistDialogProps> = ({
    isOpen,
    setIsOpen,
    setNewPlaylistDialogOpen,
    trackId
}) => {
    const [page, setPage] = useState(1)
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const { data, isLoading } = useGetCurrentUserPlaylists({ page, limit: 10 }, true)
    const { mutateAsync: addSongToPlaylist } = useAddSongToPlaylist()

    useEffect(() => {
        console.log("new ");
        if (data) {

            setPlaylists((prev) => [...prev, ...data])
        }
    }, [data])

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
                        <PlusIcon width="20" height="20" />

                        <span className="text-white text-sm">New Playlist</span>
                    </div>
                    {/* Other Playlists */}


                    {isLoading && page == 1 ? (

                        Array.from({ length: 5 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="p-2 rounded-md bg-[#1A1A1A] border border-[#2a2a2a] flex items-center gap-2"
                            >
                                {/* Circle icon placeholder (optional, adds premium polish) */}
                                <div className="w-4 h-4 rounded-full bg-[#333333]" />

                                {/* Title line placeholder */}
                                <div className="h-4 bg-[#333333] rounded w-3/4" />
                            </div>
                        ))
                    ) : (
                        playlists?.map((playlist) => (
                            <div
                                key={playlist.id}
                                className="p-2 rounded-md hover:bg-[#1c1c1c] bg-[#1a1a1a] cursor-pointer transition-colors flex items-center gap-2 border border-transparent hover:border-[#25d1da] hover:shadow-md hover:shadow-[#25d1da]/30 duration-200 ease-in-out"
                                onClick={() => { addSongToPlaylist({ existingPlaylistId: playlist.id, trackIds: [trackId], isNewPlaylist: false }) }}
                            >
                                <h3 className="font-medium text-xs text-white">{playlist.name}</h3>
                            </div>
                        ))
                    )}

                    <button
                        onClick={() => setPage(page + 1)}
                        aria-label="Load more tracks"
                        className="mx-auto block px-3 py-1.5 mt-5 bg-white text-gray-800 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow transition-all duration-200 w-fit"
                        disabled={isLoading}
                    >
                        {isLoading && page != 1 ? (
                            <span className="flex items-center justify-center gap-1.5">
                                <LoadingSpinnerIcon />
                                Loading...
                            </span>
                        ) : (
                            'Load More'
                        )}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddToPlaylistDialog
