import { Track } from 'gql/graphql';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '~/components/ui/dialog';
import usePlaylistStore from '~/store/usePlaylistStore';
import { useTrackStore } from '~/store/useTrackStore';

// Define the props for the ShowTrackDialog component
interface ShowTrackDialogProps {
    isOpen: boolean;
    onClose: () => void;
    tracks: Track[]; // Pass the tracks as a prop
    initialized: boolean;
    setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

function ShowTrackDialog({ isOpen, onClose, tracks, initialized, setInitialized }: ShowTrackDialogProps) {
    const { trackDetails, setTrackDetails } = useTrackStore()
    const { getCurrent, initialize, setCurrentTrack } = usePlaylistStore()

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
              border border-transparent hover:border-[#fa586a] hover:shadow-lg hover:shadow-[#fa586a]/30 duration-300 ease-in-out"
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
                                    initialize(tracks)

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

                                    setCurrentTrack(track.id)
                                    setInitialized(true)
                                }
                            }}
                        >
                            {/* Track Image */}
                            <img
                                src={track.coverImageUrl || 'https://via.placeholder.com/50'} // Fallback image if no URL is provided
                                alt={track.title}
                                className="w-12 h-12 rounded-md object-cover"
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use></g></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_playback_play-a" d="M21.54933,11.208 L7.32711083,2.131 C7.05155533,1.955 6.7155554,1.957 6.44177768,2.136 C6.16799996,2.315 6,2.644 6,3 L6,21 C6,21.354 6.16711108,21.683 6.43911102,21.862 C6.57777765,21.954 6.73333318,22 6.8888887,22 C7.038222,22 7.18666641,21.958 7.32177749,21.873 L21.5439967,12.951 C21.8239966,12.775 21.9991077,12.442 22,12.081 C22.0008855,11.72 21.8293299,11.386 21.54933,11.208 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_play-a" fill="currentColor"></use></g></svg>
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
