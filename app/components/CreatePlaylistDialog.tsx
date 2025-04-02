import { Track, Visibility } from "gql/graphql";
import { Upload, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import usePreviewFile from "~/hooks/image";
import { useAddSongToPlaylist, useCreatePlaylist } from "~/hooks/playlist";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { searchData } from "~/searchData";
import { useGetSearchTracks } from "~/hooks/track";

interface NewSong {
    name: string;
    visibility: "public" | "private";
}

interface CreatePlaylistDialogProps {
    songDialogOpen: boolean;
    setSongDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    trackId: string;
}

const CreatePlaylistDialog = ({ songDialogOpen, setSongDialogOpen, trackId }: CreatePlaylistDialogProps) => {
    const { handleFileChange: handleImgChange, fileURL: imgUrl } = usePreviewFile("image");
    const [selectedDots, setSelectedDots] = useState<Record<string, boolean>>({});

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [selectedTracks, setSelectedTracks] = useState<Record<string, Track>>({});

    const { register, handleSubmit } = useForm<NewSong>({
        defaultValues: {
            name: "",
            visibility: "public",
        },
    });
    const { mutateAsync: createPlaylist, isPending } = useCreatePlaylist()

    const onSubmit = async (data: NewSong) => {
        createPlaylist({
            name: data.name,
            coverImageUrl: imgUrl || "",
            visibility: data.visibility == "public" ? Visibility.Public : Visibility.Private,
            trackIds: Object.keys(selectedTracks)
        });
    };

    // Toggle dot selection
    const toggleDotSelection = (id: string) => {
        setSelectedDots(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    interface Song {
        title: string;
        coverImageUrl: string;
    }

    type searchKey = keyof typeof searchData;


    const [searchQuery, setSearchQuery] = useState("")

    const [suggestionSearchResults, setSuggestionSearchResults] = useState<Song[]>([]);
    const [shouldSearch, setShouldSearch] = useState(false)
    const [page, setPage] = useState(1)
    const [noMoreResults, setNoMoreResults] = useState(false)

    const { data, isLoading } = useGetSearchTracks({ page, query: searchQuery }, shouldSearch)
    const [searchResults, setSearchResults] = useState<Track[]>([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        if (searchQuery.trim()) {
            const firstLetter = searchQuery[0].toLowerCase(); // Extract first letter
            const filteredSongs: Song[] = searchData[firstLetter as searchKey] || []; // Get songs for that letter

            // Filter songs containing searchQuery
            const results = filteredSongs.filter((song) =>
                song.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setSuggestionSearchResults(results);
        } else {
            setSuggestionSearchResults([]); // Clear results when searchQuery is empty
        }
    }, [searchQuery]);

    useEffect(() => {
        if (data && data.length) {
            if (page == 1) {
                setSearchResults([...data])
            } else {
                setSearchResults((prev: Track[]) => [...prev, ...data])
            }
        }

        if (data && data.length < 4 && !isLoading && shouldSearch) {
            setHasMore(false)
        }
        
        if (data && data.length >= 4) {
            setHasMore(true)
        }

        if (data && !data.length && !isLoading) {
            setSearchResults([])
        }
    }, [data, page, isLoading])

    console.log("hasMore", hasMore);


    return (
        <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
            <DialogContent className="bg-gradient-to-b from-black to-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle className="text-white">Add New Song</DialogTitle>
                    <DialogDescription className="text-white">
                        Fill in the details below to add a new song to your library.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
                    {/* Image Upload */}
                    <div
                        className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        {imgUrl ? (
                            <img
                                src={imgUrl}
                                alt="Selected artwork"
                                className="max-h-40 object-contain rounded-md"
                            />
                        ) : (
                            <div className="text-center">
                                <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                                    <Upload className="h-6 w-6 text-zinc-400" />
                                </div>
                                <p className="text-sm text-zinc-400">Upload Artwork</p>
                                <Button variant="outline" size="sm" type="button">
                                    Choose File
                                </Button>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={imageInputRef}
                            hidden
                            accept="image/*"
                            onChange={handleImgChange}
                        />
                    </div>

                    {/* Song Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Name</label>
                        <Input
                            {...register("name")}
                            className="bg-zinc-800 border-zinc-700 text-white cursor-pointer"
                        />
                    </div>

                    {/* Visibility */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Visibility</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    {...register("visibility")}
                                    type="radio"
                                    value="public"
                                    className="form-radio text-emerald-500"
                                />
                                <span className="text-white">Public</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    {...register("visibility")}
                                    type="radio"
                                    value="private"
                                    className="form-radio text-emerald-500"
                                />
                                <span className="text-white">Private</span>
                            </label>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Search tracks</label>
                        <div className="relative">
                            <Input
                                placeholder="Search tracks..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
                                className="bg-zinc-800 border-zinc-700 text-white pl-3 pr-10" // Added padding for icon
                                id="playlist-search" // Added ID for label targeting
                            />
                            <label
                                htmlFor="playlist-search"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                onClick={() => {
                                    setShouldSearch(true)
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-zinc-400 hover:text-zinc-300 transition-colors"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </label>
                        </div>
                    </div>


                    {/* Dummy Items with Scrollbar */}
                    <div className="space-y-2 max-h-[300px] overflow-y-auto border border-zinc-700 rounded-lg p-2">
                        {(!searchResults?.length) ? (
                            <>
                                <p className="text-zinc-400 text-sm mb-2">Suggestions</p>
                                {suggestionSearchResults.map((track) => (
                                    <div
                                        key={track.title}
                                        className="flex items-center p-2 hover:bg-zinc-800 rounded-md cursor-pointer gap-3"
                                        onClick={() => {
                                            setSearchQuery(track.title);
                                            setShouldSearch(true);
                                        }}
                                    >
                                        <img
                                            src={track.coverImageUrl}
                                            alt={track.title}
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                        <div className="flex-grow">
                                            <p className="text-white font-medium">{track.title}</p>
                                        </div>
                                    </div>

                                ))}
                            </>
                        ) : (
                            <>
                                <p className="text-zinc-400 text-sm mb-2">Search Results</p>
                                {searchResults.map((track) => (
                                    <div
                                        key={track.title}
                                        className="flex items-center p-2 hover:bg-zinc-800 rounded-md cursor-pointer gap-3"
                                    >
                                        <img
                                            src={track.coverImageUrl || ""}
                                            alt={track.title}
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                        <div className="flex-grow">
                                            <p className="text-white font-medium">{track.title}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <div
                                                className="cursor-pointer flex items-center justify-center w-5 h-5"
                                                onClick={() => {
                                                    setSelectedTracks((prev) => {
                                                        // Create a new object from the previous state
                                                        const newSelectedTracks = { ...prev };

                                                        // If track already exists, remove it
                                                        if (!!newSelectedTracks[track.id]) {
                                                            delete newSelectedTracks[track.id];
                                                        }
                                                        // Otherwise, add it
                                                        else {
                                                            newSelectedTracks[track.id] = track;
                                                        }

                                                        return newSelectedTracks;
                                                    });
                                                }}
                                            >
                                                {!!selectedTracks[track.id] ? (
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <circle cx="10" cy="10" r="8" fill="#fa586a" />
                                                        <circle cx="10" cy="10" r="4" fill="white" />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <circle
                                                            cx="10"
                                                            cy="10"
                                                            r="7.5"
                                                            stroke="#71717a"
                                                            strokeWidth="1"
                                                            fill="none"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {
                                    hasMore && (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setPage(page + 1)
                                            }}
                                            aria-label="Load more tracks"
                                            className="mx-auto block px-4 py-2 mt-5 bg-white text-gray-800 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow transition-all duration-200 w-fit"
                                            disabled={isLoading}
                                        >
                                            {isLoading && page != 1 ? (
                                                <span className="flex items-center justify-center gap-1.5">
                                                    <svg className="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Loading...
                                                </span>
                                            ) : (
                                                'Load More'
                                            )}
                                        </button>
                                    )
                                }
                            </>
                        )}
                    </div>

                    <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-bold text-lg flex items-center">
                                <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18V5l12-2v13" />
                                    <circle cx="6" cy="18" r="3" />
                                    <circle cx="18" cy="16" r="3" />
                                </svg>
                                Selected Tracks
                            </h3>
                            <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full">
                                {Object.keys(selectedTracks).length} tracks
                            </span>
                        </div>

                        <div className="max-h-48 overflow-y-auto pr-1">
                            {Object.keys(selectedTracks).length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {Object.values(selectedTracks).map((track) => (
                                        <div
                                            key={track.id}
                                            className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 p-3 rounded-md flex items-center group"
                                        >
                                            <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 rounded-full mr-3">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 18V5l12-2v13" />
                                                    <circle cx="6" cy="18" r="3" />
                                                    <circle cx="18" cy="16" r="3" />
                                                </svg>
                                            </div>
                                            <span className="text-white font-medium">{track.title}</span>
                                            <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-red-300" onClick={() => {
                                                setSelectedTracks((prev) => {
                                                    // Create a new object from the previous state
                                                    const newSelectedTracks = { ...prev };

                                                    delete newSelectedTracks[track.id];


                                                    return newSelectedTracks;
                                                });
                                            }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white bg-opacity-10 p-6 rounded-md text-center">
                                    <svg className="mx-auto mb-2 text-white opacity-50" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 18V5l12-2v13" />
                                        <circle cx="6" cy="18" r="3" />
                                        <circle cx="18" cy="16" r="3" />
                                    </svg>
                                    <p className="text-white text-opacity-70">No tracks selected yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setSongDialogOpen(false)}
                            disabled={isPending}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || Object.keys(selectedTracks).length === 0}
                            className={`cursor-pointer ${Object.keys(selectedTracks).length > 0 ? 'bg-[#fa586a]' : 'bg-zinc-700 opacity-70'}`}
                        >
                            {isPending ? "Uploading..." : "Add Song"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePlaylistDialog;