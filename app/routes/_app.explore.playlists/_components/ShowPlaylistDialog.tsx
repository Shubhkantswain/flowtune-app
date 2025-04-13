import { useNavigate } from '@remix-run/react';
import { Playlist } from 'gql/graphql';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '~/components/ui/dialog';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';

// Define the props for the ShowTrackDialog component
interface ShowPlaylistDialogProps {
    isOpen: boolean;
    onClose: () => void;
    playlists: Playlist[]; // Pass the tracks as a prop
}

function ShowPlaylistDialog({ isOpen, onClose, playlists }: ShowPlaylistDialogProps) {
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { getCurrent, initialize, setCurrentTrack, setActiveSectionIndex, activeSectionIndex } = usePlaylistStore()
    const navigate = useNavigate()

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-[#111111] border-zinc-700 text-white [&::-webkit-scrollbar]:hidden"> {/* Black gradient background */}
                <DialogHeader>
                    <DialogTitle className="text-white">Tracks</DialogTitle> {/* White text for title */}
                    <DialogDescription className="text-gray-400">Here are all the tracks:</DialogDescription> {/* Light gray text for description */}
                </DialogHeader>
                <div className="space-y-3">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="p-3 rounded-lg hover:bg-[#1c1c1c] bg-[#1a1a1a] cursor-pointer transition-colors flex items-center gap-3 relative 
              border border-transparent hover:border-[#25d1da] hover:shadow-lg hover:shadow-[#25d1da]/30 duration-300 ease-in-out"
                           onClick={() => navigate(`/playlist/${playlist.id}`)}
                        >
                            {/* Track Image */}
                            <img
                                src={playlist.coverImageUrl || 'https://via.placeholder.com/50'} // Fallback image if no URL is provided
                                alt={playlist.name}
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
                            />

                            {/* Track Details */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-sm text-white">{playlist.name}</h3> {/* White text for title */}
                                <p className="text-xs text-gray-400">Total Tracks : {playlist.totalTracks}</p> {/* Light gray text for artist */}
                            </div>

                         

                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ShowPlaylistDialog;
