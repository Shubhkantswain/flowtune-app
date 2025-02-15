import React, { useEffect, useState } from 'react';
import { useTrackStore } from '~/store/useTrackStore';
import TrackControllers from './TrackControllers';
import { useLikeTrack } from '~/hooks/track';
import { Slider } from '~/components/ui/slider';
import Header from './Header';
import TrackActionsMenu from './TrackActionsMenu';
import TrackArtAndInfo from './TrackArtAndInfo';
import ProgressBar from './ProgressBar';
import ShowQueueTracks from './ShowQueueTracks';
import { useQueueStore } from '~/store/useQueueStore';
import { Track } from 'gql/graphql';

interface NowPlayingProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
  currentTime: number;
  duration: number;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ isOpen, onClose, progress, currentTime, duration }) => {
  const { trackDetails } = useTrackStore()
  const [menuVisible, setMenuVisible] = useState(false)
  const [isQueueTrackVisible, setIsQueueTrackVisible] = useState(false)
  const { getAllTracks, isTrackInQueue } = useQueueStore()
  const [inQueue, setInQueue] = useState<boolean>(false)
  const [queueTracks, setQueueTracks] = useState<Track[]>([])

  useEffect(() => {
    setQueueTracks(getAllTracks());
  }, [inQueue]);

  // to hide the scroll bar of home page, explore etc
  useEffect(() => {
    if (isOpen || menuVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, menuVisible]);

  useEffect(() => {
    const inQueue = isTrackInQueue(trackDetails.id)
    setInQueue(inQueue)
  }, [isOpen])

  return (
    <>
      <div
        className={`[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] fixed inset-0 bg-black overflow-y-auto transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `url(${trackDetails.coverImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto min-h-full">
          {/* Header */}
          <Header onClose={onClose} onShowQueueTrack={() => setIsQueueTrackVisible(true)} />

          {/* Track Art and Info */}
          <TrackArtAndInfo onShow={() => setMenuVisible(true)} />

          {/* Progress Bar */}
          <ProgressBar currentTime={currentTime} duration={duration} />

          {/* Controls */}
          <TrackControllers />
        </div>
      </div>

      <TrackActionsMenu isVisible={menuVisible} onDismiss={() => setMenuVisible(false)} inQueue={inQueue} setInQueue={setInQueue} />
      <ShowQueueTracks isQueueTrackVisible={isQueueTrackVisible} onHideQueueTrack={() => setIsQueueTrackVisible(false)} queueTracks={queueTracks} />
    </>
  );
};

export default NowPlaying;