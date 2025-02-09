export type ScrollDirection = 'left' | 'right';

export interface Option {
    value: string;
    label: string;
}

export interface ActionData {
    isSignupSuccess: boolean;
    isVerifyEmailSuccess: boolean;
    authToken?: string;
    formData?: {
        username: string;
        fullName: string;
        email: string;
        password: string;
    };
    user?: {
        id: string
        email: string
        username: string
        fullName: string
        bio: string
        profileImageURL: string
    }
    errors?: {
        username?: string;
        fullName?: string;
        email?: string;
        password?: string;
        gender?: string;
        general?: string;
        verificationToken?: string;
    };
}