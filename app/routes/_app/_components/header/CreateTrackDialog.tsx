import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { GENRES, LANGUAGES } from "~/constants";
import usePreviewFile from "~/hooks/image";
import { useCreateTrack } from "~/hooks/track";
import { NewSong } from "~/types";

interface CreateTrackDialogProps {
    songDialogOpen: boolean;
    setSongDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTrackDialog: React.FC<CreateTrackDialogProps> = ({ songDialogOpen, setSongDialogOpen }) => {
    // ✅ External hook first
    const { register, handleSubmit, setValue } = useForm<NewSong>({
        defaultValues: {
            title: "",
            singer: "",
            starCast: "",
            duration: "0",
            language: LANGUAGES[0],
            genre: GENRES[0],
        },
    });

    // ✅ Custom hooks - File previews
    const { handleFileChange: handleImgChange, fileURL: imgUrl } = usePreviewFile("image");
    const { handleFileChange: handleAudioChange, fileURL: audioUrl } = usePreviewFile("audio");
    const { handleFileChange: handleVideoChange, fileURL: videoUrl } = usePreviewFile("video");

    // ✅ Mutations
    const { mutate: createTrack, isPending } = useCreateTrack();

    // ✅ Refs - for DOM element access
    const imageInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    // ✅ Local state
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (!selectedGenres.includes(selectedValue)) {
            setSelectedGenres((prev) => [...prev, selectedValue]);
        }
    };

    const removeGenre = (genreToRemove: string) => {
        setSelectedGenres((prev) => prev.filter((g) => g !== genreToRemove));
    };

    const onSubmit = async (data: NewSong) => {
        createTrack({
            title: data.title,
            singer: data.singer,
            starCast: data.starCast,
            duration: data.duration,
            coverImageUrl: imgUrl,
            videoUrl: videoUrl,
            audioFileUrl: audioUrl || "",
            language: data.language,
            genre: selectedGenres,
        });
    };


    return (
        <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
            <DialogContent className="hide-scrollbar bg-gradient-to-b from-black to-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle className="text-white">Add New Track</DialogTitle>
                    <DialogDescription className="text-white">Add a new song to your music library</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    {/* File upload logic for image */}
                    <input
                        type="file"
                        ref={imageInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImgChange}
                    />

                    <input
                        type="file"
                        accept="audio/*"
                        ref={audioInputRef}
                        hidden
                        onChange={(e) => {
                            handleAudioChange(e);
                            const file = e.target.files?.[0];
                            if (file) {
                                const audio = new Audio(URL.createObjectURL(file));
                                audio.onloadedmetadata = () => {
                                    setValue("duration", audio.duration.toFixed(1));
                                };
                            }
                        }}
                    />

                    <input
                        type="file"
                        accept="video/*"
                        ref={videoInputRef}
                        hidden
                        onChange={handleVideoChange}
                    />


                    {/* Image Preview */}
                    <div
                        className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <div className="text-center">
                            {imgUrl ? (
                                <div className="space-y-2">
                                    <img
                                        src={imgUrl}
                                        alt="Selected artwork"
                                        className="max-h-40 object-contain rounded-md"
                                    />
                                    <div className="text-sm text-[#02fad5]">Image selected</div>
                                </div>
                            ) : (
                                <>
                                    <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                    </div>
                                    <div className="text-sm text-zinc-400 mb-2">Upload artwork</div>
                                    <button
                                        className="px-3 py-2 text-xs text-[#02fad5] border border-zinc-600 rounded-md hover:bg-zinc-800 transition"
                                        type="button"
                                    >
                                        Choose File
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Video Preview */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Video File</label>
                        <button
                            type="button"
                            className="w-full px-4 py-2 text-sm text-[#02fad5] border border-zinc-600 rounded-md hover:bg-zinc-800 transition"
                            onClick={() => videoInputRef.current?.click()}
                        >
                            Choose Video File
                        </button>

                        {videoUrl && (
                            <div className="flex justify-center">
                                <video
                                    controls
                                    src={videoUrl}
                                    className="mt-2 w-48 h-36"
                                >
                                    Your browser does not support the audio element.
                                </video>
                            </div>
                        )}


                    </div>

                    {/* Audio Preview */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Audio File</label>
                        <button
                            type="button"
                            className="w-full px-4 py-2 text-sm text-[#02fad5] border border-zinc-600 rounded-md hover:bg-zinc-800 transition"
                            onClick={() => audioInputRef.current?.click()}
                        >
                            Choose Audio File
                        </button>
                        {audioUrl && (
                            <audio controls src={audioUrl} className="mt-2 w-full">
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Title</label>
                        <Input
                            {...register("title")}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Singer</label>
                        <Input
                            {...register("singer")}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">StarCast</label>
                        <Input
                            {...register("starCast")}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Duration (seconds)</label>
                        <Input
                            {...register("duration")}
                            type="number"
                            min="0"
                            readOnly
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </div>

                    {/* Language Preference */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Music Language</label>
                        <div className="relative">
                            <select
                                {...register("language")}
                                className="w-full p-2 pr-8 bg-zinc-800 border border-zinc-700 text-white rounded-md appearance-none"
                            >
                                {LANGUAGES.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                            {/* Custom Dropdown Arrow */}
                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Genre Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Genre</label>
                        <div className="relative">
                            <select
                                {...register("genre")}
                                className="w-full p-2 pr-8 bg-zinc-800 border border-zinc-700 text-white rounded-md appearance-none"
                                onChange={handleGenreChange}
                            >
                                {GENRES.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                            {/* Custom Dropdown Arrow */}
                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Selected Genre Tags */}
                    {selectedGenres.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {selectedGenres.map((genre) => (
                                <div
                                    key={genre}
                                    className="flex items-center bg-zinc-800 rounded-2xl text-white px-3 py-1 "
                                >
                                    {genre}
                                    <button
                                        onClick={() => removeGenre(genre)}
                                        className="ml-2 text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-white">Pls Select Genre</div>
                    )

                    }

                    <DialogFooter>
                        <button
                            type="button"
                            onClick={() => setSongDialogOpen(false)}
                            className="px-4 py-2 text-sm text-zinc-400 bg-zinc-800 border border-zinc-600 rounded-md hover:bg-zinc-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm text-white bg-[#02fad5] rounded-md hover:bg-[#02fad5]/70 transition"
                            disabled={isPending}
                        >
                            {
                                isPending ? "Adding Track..." : "Add Track"
                            }
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTrackDialog;
