import React from 'react';
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { useTrackStore } from '~/store/useTrackStore';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrackMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const { trackDetails } = useTrackStore();

  const MenuItem = ({ icon, label, onClick, isActive = false }) => (
    <button
      onClick={onClick}
      className="group flex items-center w-full p-3 hover:bg-white/5 rounded-lg transition-all duration-300"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/15 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-white"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      </div>
      <span className="ml-3 text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-300">
        {label}
      </span>
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[320px] sm:max-w-[380px] p-0 overflow-hidden bg-zinc-900/95 backdrop-blur-xl border-zinc-800">
        {/* Enhanced Header Section */}
        <div className="relative w-full">
          <div className="relative h-48 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-fuchsia-500/30 to-cyan-400/30 animate-gradient-slow z-[1]" />
            
            {/* Blurred background image */}
            <img
              src={trackDetails.coverImageUrl || ""}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
            />

            {/* Main content wrapper with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-900 z-[2]">
              <div className="h-full flex items-center justify-between px-4">
                {/* Album art and text container */}
                <div className="flex items-center space-x-4">
                  {/* Album art with shine effect */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent z-10" />
                    <img
                      src={trackDetails.coverImageUrl || ""}
                      alt={trackDetails.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Text content with gradient */}
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-white line-clamp-2 bg-gradient-to-r from-white to-white/80 bg-clip-text">
                      {trackDetails.title}
                    </h2>
                    <p className="text-sm text-zinc-300 font-medium">
                      {trackDetails.artist}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-white"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Options */}
        <div className="p-2 space-y-0.5">
          <MenuItem
            icon="<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />"
            label={trackDetails.hasLiked ? "Remove from Liked Songs" : "Add to Liked Songs"}
            onClick={() => {}}
            isActive={trackDetails.hasLiked}
          />
          <MenuItem
            icon="<path d='M3 6h18M3 12h18M3 18h18' />"
            label="Add to Queue"
            onClick={() => {}}
          />
          <MenuItem
            icon="<path d='M12 5v14M5 12h14' />"
            label="Add to Playlist"
            onClick={() => {}}
          />
          <MenuItem
            icon="<path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v12' />"
            label="Share"
            onClick={() => {}}
          />
          <MenuItem
            icon="<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' />"
            label="View Artist"
            onClick={() => {}}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackMenu;