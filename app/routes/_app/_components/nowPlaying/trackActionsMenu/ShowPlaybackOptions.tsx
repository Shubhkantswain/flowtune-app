import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { Switch } from '~/components/ui/switch';
import { useRepeatableTracksStore } from '~/store/useRepeatableTracksStore';
import { useTrackStore } from '~/store/useTrackStore';

function ShowPlaybackOptions() {
    const { trackDetails, handlePlaybackSpeed } = useTrackStore();
    const { markTrackAsRepeatable, unmarkTrackAsRepeatable, isTrackRepeatable } = useRepeatableTracksStore()
    const [isRepeatable, setIsRepeatable] = useState(isTrackRepeatable(trackDetails.id));

    const [playbackSpeed, setPlaybackSpeed] = useState([1]);

    useEffect(() => {
        const storedSpeed = Number(localStorage.getItem('speed')) || 1;
        setPlaybackSpeed([storedSpeed]);
    }, []);

    return (
        <div className="p-3 bg-zinc-900/90 rounded-xl space-y-4 transition-all duration-300 ease-in-out border border-white/10 max-w-xs mx-auto sm:mx-0">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-xs font-medium leading-none text-white">Repeatable Track</Label>
                    <p className="text-xs text-gray-400">Repeat this track automatically</p>
                </div>
                <Switch
                    checked={isRepeatable}
                    onCheckedChange={(checked: boolean) => {
                        if (checked) {
                            markTrackAsRepeatable(trackDetails.id)
                            toast.success("Track is now set to repeat");
                        } else {
                            unmarkTrackAsRepeatable(trackDetails.id)
                            toast.success("Track will no longer repeat");
                        }

                        setIsRepeatable(!isRepeatable)
                    }}
                    className="data-[state=checked]:bg-green-500"
                />
            </div>

            <div className="space-y-3">
                <div className="space-y-0.5">
                    <Label className="text-xs font-medium leading-none text-white">
                        Playback Speed: {playbackSpeed[0]}x
                    </Label>
                    <p className="text-xs text-gray-400">Adjust the playing speed of the track</p>
                </div>
                <Slider
                    value={playbackSpeed}
                    onValueChange={(value: number[]) => {
                        const newValue = handlePlaybackSpeed(value)
                        setPlaybackSpeed(newValue)
                    }}
                    max={2}
                    min={0.5}
                    step={0.25}
                    className="w-full hover:cursor-grab active:cursor-grabbing"
                    nowPlaying={true}
                />
                <div className="flex justify-between text-xs text-gray-400">
                    <span>0.5x</span>
                    <span>1x</span>
                    <span>1.5x</span>
                    <span>2x</span>
                </div>
            </div>
        </div>
    )
}

export default ShowPlaybackOptions