import React, { useEffect, useState } from 'react';
import { useTrackStore } from '~/store/useTrackStore';
import TrackControllers from './TrackControllers';
import { useLikeTrack } from '~/hooks/track';
import { Slider } from '~/components/ui/slider';
import Header from './Header';
import TrackActionsMenu from './trackActionsMenu/TrackActionsMenu';
import TrackArtAndInfo from './TrackArtAndInfo';
import ProgressBar from './ProgressBar';
import ShowQueueTracks from './ShowQueueTracks';
import { useQueueStore } from '~/store/useQueueStore';
import { Track } from 'gql/graphql';
import useSleepModeStore from '~/store/useSleepModeStore';
import Swal from 'sweetalert2'

interface NowPlayingProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
  currentTime: number;
  duration: number;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ isOpen, onClose, progress, currentTime, duration }) => {
  const { trackDetails } = useTrackStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isQueueTrackVisible, setIsQueueTrackVisible] = useState(false);
  const { getAllTracks, isTrackInQueue, getQueueSize, dequeueFirstTrack } = useQueueStore();
  const [queueTracks, setQueueTracks] = useState<Track[]>([]);
  const { isSleepModeComplete } = useSleepModeStore()

  // Fetch all tracks whenever the queue changes
  useEffect(() => {
    setQueueTracks(getAllTracks());
  }, [getQueueSize()]); // Re-run when queue size changes

  useEffect(() => {
    if (isSleepModeComplete) {
      Swal.fire({
        title: "Sleep Mode Completed",
        text: "Your sleep timer has ended. It's time to rest and recharge. Goodnight Dear!",
        icon: "success",
      });
    }
  }, [isSleepModeComplete])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  console.log("trackDetails.videoUrl", trackDetails.videoUrl);
  
  return (
    <>
      <div
        className={`[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] fixed inset-0 bg-black overflow-y-auto z-50 ${isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        {/* Background Image (Visible on md and larger) */}
        <div
          className="fixed inset-0 z-0 opacity-30 hidden md:block"
          style={{
            backgroundImage: `url(${trackDetails.coverImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(40px)",
          }}
        />

        {/* Video Background (Only visible on small screens) */}
        {trackDetails.videoUrl ? (
          <video
            className="fixed inset-0 z-0 opacity-30 block md:hidden"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              filter: "blur(0px)",
            }}
            src={trackDetails.videoUrl || ""}
            autoPlay
            loop
            muted
          />
        ) : (
          <div
            className="fixed inset-0 z-0 opacity-30 block md:hidden"
            style={{
              backgroundImage: `url(${trackDetails.coverImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(40px)",
            }}
          />
        )}



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

      <TrackActionsMenu isVisible={menuVisible} onDismiss={() => setMenuVisible(false)} />
      <ShowQueueTracks isQueueTrackVisible={isQueueTrackVisible} onHideQueueTrack={() => setIsQueueTrackVisible(false)} queueTracks={queueTracks} />
    </>
  );
};

export default NowPlaying;