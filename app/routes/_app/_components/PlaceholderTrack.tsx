import React from "react"
import { DiscIcon } from "~/Svgs"

interface PlaceholderTrackProps {
  width?: string
  height?: string
}

const PlaceholderTrack: React.FC<PlaceholderTrackProps> = ({ width, height }) => (
  <div className="bg-[#161616] flex items-center justify-center rounded-sm overflow-hidden w-full h-full">
    <DiscIcon width={width} height={width} />
  </div>
)

export default PlaceholderTrack
