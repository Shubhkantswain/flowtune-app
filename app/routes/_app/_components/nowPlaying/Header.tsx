import React, { useEffect, useState } from 'react'
import Tooltip from '~/components/Tooltip';
import { useTrackStore } from '~/store/useTrackStore';
import { DownArrowIcon, QueueIcon } from '~/Svgs';

interface HeaderProps {
    onClose: () => void;
    onShowQueueTrack: () => void;
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
    videoEnabled: boolean
}

const Header: React.FC<HeaderProps> = ({ onClose, onShowQueueTrack, hide, setHide, videoEnabled }) => {
    const { trackDetails } = useTrackStore()
    const [showQueue, setShowQueue] = useState(false)

    useEffect(() => {
        const showQueue = localStorage.getItem("showQueue")
        if (showQueue == null) {
            setShowQueue(true)
        } else {
            if (showQueue == "true") {
                setShowQueue(true)
            } else if (showQueue == "false") {
                setShowQueue(false)
            } else {
                setShowQueue(false)
            }
        }
    }, [])

    return (
        <div className="p-4 flex items-center justify-between relative">
            <button onClick={onClose} className="relative group hover:text-[#93D0D5]  text-white transition-colors duration-300">
                <Tooltip
                    text="Minimise Screen"
                    className="top-7 left-12 md:left-1/2"
                />

                <DownArrowIcon width="24" height="24" />
            </button>

            {
                (trackDetails.videoUrl && videoEnabled) && (
                    <div className="relative group -mt-7">
                        <Tooltip
                            text={hide ? "Show Controllers" : "Hide Controllers"}
                            className="top-8"
                        />
                        <div className="absolute left-1/2 transform -translate-x-1/2 sm:hidden cursor-pointer" onClick={() => setHide(!hide)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-expand"><path d="m15 15 6 6" /><path d="m15 9 6-6" /><path d="M21 16.2V21h-4.8" /><path d="M21 7.8V3h-4.8" /><path d="M3 16.2V21h4.8" /><path d="m3 21 6-6" /><path d="M3 7.8V3h4.8" /><path d="M9 9 3 3" /></svg>
                        </div>
                    </div>
                )
            }


            {
                showQueue && (
                    <>
                        {/* Show Queue */}
                        <button className="relative group text-white hover:text-[#93D0D5] transition-colors duration-300" onClick={onShowQueueTrack}>
                            <Tooltip
                                text="Show Queue"
                                className="top-6 -left-7 md:left-1/2"
                            />

                            <QueueIcon width="24" height="24" />
                        </button>
                    </>
                )
            }

        </div >
    )
}

export default Header