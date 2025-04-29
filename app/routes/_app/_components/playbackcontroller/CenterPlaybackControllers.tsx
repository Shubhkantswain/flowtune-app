import { Track } from 'gql/graphql'
import Tooltip from '~/components/Tooltip'
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
      <div className="hidden lg:block md:hidden">
        <button
          className={`p-2 rounded-full relative group ${hasTrack ? "opacity-100 hover:text-[#93D0D5]" : "opacity-50 cursor-not-allowed"} transition-colors text-white`}
          onClick={() => handleSkip('backward')}
          disabled={!hasTrack}
        >
          {hasTrack && (
            <Tooltip text='Skip Backward 15s' className='-top-10' />
          )}
          <SkipBackwardIcon width="24" height="24" />
        </button>
      </div>

      {/* Previous Button */}
      <button
        className={`p-2 relative group rounded-full ${!isDisabledForDirection('prev') ? "opacity-100 hover:text-[#93D0D5]" : "opacity-50 cursor-not-allowed"} transition-colors text-white`}
        onClick={() => playTrack('prev')}
        disabled={isDisabledForDirection('prev')}
      >
        {!isDisabledForDirection('prev') && (
          <Tooltip text='Previous' className='-top-10' />
        )}
        <PrevIcon width="24" height="24" />
      </button>

      {/* Play/Pause Button */}
      <div className="relative group rounded-full">
        {hasTrack && (
          <Tooltip text={isPlaying ? "Pause" : "Play"} className='-top-10' />
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
      <button
        className={`p-2 relative group ${!isDisabledForDirection('next') ? "opacity-100 hover:text-[#93D0D5]" : "opacity-50 cursor-not-allowed"} transition-colors text-white rounded-full`}
        onClick={() => playTrack('next')}
        disabled={isDisabledForDirection('next')}
      >
        {!isDisabledForDirection('next') && (
          <Tooltip text='Next' className='-top-10' />
        )}
        <NextIcon width="24" height="24" />
      </button>

      {/* Skip Forward 30s */}
      <div className="hidden lg:block md:hidden">
        <button
          className={`p-2 relative group rounded-full ${hasTrack ? "opacity-100 hover:text-[#93D0D5]" : "opacity-50 cursor-not-allowed"} transition-colors text-white`}
          onClick={() => handleSkip('forward')}
          disabled={!hasTrack}
        >
          {hasTrack && (
            <Tooltip text='Skip Forward 30s' className='-top-10' />
          )}
          <SkipForwardIcon width="24" height="24" />
        </button>
      </div>

    </div>
  )
}

export default CenterPlaybackControllers
