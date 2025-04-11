import { Option } from "./types";

export const genderOptions: Option[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

export const FORM_TYPES = {
    SIGNUP: "signup",
    VERIFY: "verify",
} as const;

// Constants
export const MINIMUM_TRACKS = 8;
export const PLACEHOLDER_COUNT = Math.max(0, MINIMUM_TRACKS);

// Constants
export const SECTION_SIZE = 8

export const LANGUAGES = ["Hindi", "English", "Punjabi", "Tamil", "Telugu", "Kannada", "Bengali", "Marathi", "Gujarati", "Malayalam"];
export const GENRES = ['Love & Romantic', 'Workout', 'Birthday', 'Party Vibe', 'Chill', 'Travel', 'Happy', 'Sleep', 'Sad', 'Bath', "Bollywood", "Hollywood", "Indian Pop", "Punjabi Pop", "Dance and Electronic", "Rock", "Children Music"];
