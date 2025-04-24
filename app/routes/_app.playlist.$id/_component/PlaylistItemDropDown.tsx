import { Track } from 'gql/graphql';
import React from 'react'
import { toast } from 'sonner'
import { useCurrentUser } from '~/hooks/auth';
import { useLikeTrack } from '~/hooks/track';
import { useQueueStore } from '~/store/useQueueStore';
import { useTrackStore } from '~/store/useTrackStore';

interface PlaylistItemDropDownProps {
  dropdownRef: React.RefObject<HTMLDivElement>;
  setAddToPlaylistOpen: React.Dispatch<React.SetStateAction<boolean>>;
  track: Track
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
  handleControll: (track: Track) => void
  authorId: string
  initialized: boolean
  handleRemoveTrackFromPlaylist: (trackId: string) => void
}

const PlaylistItemDropDown: React.FC<PlaylistItemDropDownProps> = ({ dropdownRef, setAddToPlaylistOpen, track, setTracks, handleControll, authorId, initialized, handleRemoveTrackFromPlaylist }) => {
  const { getAllTracks, dequeueTrack, enqueueTrack } = useQueueStore()
  const queueTracks = getAllTracks()
  const { trackDetails, setTrackDetails } = useTrackStore()

  const { data } = useCurrentUser()
  const { mutateAsync: likeTrack } = useLikeTrack()

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-0 w-64 z-50 transform transition-all duration-300 ease-in-out ${true ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
    >
      <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-md shadow-xl border border-[#2E3030]">
        <div className="py-1">
          <button
            className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              setAddToPlaylistOpen(true)
            }}

          >
            Add To Playlist

          </button>

          <div className="border-b border-[#2E3030]"></div>

          <button
            className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              if (queueTracks?.[track.id]) {
                dequeueTrack(trackDetails.id);
                toast.success(`"${trackDetails.title}" removed from queue`);
              } else {
                enqueueTrack(track);
                toast.success(`"${trackDetails.title}" added to queue`);
              }
            }}
          >
            {queueTracks?.[track.id] ? "Remove From Queue" : "Add To Queue"}
          </button>

          <div className="border-b border-[#2E3030]"></div>

          <button
            className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
            onClick={async (e) => {
              e.preventDefault()
              await likeTrack(track.id)
              setTracks((prev) => {
                return prev.map((item) => {
                  if (item.id == track.id) {
                    return {
                      ...item,
                      hasLiked: !item.hasLiked
                    }
                  } else {
                    return item
                  }
                })

              })
            }}
          >
            {
              track.hasLiked ? "Unlike This Track" : "Like This Track"
            }

          </button>

          <div className="border-b border-[#2E3030]"></div>

          <button
            className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
            onClick={() => handleControll(track)}

          >
            {
              (track?.id === trackDetails.id && trackDetails.isPlaying && initialized) ? "Pause This Track" : "Play This Track"
            }

          </button>

          {
            authorId == data?.id && (
              <>
                <div className="border-b border-[#2E3030]"></div>

                <button
                  className="flex items-center justify-between w-full text-left px-4 py-4 text-sm text-gray-200 hover:bg-[#29292A] hover:text-white"
                  onClick={() => handleRemoveTrackFromPlaylist(track.id)}
                >
                  Remove This Track

                </button>
              </>
            )
          }

        </div>
      </div>

    </div>
  )
}

export default PlaylistItemDropDown