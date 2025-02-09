import { memo } from "react";

const TrackInfo = memo(({ title, artist }: { title: string; artist: string }) => (
  <>
    <h3 className="mt-2 font-semibold truncate text-xs sm:text-sm md:text-base">
      {title}
    </h3>
    <p className="text-gray-400 text-xs sm:text-sm truncate text-[10px] md:text-sm">
      {artist}
    </p>
  </>
));

export default TrackInfo