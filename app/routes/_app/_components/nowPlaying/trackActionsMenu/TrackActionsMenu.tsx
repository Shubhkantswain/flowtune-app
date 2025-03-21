import TrackInfoSection from './TrackInfoSection';
import ActionButtons from './ActionButtons';

interface TrackActionsMenuProps {
    isVisible: boolean;
    onDismiss: () => void;
    videoEnabled: boolean;
    setVideoEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const TrackActionsMenu = ({ isVisible, onDismiss, videoEnabled, setVideoEnabled }: TrackActionsMenuProps) => {

    if (!isVisible) {
        return null
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex flex-col">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

                {/* Main Content */}
                <div className="relative z-10 flex flex-col h-full text-white">
                    {/* Scrollable Section */}
                    <div className="flex-1 overflow-y-scroll p-4 mt-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {/* Track Info Section - Now with p-4 to match other items */}
                        <TrackInfoSection />

                        {/* Action Buttons */}
                        <ActionButtons videoEnabled={videoEnabled} setVideoEnabled={setVideoEnabled} />
                    </div>

                    {/* Fixed Close Button */}
                    <div className="p-4 bg-black/5 backdrop-blur-sm text-center">
                        <button
                            onClick={onDismiss}
                            className="text-white text-lg font-medium transition-transform duration-200 hover:scale-110"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default TrackActionsMenu;