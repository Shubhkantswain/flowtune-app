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
  const { getAllTracks, getQueueSize } = useQueueStore();
  const { isSleepModeComplete } = useSleepModeStore()

  const [menuVisible, setMenuVisible] = useState(false);
  const [isQueueTrackVisible, setIsQueueTrackVisible] = useState(false);
  const [queueTracks, setQueueTracks] = useState<Track[]>([]);
  const [hide, setHide] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)

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

  useEffect(() => {
    const enabled = localStorage.getItem("videoEnabled")
    if (enabled == null) {
      setVideoEnabled(true)
    } else {
      if (enabled == "true") {
        setVideoEnabled(true)
      } else if (enabled == "false") {
        setVideoEnabled(false)
      } else {
        setVideoEnabled(false)
      }
    }
  }, [])

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
        {videoEnabled && trackDetails.videoUrl ? (
          <video
            className={`${hide ? "opacity-100" : "opacity-30"} fixed inset-0 z-0 block md:hidden`}
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
          <Header onClose={onClose} onShowQueueTrack={() => setIsQueueTrackVisible(true)} hide={hide} setHide={setHide} />

          {
            !hide && (
              <>
                {/* Track Art and Info */}
                <TrackArtAndInfo onShow={() => setMenuVisible(true)} videoEnabled={videoEnabled} />

                {/* Progress Bar */}
                <ProgressBar currentTime={currentTime} duration={duration} />

                {/* Controls */}
                <TrackControllers />
              </>
            )
          }
        </div>


      </div>
      <TrackActionsMenu isVisible={menuVisible} onDismiss={() => setMenuVisible(false)} videoEnabled={videoEnabled} setVideoEnabled={setVideoEnabled} />
      <ShowQueueTracks isQueueTrackVisible={isQueueTrackVisible} onHideQueueTrack={() => setIsQueueTrackVisible(false)} queueTracks={queueTracks} />
    </>
  );
};

export default NowPlaying;