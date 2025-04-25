import { Track } from 'gql/graphql';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '~/components/ui/dialog';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';
import { PauseIcon, PlayIcon } from '~/Svgs';

// Define the props for the ShowTrackDialog component
interface ShowTrackDialogProps {
    isOpen: boolean;
    onClose: () => void;
    tracks: Track[]; // Pass the tracks as a prop
    initialized: boolean;
    setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
    index: number
}

function ShowTrackDialog({ isOpen, onClose, tracks, initialized, setInitialized, index }: ShowTrackDialogProps) {
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { initializePlaylist, setCurrentlyPlayingTrack, setActiveSectionIndex, activeSectionIndex } = usePlaylistStore()

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-[#111111] border-zinc-700 text-white [&::-webkit-scrollbar]:hidden"> {/* Black gradient background */}
                <DialogHeader>
                    <DialogTitle className="text-white">Tracks</DialogTitle> {/* White text for title */}
                    <DialogDescription className="text-gray-400">Here are all the tracks:</DialogDescription> {/* Light gray text for description */}
                </DialogHeader>
                <div className="space-y-3">
                    {tracks.map((track) => (
                        <div
                            key={track.id}
                            className="p-3 rounded-lg hover:bg-[#1c1c1c] bg-[#1a1a1a] cursor-pointer transition-colors flex items-center gap-3 relative 
              border border-transparent hover:border-[#25d1da] hover:shadow-lg hover:shadow-[#25d1da]/30 duration-300 ease-in-out"
                            onClick={() => {
                                const isPlayingCurrentSong = track?.id == trackDetails.id && trackDetails.isPlaying;

                                if (isPlayingCurrentSong && initialized) {
                                    setTrackDetails({ isPlaying: false });
                                    return;
                                } else if (track?.id == trackDetails.id && !trackDetails.isPlaying && initialized) {
                                    setTrackDetails({ isPlaying: true });
                                    return;
                                }
                                else {
                                    if (index != activeSectionIndex) {
                                        initializePlaylist(tracks)
                                    }

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
                                    setInitialized(true)
                                    setActiveSectionIndex(index)
                                }
                            }}
                        >
                            {/* Track Image */}
                            <img
                                src={track.coverImageUrl || 'https://via.placeholder.com/50'} // Fallback image if no URL is provided
                                alt={track.title}
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-sm object-cover"
                            />

                            {/* Track Details */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-sm text-white">{track.title}</h3> {/* White text for title */}
                                <p className="text-xs text-gray-400">{track.singer}</p> {/* Light gray text for artist */}
                            </div>

                            {/* Play Button */}
                            <button className="text-white">
                                {
                                    (trackDetails.id == track.id && trackDetails.isPlaying && initialized) ? (
                                        <PauseIcon width="24" height="24" />
                                    ) : (
                                        <PlayIcon width="24" height="24" />
                                    )
                                }
                            </button>

                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ShowTrackDialog;