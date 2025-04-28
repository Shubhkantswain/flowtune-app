//svgs
//store - function store me store karo
// placeholder 
//img size
// collection not like
//footer at every where
//interactive sign up page
//Loading button

// hey there is a problem when i hover over the play button this tooltip is also zoom in pls fix that 

// <div className="hidden md:flex items-center gap-4 ml-4">
//                                         <button className="hover:bg-white/20 group backdrop-blur-sm hover:scale-105 bg-white/10 rounded-full p-1.5 md:p-2 transition-all"
//                                             onClick={() => {
//                                                 const isPlayingCurrentSong = track?.id == trackDetails.id && trackDetails.isPlaying;

//                                                 if (isPlayingCurrentSong && initialized) {
//                                                     setTrackDetails({ isPlaying: false });
//                                                     return;
//                                                 } else if (track?.id == trackDetails.id && !trackDetails.isPlaying && initialized) {
//                                                     setTrackDetails({ isPlaying: true });
//                                                     return;
//                                                 }
//                                                 else {
//                                                     if (!initialized) {
//                                                         initializePlaylist(tracks)
//                                                     }

//                                                     setTrackDetails({
//                                                         id: track.id,
//                                                         title: track.title,
//                                                         singer: track.singer,
//                                                         starCast: track.starCast,
//                                                         duration: track.duration,
//                                                         coverImageUrl: track.coverImageUrl || "",
//                                                         videoUrl: track.videoUrl,
//                                                         audioFileUrl: track.audioFileUrl,
//                                                         hasLiked: track.hasLiked,
//                                                         authorId: track.authorId,
//                                                         isPlaying: true,
//                                                     });

//                                                     setCurrentlyPlayingTrack(track.id)
//                                                     setInitialized(true)
//                                                 }
//                                             }}>
//                                             <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-zinc-800 text-white shadow-lg 
//                                             opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white">
//                                                 More
//                                             </div>
//                                             {track?.id == trackDetails.id && trackDetails.isPlaying && initialized ? (
//                                                 <PauseIcon width="15" height="15" />
//                                             ) : (
//                                                 <PlayIcon width="15" height="15" />
//                                             )}
//                                         </button>
//                                         <div className="text-gray-400  text-xs md:text-sm w-12 text-center">{formatDuration(track.duration)}</div>
//                                         <button className="hover:bg-white/20 backdrop-blur-sm bg-white/10 rounded-full p-1 md:p-1.5 transition-all">
//                                             <PlusIcon width="15" height="15" />
//                                         </button>
//                                     </div>