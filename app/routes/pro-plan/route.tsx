import { useNavigate } from '@remix-run/react';
import React, { useState } from 'react';

function PrimeMusicAd() {
    const navigate = useNavigate()
    const [error, setError] = useState("");

    const handleTryNow = () => {
        setError('Internal server error');
    }

    return (
        <div className="relative w-full h-screen bg-black flex items-center justify-center">
            {/* Blurred background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 blur-xl"></div>

            {/* Close button */}
            <div className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
                onClick={() => navigate(-1)}
            >
                ×
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center text-white">
                <h1 className="text-3xl font-bold mb-4">Try FlowTune App</h1>
                <p className="text-lg mb-6">
                    Ad-free music streaming included with Prime membership.
                    Also includes free shipping and video streaming.
                </p>

                {/* Try Now button */}
                <button 
                    onClick={handleTryNow}
                    className="bg-cyan-500 text-white py-2 px-6 rounded-full text-lg hover:bg-cyan-600 transition-colors"
                >
                    Try Now
                </button>

                {/* Error message */}
                {error && (
                    <div className="mt-4 text-red-500 font-bold">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PrimeMusicAd;