import { toast } from 'sonner';
import useSleepModeStore from '~/store/useSleepModeStore'

const ShowSleepModeOptions = () => {
    const { startSleepMode, setSleepTimeLeft, sleepTimeLeft, setEndOfTheTrackEnabled, stopSleepMode, isSleepModeActive, endOfTheTrackEnabled } = useSleepModeStore()

    const handleStartSleepMode = (minutes: number) => {
        setSleepTimeLeft(minutes);
        startSleepMode();
        setEndOfTheTrackEnabled(false)
        toast.success(`Sleep mode enabled: will start after ${minutes} minutes.`);
    };

    const handlEndOfTheTrack = (enabled: boolean) => {
        setEndOfTheTrackEnabled(enabled)
        stopSleepMode()
        setSleepTimeLeft(0)
        toast.success(`Sleep mode enabled: will start after track ends.`);
    }

    const handleStopSleepMode = () => {
        stopSleepMode()
        setSleepTimeLeft(0)
        setEndOfTheTrackEnabled(false)
    }

    return (
        <div className="p-3 bg-zinc-900/90 rounded-xl space-y-3 transition-all duration-300 ease-in-out border border-white/10 max-w-xs mx-auto sm:mx-0">

            {/* Sleep Mode Title */}
            <h3 className="text-base font-semibold text-white text-center mb-1">
                {`Sleep Mode${sleepTimeLeft > 0 ? ` - ${sleepTimeLeft} Min Left` : ''}`}
            </h3>

            {/* Sleep Mode Options (One per Row) */}
            {[5, 10, 15, 30, 45, 60].map((minutes) => (
                <button
                    key={minutes}
                    className="w-full px-3 py-1.5 bg-zinc-800 text-white rounded-lg text-xs font-medium transition-transform duration-200"
                    onClick={() => handleStartSleepMode(minutes)}
                >
                    {minutes} min
                </button>
            ))}

            {
                (isSleepModeActive || endOfTheTrackEnabled) && (<button
                    className="w-full px-3 py-1.5 bg-zinc-800 text-white rounded-lg text-xs font-medium transition-transform duration-200"
                    onClick={handleStopSleepMode}
                >
                    Turn off timer
                </button>)
            }

            <button
                className="w-full px-3 py-1.5 bg-zinc-800 text-white rounded-lg text-xs font-medium transition-transform duration-200"
                onClick={() => handlEndOfTheTrack(true)}
            >
                End of the Track
            </button>
        </div>
    )
}

export default ShowSleepModeOptions