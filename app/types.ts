import { ReactNode } from "react";

export type ScrollDirection = 'left' | 'right';

export interface Option {
    value: string;
    label: string;
}

export interface RegisterActionData {
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

export interface SigninActionData {
    isLoginSuccess: boolean;
    authToken?: string;
    user?: {
        id: string
        email: string
        username: string
        fullName: string
        bio: string
        profileImageURL: string
    };
    errors?: {
        usernameOrEmail?: string;
        password?: string;
        general?: string;
    };
}

export interface ForgotpasswordData {
    isForgotPasswordSuccess: boolean;
    errors?: {
        usernameOrEmail?: string;
        general?: string;
    };
}

export interface ResetpasswordData {
    isResetPasswordSuccess: boolean;
    errors?: {
        newPassword?: string;
        confirmPassword?: string;
        general?: string;
    };
}

export type ExploreItem = {
    title: string;
    svg: ReactNode;
    color: string;
    image: string;
};

export type SignOutActionResponse = {
    success: boolean;
};