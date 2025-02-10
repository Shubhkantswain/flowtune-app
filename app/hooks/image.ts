import { useState } from "react";

const usePreviewFile = (fileName: string) => {
	const [fileURL, setFileURL] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith(`${fileName}/`)) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setFileURL(reader.result as string); // Explicitly casting to string
			};

			reader.readAsDataURL(file);
		} else {
			//   toast.error("Invalid file type")
			setFileURL(null);
		}
	};

	return { handleFileChange, fileURL, setFileURL };
};

export default usePreviewFile;