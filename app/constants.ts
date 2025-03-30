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