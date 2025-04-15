import { Track } from "gql/graphql";
import { useEffect, useState } from "react";
import { SECTION_SIZE } from "~/constants";
import usePlaylistStore from "~/store/usePlaylistStore";
import { useTrackStore } from "~/store/useTrackStore";

interface TrackListsProps {
  tracks: Track[]
  initialized: boolean;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  index: number
}

const TrackLists: React.FC<TrackListsProps> = ({ tracks, initialized, setInitialized, index }) => {
  const tracksToRender = [
    ...tracks,
    ...Array(Math.max(0, SECTION_SIZE - tracks.length)).fill(null)
  ];
 

  const { trackDetails, setTrackDetails } = useTrackStore()

  const { initialize, setCurrentTrack, getCurrent, activeSectionIndex, setActiveSectionIndex } = usePlaylistStore()

  const handleClick = (isPlayingCurrentSong: boolean, track: Track) => {
    if (isPlayingCurrentSong && initialized) {
      setTrackDetails({ isPlaying: false });
      return;
    }
    else if (track?.id == trackDetails.id && !trackDetails.isPlaying && initialized) {
      setTrackDetails({ isPlaying: true });
      return;
    }
    else {
      if (index != activeSectionIndex) {
        console.log("else ooooooooooooo");
        initialize(tracks);
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

      setCurrentTrack(track.id)
      setInitialized(true)
      setActiveSectionIndex(index)
    }
  };
  
  return (
    <>
      {tracksToRender.map((track, index) => {
        const isPlayingCurrentSong = track?.id == trackDetails.id && trackDetails.isPlaying;

        return track ? (
          <div key={track.id} className="flex-none w-36 sm:w-40 md:w-44 transition-transform duration-300">
            <div className="group relative overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
              
              {/* <div className="w-36 sm:w-40 md:w-44 h-36 sm:h-40 md:h-44 bg-red-950"> */}

              <img
                src={track.coverImageUrl || ""}
                alt={`Album cover for ${track.title}`}
                className="w-full aspect-square rounded-sm transition-opacity duration-300 group-hover:brightness-50 object-cover"
                />
                {/* </div> */}
              
              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <button
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                  aria-label={`Play ${track.title}`}
                  onClick={() => handleClick(isPlayingCurrentSong, track)}
                >
                  {
                    (isPlayingCurrentSong && initialized) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_playback_pause-a" d="M9,22 L6,22 C5.45,22 5,21.55 5,21 L5,3 C5,2.45 5.45,2 6,2 L9,2 C9.55,2 10,2.45 10,3 L10,21 C10,21.55 9.55,22 9,22 Z M19,21 L19,3 C19,2.45 18.55,2 18,2 L15,2 C14.45,2 14,2.45 14,3 L14,21 C14,21.55 14.45,22 15,22 L18,22 C18.55,22 19,21.55 19,21 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use fill-rule="nonzero" href="#ic_playback_pause-a" fill="currentColor"></use></g></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="ic_playback_play-a" d="M21.54933,11.208 L7.32711083,2.131 C7.05155533,1.955 6.7155554,1.957 6.44177768,2.136 C6.16799996,2.315 6,2.644 6,3 L6,21 C6,21.354 6.16711108,21.683 6.43911102,21.862 C6.57777765,21.954 6.73333318,22 6.8888887,22 C7.038222,22 7.18666641,21.958 7.32177749,21.873 L21.5439967,12.951 C21.8239966,12.775 21.9991077,12.442 22,12.081 C22.0008855,11.72 21.8293299,11.386 21.54933,11.208 Z"></path></defs><g fill-rule="evenodd" fill="transparent"><rect width="24" height="24"></rect><use href="#ic_playback_play-a" fill="currentColor"></use></g></svg>
                    )
                  }
                </button>
              </div>
            </div>
            <div className="font-normal mt-2 truncate overflow-ellipsis">
              {track?.title}
            </div>
            <div className="text-sm text-gray-400 truncate overflow-ellipsis mt-0.5">
              {track?.singer}
            </div>
          </div>
        ) : (
          <div key={`dummy-${index}`} className="flex-none w-36 sm:w-40 md:w-44 opacity-50">
            <div className="bg-[#313232] aspect-square rounded-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-disc-3">
                <circle cx="12" cy="12" r="10" />
                <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
              </svg>
            </div>
          </div>
        );
      })}

    </>
  )
}

export default TrackLists;