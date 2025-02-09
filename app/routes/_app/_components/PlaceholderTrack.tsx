import { memo } from "react";

const PlaceholderTrack = memo(({ index }: { index: number }) => (
  <div
    key={`dummy-${index}`}
    className="flex-none w-3 sm:w-40 md:w-44 opacity-50"
  >
    <div className="bg-[#313232] aspect-square rounded-lg flex items-center justify-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="80" 
        height="80"          
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="lucide lucide-disc-3"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
      </svg>
    </div>
  </div>
));

export default PlaceholderTrack