import { useNavigate } from '@remix-run/react';
import React from 'react';
import { useActiveTabStore } from '~/store/useActiveTabStore';
import useSearchStore from '~/store/useSearchStore';

function SearchBar() {
    const { searchQuery, setSearchQuery, setPage } = useSearchStore();
    const navigate = useNavigate()
    const { activeTab, setActiveTab } = useActiveTabStore()

    return (
        <div className="block md:hidden mt-2 mb-10">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
                    className="w-full p-2 pr-10 text-black rounded-lg bg-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:ring-2 focus:ring-[#fa586a]"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                            navigate(`/search-results/${activeTab}/${searchQuery}`);
                        }
                    }}
                />
                <button
                    onClick={() => navigate(`/search-results/${activeTab}/${searchQuery}`)}
                >
                    <svg
                        className="absolute right-3 top-2.5 h-5 w-5 text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
