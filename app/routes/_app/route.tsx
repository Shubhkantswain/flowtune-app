// File: app/routes/_app.tsx
import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";
import Playbackcontroller from "./_components/playbackcontroller/Playbackcontroller";
import Header from "./_components/header/Header";
import MusicPreferencesModal from "./_components/header/MusicPreference";
import useMusicPreferenceStore from "~/store/useMusicPreferenceStore";

export default function AppLayout() {
    return (
        <>
            <div className="bg-[#090a0a] text-white min-h-screen flex flex-col">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto pb-24 bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] text-gray-300">
                    <Outlet />

                    <footer className="text-gray-400 py-8 px-6 mt-5">
                        <div className="max-w-6xl mx-auto">
                            {/* Top Section - Links */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                                {/* Column 1 - Company */}
                                <div>
                                    <h3 className="text-white font-semibold mb-3">Company</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="hover:underline">About</a></li>
                                        <li><a href="#" className="hover:underline">Jobs</a></li>
                                        <li><a href="#" className="hover:underline">For the Record</a></li>
                                    </ul>
                                </div>

                                {/* Column 2 - Communities */}
                                <div>
                                    <h3 className="text-white font-semibold mb-3">Communities</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="hover:underline">For Artists</a></li>
                                        <li><a href="#" className="hover:underline">Developers</a></li>
                                        <li><a href="#" className="hover:underline">Advertising</a></li>
                                    </ul>
                                </div>

                                {/* Column 3 - Useful Links */}
                                <div>
                                    <h3 className="text-white font-semibold mb-3">Useful Links</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="hover:underline">Support</a></li>
                                        <li><a href="#" className="hover:underline">Free Mobile App</a></li>
                                    </ul>
                                </div>

                                {/* Column 4 - Social Icons */}
                                <div>
                                    <h3 className="text-white font-semibold mb-3">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        <a href="#" className="hover:opacity-80">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 3.6 8.08 8 8.94v-6.31h-2.4v-2.63h2.4v-1.99c0-2.37 1.44-3.69 3.54-3.69.7 0 1.44.13 1.44.13v1.58h-1.03c-1.02 0-1.34.63-1.34 1.28v1.52h2.28l-.36 2.63h-1.92v6.31c4.4-.86 8-4.52 8-8.94 0-5.52-4.48-10-10-10z" />
                                            </svg>
                                        </a>
                                        <a href="#" className="hover:opacity-80">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.52 1.56-1.34 1.88-2.3-.83.49-1.74.83-2.7 1.02A4.2 4.2 0 0 0 16 4c-2.32 0-4.2 1.88-4.2 4.2 0 .33.04.65.1.96C8 9 5 7.8 3.2 5.6c-.36.63-.58 1.36-.58 2.14 0 1.48.76 2.78 1.92 3.54-.7-.02-1.36-.2-1.94-.52v.05c0 2.08 1.48 3.8 3.44 4.18-.36.1-.72.14-1.1.14-.26 0-.52-.02-.78-.08.52 1.62 2.02 2.8 3.8 2.84-1.4 1.08-3.2 1.7-5.14 1.7-.34 0-.68-.02-1-.06C4 19.82 6.18 21 8.6 21 16 21 20 14.68 20 8.92v-.4c.92-.66 1.7-1.46 2.46-2.4z" />
                                            </svg>
                                        </a>
                                        <a href="#" className="hover:opacity-80">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                                                <path d="M16.5 10.5a4.5 4.5 0 1 1-6 4.24v-2.24h1.5a3 3 0 1 0 3-3v1.5h1.5z" fill="white" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div className="border-t border-gray-700 my-6"></div>

                            {/* Bottom Section */}
                            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                                {/* Legal Links */}
                                <div className="flex flex-wrap gap-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                    <a href="#" className="hover:underline">Terms of Service</a>
                                    <a href="#" className="hover:underline">Cookies</a>
                                </div>

                                {/* Copyright */}
                                <p className="mt-4 md:mt-0">© {new Date().getFullYear()} Your Music App</p>
                            </div>
                        </div>
                    </footer>
                </main>



                {/* Playback Controller */}
                <Playbackcontroller />
            </div>
        </>
    );
}