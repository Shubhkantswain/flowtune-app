import React, { useState } from 'react'

interface HeaderProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    tabs: string[]
};

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, tabs }) => {
    return (
        <>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Library</h1>
            <div className="flex flex-wrap gap-3 mb-6 md:mb-8 overflow-x-auto pb-1.5">

                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${activeTab == tab
                            ? 'text-white border bg-[#5D5E5E] border-white'
                            : 'bg-[#292a2a] hover:bg-[#5D5E5E] text-gray-300'
                            }`}
                        // onClick={() => navigate(`${tab.pathname}/${searchQuery}`)}
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