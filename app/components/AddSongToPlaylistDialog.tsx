import { Visibility } from "gql/graphql";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import usePreviewFile from "~/hooks/image";
import { useAddSongToPlaylist } from "~/hooks/playlist";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface NewSong {
    name: string;
    visibility: "public" | "private";
}

interface AddSongToPlaylistDialogProps {
    songDialogOpen: boolean;
    setSongDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    trackId: string;
}

const AddSongToPlaylistDialog = ({ songDialogOpen, setSongDialogOpen, trackId }: AddSongToPlaylistDialogProps) => {
    const { handleFileChange: handleImgChange, fileURL: imgUrl } = usePreviewFile("image");
    const { mutate: addSongToPlaylist, isPending } = useAddSongToPlaylist();

    const imageInputRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit } = useForm<NewSong>({
        defaultValues: {
            name: "",
            visibility: "public",
        },
    });

    const onSubmit = async (data: NewSong) => {
        addSongToPlaylist({
            isNewPlaylist: true,
            name: data.name,
            coverImageUrl: imgUrl || "",
            visibility: Visibility.Public,
            trackIds: [trackId]
        });
    };

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
                        <Button type="submit" disabled={isPending} className="cursor-pointer">
                            {isPending ? "Uploading..." : "Add Song"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddSongToPlaylistDialog;
