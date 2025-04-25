import { Track } from "gql/graphql";
import { useEffect, useState } from "react";
import { SECTION_SIZE } from "~/constants";
import PlaceholderTrack from "~/routes/_app/_components/PlaceholderTrack";
import usePlaylistStore from "~/store/usePlaylistStore";
import { useTrackStore } from "~/store/useTrackStore";
import { PauseIcon, PlayIcon } from "~/Svgs";

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

  const { initializePlaylist, setCurrentlyPlayingTrack, activeSectionIndex, setActiveSectionIndex } = usePlaylistStore()

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
        initializePlaylist(tracks);
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
                      <PauseIcon width="24" height="24" />

                    ) : (
                      <PlayIcon width="24" height="24" />
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
          <div key={`dummy-${index}`} className="flex-none w-36 sm:w-40 md:w-44  h-36 sm:h-40 md:h-44 transition-transform duration-300">
            <PlaceholderTrack width="80" height="80" />
          </div>
        );
      })}

    </>
  )
}

export default TrackLists;