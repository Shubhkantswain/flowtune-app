import { Track } from 'gql/graphql'
import usePlaylistStore from '~/store/usePlaylistStore'
import { useTrackStore } from '~/store/useTrackStore'
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, SkipBackwardIcon, SkipForwardIcon } from '~/Svgs'

const CenterPlaybackControllers = () => {
  const { trackDetails, togglePlay, handleSkip, setTrackDetails } = useTrackStore()
  const { hasNextTrack, hasPreviousTrack, playNextTrack, playPreviousTrack, isPlaylistRepeat, setCurrentlyPlayingTrack, firstNode, lastNode } = usePlaylistStore()

  const isPlaying = trackDetails.isPlaying
  const hasTrack = Boolean(trackDetails.id)

  const isDisabledForDirection = (direction: 'next' | 'prev') => {
    if (!hasTrack) return true
    if (isPlaylistRepeat) return false
    return direction === 'next' ? !hasNextTrack() : !hasPreviousTrack()
  }

  const updateTrackDetails = (track: Track) => {
    setTrackDetails({
      ...track,
      coverImageUrl: track.coverImageUrl || "",
      isPlaying: true,
    })
  }

  const playTrack = (direction: 'next' | 'prev') => {
    if (!hasTrack) return

    const track = direction === 'next'
      ? (hasNextTrack() ? playNextTrack() : firstNode?.data)
      : (hasPreviousTrack() ? playPreviousTrack() : lastNode?.data)

    if (track) {
      updateTrackDetails(track)
      setCurrentlyPlayingTrack(track.id)
    }
  }

  return (
    <div className="hidden md:flex items-center justify-center flex-1 md:w-1/3 space-x-2 md:space-x-4">

      {/* Skip Backward 15s */}
      <div className="relative group hidden lg:block md:hidden">
        {hasTrack && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
            Skip Backward 15s
          </div>
        )}
        <button
          className={`p-2 ${hasTrack ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-white`}
          onClick={() => handleSkip('backward')}
          disabled={!hasTrack}
        >
          <SkipBackwardIcon width="24" height="24" />
        </button>
      </div>

      {/* Previous Button */}
      <div className="relative group">
        {!isDisabledForDirection('prev') && ( 
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
            Previous
          </div>
        )}
        <button
          className={`p-2 ${!isDisabledForDirection('prev') ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-white`}
          onClick={() => playTrack('prev')}
          disabled={isDisabledForDirection('prev')}
        >
          <PrevIcon width="24" height="24" />
        </button>
      </div>

      {/* Play/Pause Button */}
      <div className="relative group">
        {hasTrack && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
            {isPlaying ? "Pause" : "Play"}
          </div>
        )}
        <button
          className={`${hasTrack ? "opacity-100 hover:bg-white/40 hover:scale-105" : "opacity-50 cursor-not-allowed"} w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transition-transform`}
          onClick={togglePlay}
          disabled={!hasTrack}
        >
          {isPlaying ? <PauseIcon width="24" height="24" /> : <PlayIcon width="24" height="24" />}
        </button>
      </div>

      {/* Next Button */}
      <div className="relative group">
        {!isDisabledForDirection('next') && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white">
            Next
          </div>
        )}
        <button
          className={`p-2 ${!isDisabledForDirection('next') ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-white`}
          onClick={() => playTrack('next')}
          disabled={isDisabledForDirection('next')}
        >
          <NextIcon width="24" height="24" />
        </button>
      </div>

      {/* Skip Forward 30s */}
      <div className="relative group hidden lg:block md:hidden">
        {hasTrack && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
            Skip Forward 30s
          </div>
        )}
        <button
          className={`p-2 ${hasTrack ? "opacity-100" : "opacity-50 cursor-not-allowed"} transition-colors text-white hover:text-white`}
          onClick={() => handleSkip('forward')}
          disabled={!hasTrack}
        >
          <SkipForwardIcon width="24" height="24" />
        </button>
      </div>

    </div>
  )
}

export default CenterPlaybackControllers
