// File: app/routes/_app.tsx
import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";
import Playbackcontroller from "./_components/playbackcontroller/Playbackcontroller";
import Header from "./_components/header/Header";
import MusicPreferencesModal from "./_components/header/MusicPreference";
import useMusicPreferenceStore from "~/store/useMusicPreferenceStore";
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "FlowTune" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function AppLayout() {
    return (
        <>
            <div className="bg-[#090a0a] text-white min-h-screen flex flex-col">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto pb-24 bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] text-gray-300">
                    <Outlet />

                   
                </main>



                {/* Playback Controller */}
                <Playbackcontroller />
            </div>
        </>
    );
}
