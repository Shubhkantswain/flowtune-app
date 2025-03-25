// File: app/routes/_app.tsx
import { Link, Outlet, useLocation, useParams } from "@remix-run/react";
import { useState } from "react";
import Playbackcontroller from "./_components/playbackcontroller/Playbackcontroller";
import Header from "./_components/header/Header";
import MusicPreferencesModal from "./_components/header/MusicPreference";
import useMusicPreferenceStore from "~/store/useMusicPreferenceStore";
import { MetaFunction } from "@remix-run/cloudflare";
import { genreIdsSwap } from "~/searchData";

export const meta: MetaFunction = () => {
    return [
        { title: "FlowTune" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function AppLayout() {

    const location = useLocation()
    const includes = location.pathname.includes("/genres")
    const params = useParams()

    type GenreKey = keyof typeof genreIdsSwap;

    return (
        <>
            <div className="bg-[#090a0a] text-white min-h-screen flex flex-col">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className={`flex-1 overflow-y-auto pb-24 ${includes ? genreIdsSwap[params.genreId as GenreKey][1] : "bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505]"} text-gray-300`}>
                    <Outlet />
                </main>

                {/* Playback Controller */}
                <Playbackcontroller />
            </div>
        </>
    );
}
