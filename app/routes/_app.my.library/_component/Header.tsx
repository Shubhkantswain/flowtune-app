import React, { useState } from 'react'

function Header() {
    const [activeTab, setActiveTab] = useState('Playlists');
    const tabs = ['Playlists', 'Podcasts', 'Songs', 'Albums'];

    return (
        <>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Library</h1>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-3 mb-6 md:mb-8 overflow-x-auto pb-1.5">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full transition-colors duration-200 whitespace-nowrap ${activeTab === tab
                            ? 'bg-neutral-700 text-white'
                            : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </>
    )
}

export default Header